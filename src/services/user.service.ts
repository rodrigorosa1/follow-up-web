import axios from "axios";
import { authHeader, authHeaderFormData } from "./header.service";

const API_URL = `${process.env.REACT_APP_API_URL}`;

export const getUser = () => {
    return axios.get(API_URL + 'users',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const filtersUsers = (data: any) => {
    return axios.post(API_URL + "users/filters",
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const postUser = (data: any) => {
    return axios.post(API_URL + "users",
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const updateUser = (id: any, data: any) => {
    return axios.patch(API_URL + "users/" + id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const uploadAvatarUser = (id: string, file: any) => {
    return axios.post(API_URL + "users/" + id + "/avatar",
        file, {
        headers: authHeaderFormData()
    }).then((resp) => {
        return resp.data;
    }).catch((error) => {
        return error;
    });
}

export const getUserAvatarId = (id: string) => {
    return API_URL + 'avatars/user/' + id;
}