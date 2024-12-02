import axios from "axios";
import { authHeader } from "./header.service";

const API_URL = `${process.env.REACT_APP_API_URL}` + 'invoices/';


export const senderInvoice = (data: any) => {
    return axios.post(API_URL,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getBillingId = (billing_id: string) => {
    return axios.get(API_URL + 'billing/' + billing_id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getReference = (reference: string) => {
    return axios.get(API_URL + 'reference/' + reference,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const deleteReference = (reference: string) => {
    return axios.delete(API_URL + 'reference/' + reference,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const senderEmail = (reference: string, email: string) => {
    return axios.post(API_URL + 'reference/' + reference + '/' + email,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}