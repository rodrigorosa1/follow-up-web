export interface IAddress {
    id?: string,
    responsible_contract_id: string,
    address: string,
    number: number | null,
    complement: string | null,
    zip_code: string,
    district: string | null,
    city: string,
    state: string,
}