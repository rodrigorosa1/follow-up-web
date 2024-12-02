import axios from "axios";
import { authHeader } from "./header.service";

const API_URL = `${process.env.REACT_APP_API_URL}` + 'skills/';

export const getSkills = () => {
    return axios.get(API_URL,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getSkillsSpecialty = (specialty_id: string) => {
    return axios.get(API_URL + 'specialty/' + specialty_id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getSkillslId = (id: string) => {
    return axios.get(API_URL + id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const postSkills = (data: any) => {
    return axios.post(API_URL,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const updateSkills = (id: string, data: any) => {
    return axios.patch(API_URL + id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getProcedures = (id: string) => {
    return axios.get(API_URL + id + '/procedures',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getProceduresManySkills = (data: any) => {
    return axios.post(API_URL + '/many-procedures/',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getProcedureslId = (id: string) => {
    return axios.get(API_URL + '/procedures/' + id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const postProcedures = (id: any, data: any) => {
    data.skill_id = id;
    return axios.post(API_URL + id + '/procedures',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const updateProcedures = (id: string, data: any) => {
    return axios.patch(API_URL + "procedures/" + id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}