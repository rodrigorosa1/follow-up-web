import axios from "axios";
import { authHeader } from "./header.service";

const API_URL = `${process.env.REACT_APP_API_URL}`;


export const specialityList = () => {
    return axios.get(API_URL + 'configurations/specialty',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const postSpecialty = (data: any) => {
    return axios.post(API_URL + "configurations/specialty",
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const updateSpecialty = (id: string, data: any) => {
    return axios.patch(API_URL + "configurations/specialty/" + id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}