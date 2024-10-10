export interface IProfessional {
  id: string,
  specitalty_id: string,
  fullname: string,
  birthday: Date | null,
  document: string,
  indentity_number: string | null,
  nationality: string | null,
  org_exp: string | null,
  uf_exp: string | null,
  phone: string | null,
  email: string | null,
  avatar: string | null,
  social_name: string | null,
  fantasy_name: string | null,
  type_payment?: string,
  mode_payment?: string,
  comission: number | null,
  value: number | undefined
  status: string
}

export interface IProfessionalBankAccount {
  id: string,
  bank_number: number,
  bank: string,
  account_number: string,
  account_digit: number,
  key?: number | null
}

export interface IProfessionalPix {
  id: string,
  key: number
}