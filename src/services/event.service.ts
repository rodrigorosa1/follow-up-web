import axios from "axios";
import { authHeader } from "./header.service";

const API_URL = `${process.env.REACT_APP_API_URL}` + 'schedules/';

export const getEvents = () => {
    return axios.get(API_URL,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getEventslId = (id: string) => {
    return axios.get(API_URL + 'details/' + id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const updateEvents = (event_id: any, data: any) => {
    return axios.patch(API_URL + 'update/event/' + event_id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const postEvents = (data: any) => {
    return axios.post(API_URL,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const deleteEvent = (id: string) => {
    return axios.delete(API_URL + id,
        { headers: authHeader() },
    ).then((resp) => {
        return resp.data;
    }).catch((error) => {
        return error;
    });
}

export const deleteAllEvents = (event_id: string) => {
    return axios.delete(API_URL + 'events/' + event_id,
        { headers: authHeader() },
    ).then((resp) => {
        return resp.data;
    }).catch((error) => {
        return error;
    });
}

export const getEventToday = () => {
    return axios.get(API_URL + 'schedule-today',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const getEventProcedureStudent = (id: string, skill_id: string) => {
    return axios.get(API_URL + id + '/' + skill_id + '/procedures',
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const updateEventProcedures = (id: string, data: any) => {
    return axios.patch(API_URL + "procedure/" + id,
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const addEventsProcedures = (id: string, data: any) => {
    return axios.post(API_URL + id + '/procedures/',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const removeEventProcedures = (id: string) => {
    return axios.delete(API_URL + 'procedures/' + id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const addEventsSkill = (id: string, data: any) => {
    return axios.post(API_URL + id + '/skills/',
        data, { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}

export const removeEventSkill = (id: string) => {
    return axios.delete(API_URL + 'skills/' + id,
        { headers: authHeader() }).then((resp) => {
            return resp.data;
        }).catch((error) => {
            return error;
        });
}