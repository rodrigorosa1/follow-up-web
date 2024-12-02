import axios from "axios";
import { authHeader } from "./header.service";

const API_URL = `${process.env.REACT_APP_API_URL}` + 'billings/';

export const resumeBillings = (data: any) => {
    return axios.post(API_URL + 'resume',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const studentsBillings = (data: any) => {
    return axios.post(API_URL + 'for-student',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const updateBilling = (id: string, data: any) => {
    return axios.patch(API_URL + id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const updateManyBilling = (data: any) => {
    return axios.post(API_URL + 'many-change-status',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}