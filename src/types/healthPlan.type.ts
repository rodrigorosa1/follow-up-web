export interface IHealthPlan {
    id?: string,
    social_name: string,
    fantasy_name: string,
    document: string,
    address: string,
    number_address: string,
    complement: string | null,
    zip_code: string,
    district: string,
    city: string,
    state: string,
    country: string,
    phone: string,
    email: string,
    active?: boolean | null,
    plan?: any
  }