import axios from "axios";
import { authHeader } from "./header.service";

const API_URL = `${process.env.REACT_APP_API_URL}`;

export const recoveryPassword = (data: any) => {
    return axios.post(API_URL + "profile/recovery-password",
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const refreshPassword = (data: any) => {
    return axios.post(API_URL + "profile/refresh-password",
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const updatePassword = (data: any) => {
    return axios.patch(API_URL + 'profile/update-password',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}