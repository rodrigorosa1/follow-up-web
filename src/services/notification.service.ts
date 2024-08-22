import axios from "axios";
import { authHeader } from "./header.service";

const API_URL = `${process.env.REACT_APP_API_URL}` + 'notifications';

export const getNotifications = async () => {
  return axios.get(API_URL + "/",
    { headers: authHeader() }).then((resp) => {
      return resp.data;
    }).catch((error) => {
      return error;
    });
};

export const readNotification = async () => {
  return axios.get(API_URL + "/read",
    { headers: authHeader() }).then((resp) => {
      return resp.data;
    }).catch((error) => {
      return error;
    });
};