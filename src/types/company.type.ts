import { CompanyStatusEnum } from "../helpers/Enums/company-status.enum";


export default interface ICompany {
    id?: string | null,
    social_name: string,
    fantasy_name: string,
    document: string,
    municipal_registration: string | null,
    address: string,
    number_address: number | null,
    complement: string | null,
    zip_code: string,
    city: string,
    district: string,
    state: string,
    country?: string | null,
    email: string,
    phone: string,
    city_code: string | null,
    aliquot: number | null,
    item_list_service: string | null,
    municipal_tax_code: string | null,
    iss_retained: boolean,
    licences_n: number | null,
    api_nfes_token: string | null,
    status?: CompanyStatusEnum
}