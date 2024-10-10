import { IProfessional } from "./professional.type";
import { IEvent } from "./scheduler.type";

export interface IPayament {
    id?: string,
    schedule_id?: string | null,
    instructor_id?: string | null,
    value: number,
    date_due: Date,
    date_scheduled: Date | null,
    schedule: IEvent[],
    instructor: IProfessional,
    status?: string
}

export interface IPaymentResume {
    schedule_id: string,
    instructor_id: string,
    fullname: string,
    social_name: string,
    specialty: string,
    status: string
    count: number,
    total: number,
}

export interface IBank {
    ispb: string,
    name: string,
    code: string,
    fullName: string,
}