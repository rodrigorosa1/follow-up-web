import { IEvent } from "./scheduler.type";
import { IStudent } from "./student.type";

export interface IBilling {
    id?: string,
    schedule_id?: string | null,
    student_id?: string | null,
    value: number,
    date_due: Date,
    reference: string | null,
    date_scheduled: Date | null,
    date_done: Date | null,
    schedule: IEvent[],
    student: IStudent,
    status?: string
}

export interface IBillingResume {
    student_id: string,
    fullname: string,
    category: string,
    status: string
    count: number,
    total: number,
}