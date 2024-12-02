import axios from "axios";
import { authHeader, authHeaderFormData } from "./header.service";

const API_URL = `${process.env.REACT_APP_API_URL}` + 'health-plans/';

export const getHealthPlans = () => {
    return axios.get(API_URL,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getHealthPlanId = (id: string) => {
    return axios.get(API_URL + id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const postHealthPlan = (data: any) => {
    return axios.post(API_URL,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const updateHealthPlan = (id: string, data: any) => {
    return axios.patch(API_URL + id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const deleteStudentHealthPlan = (id: string) => {
    return axios.delete(API_URL + id + '/',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}