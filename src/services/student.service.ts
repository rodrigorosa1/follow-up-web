import axios from "axios";
import { authHeader, authHeaderFormData } from "./header.service";

const API_URL = `${process.env.REACT_APP_API_URL}` + 'students/';

export const getStudents = () => {
    return axios.get(API_URL,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const filtersStudents = (data: any) => {
    return axios.post(API_URL + "filters",
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getStudentsId = (id: string) => {
    return axios.get(API_URL + id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const postStudent = (data: any) => {
    return axios.post(API_URL,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const updateStudent = (id: string, data: any) => {
    return axios.patch(API_URL + id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const uploadAvatarStudent = (id: string, file: any) => {
    return axios.post(API_URL + id + "/avatar",
        file, {
        headers: authHeaderFormData()
    }).then((resp) => {
        return resp.data;
    }).catch((error) => {
        return error;
    });
}

export const getStudentAddress = (id: any) => {
    return axios.get(API_URL + id + '/address',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const postStudentAddress = (id: string, data: any) => {
    return axios.post(API_URL + id + '/address',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const upStudentsAddress = (id: string, data: any) => {
    return axios.patch(API_URL + 'address/' + id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getStudentsResponsible = (id: any) => {
    return axios.get(API_URL + id + '/responsible',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const postStudentsResponsable = (id: string, data: any) => {
    return axios.post(API_URL + id + '/responsible',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const upStudentsResponsable = (id: string, data: any) => {
    return axios.patch(API_URL + 'responsible/' + id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const deleteStudentsResponsable = (id: any) => {
    return axios.delete(API_URL + 'responsible/' + id,
        { headers: authHeader() },
    ).then((resp) => {
        return resp.data;
    }).catch((error) => {
        return error;
    });
}

export const activeStudent = (id: string) => {
    return axios.get(API_URL + 'active/' + id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getActiveStudents = () => {
    return axios.get(API_URL + 'actives/',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getStudentHealthPlan = (id: string) => {
    return axios.get(API_URL + 'plans/' + id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const deleteStudentHealthPlan = (id: string, healthPlanId: string) => {
    return axios.delete(API_URL + 'plans/' + id + '/' + healthPlanId,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const postStudentHealthPlan = (data: any) => {
    return axios.post(API_URL + 'plans',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const changeBillingType = (contractor_id: string, data: any) => {
    return axios.patch(API_URL + 'contractor/' + contractor_id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}