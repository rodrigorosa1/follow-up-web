import axios from "axios";

export const findiCep = (cep: string) => {
    return axios.get('https://viacep.com.br/ws/' + cep + '/json/').then((resp) => {
        return resp.data;
    }).catch((error) => {
        return error;
    });
}