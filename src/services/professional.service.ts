import axios from "axios";
import { authHeader, authHeaderFormData } from "./header.service";

const API_URL = `${process.env.REACT_APP_API_URL}` + 'instructors/';

export const getProfessionals = () => {
    return axios.get(API_URL,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const filtersProfessionals = (data: any) => {
    return axios.post(API_URL + "filters",
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getProfessionalId = (id: string) => {
    return axios.get(API_URL + id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const postProf = (data: any) => {
    return axios.post(API_URL,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const updateProf = (id: string, data: any) => {
    return axios.patch(API_URL + id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const uploadAvatarProf = (id: string, file: any) => {
    return axios.post(API_URL + id + "/avatar",
        file, {
        headers: authHeaderFormData()
    }).then((resp) => {
        return resp.data;
    }).catch((error) => {
        return error;
    });
}

export const getProfAddress = (id: string) => {
    return axios.get(API_URL + id + '/address',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const postProfAddress = (id: string, data: any) => {
    return axios.post(API_URL + id + '/address',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const upProfAddress = (id: string, data: any) => {
    return axios.patch(API_URL + 'address/' + id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const activeProf = (id: string) => {
    return axios.get(API_URL + 'active/' + id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getActiveProfessionals = () => {
    return axios.get(API_URL + 'actives/',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const postDataPayment = (id: string, data: any) => {
    return axios.post(API_URL + id + '/data-payment',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const updateDataPayment = (id: string, data: any) => {
    return axios.patch(API_URL + id + '/data-payment',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getDataPayment = (id: string) => {
    return axios.get(API_URL + id + '/data-payment',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

