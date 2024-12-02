import { IHealthPlan } from "./healthPlan.type";

export interface IStudent {
  [x: string]: any;
  id: string,
  fullname: string,
  birthday: Date | null,
  document: string,
  allergy: string,
  genere: string,
  indentity_number: string | null,
  nationality: string | null,
  org_exp: string | null,
  uf_exp: string | null,
  phone: string | null,
  email: string | null,
  avatar: string | null,
  status: string | null,
  contractor: IContractor;
  responsable?: IResponsable[],
  plans?: IHealthPlan[]
}

export interface IResponsable {
  id?: string ,
  company_id?: string,
  fullname: string,
  birthday: Date | null,
  document: string,
  indentity_number: string | null,
  nationality: string | null,
  org_exp: string | null,
  uf_exp: string | null,
  phone: string | null,
  email: string | null,
  main_contract: string | null,
  bond: string | null,
  main: string | null,
  status: string | null,
}

export interface IContractor {
  id: string,
  type_billing: string,
  responsable: IResponsable[] | null
}