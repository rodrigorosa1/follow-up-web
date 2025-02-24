import axios from "axios";
import { authHeader } from "./header.service";

const API_URL = `${process.env.REACT_APP_API_URL}`;

export const getFollowUp = () => {
    return axios.get(API_URL + 'follow-up',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const filtersFollowUp = (data: any) => {
    return axios.post(API_URL + "follow-up/filters",
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getFollowUpId = (id: any) => {
    return axios.get(API_URL + 'follow-up/schedule/' + id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getSkllsStudent = (student_id: any) => {
    return axios.get(API_URL + 'skills/student/' + student_id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const dashSpecialtiesHelp = (data: any) => {
    return axios.post(API_URL + 'follow-up/dashboard-specialty',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const skillsGoal = (data: any) => {
    return axios.post(API_URL + 'follow-up/dashboard-skills',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}