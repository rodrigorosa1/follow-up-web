import axios from "axios";
import { authHeader } from "./header.service";

const API_URL = `${process.env.REACT_APP_API_URL}` + 'api-requests/';

export const getBanks = () => {
    return axios.get(API_URL + 'banks',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const findiCep = (cep: string) => {
    return axios.get(API_URL + 'cep/' + cep,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}