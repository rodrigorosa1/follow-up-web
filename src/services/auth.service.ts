import axios from "axios";
import moment from "moment";

const API_URL = `${process.env.REACT_APP_API_URL}`;

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "auth", {
    username,
    password,
  });
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "auth", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        const expireTimestamp = moment().add(response.data.expires_in, 'minutes').valueOf();
        localStorage.setItem("FollowUpAccessToken", response.data.access_token);
        localStorage.setItem("FollowUpExpiresIn", JSON.stringify(expireTimestamp));
      }
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("FollowUpAccessToken");
  localStorage.removeItem("FollowUpExpiresIn");
};

export const verifyToken = (): boolean => {
  const token = localStorage.getItem('FollowUpAccessToken');
  return !!token;
}

export const getCurrentUser = async () =>  {
  const token = localStorage.getItem("FollowUpAccessToken");
  if (token) {
    return axios.get(API_URL + "auth/me", {
      headers: {
        'Accept': '*/*',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => {
      if(response.data.id) {
        return response.data;
      }
    });
  }
};