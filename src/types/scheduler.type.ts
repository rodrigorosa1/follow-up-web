export interface Iselection {
    id: string;
    text: string;
    value: string;
}

export interface IEvent {
    id?: string;
    start_in?: string;
    event_id?: string;
    title?: string;
    student_id: string;
    details?: string;
    start: string;
    end?: Date;
    start_hour?: string;
    end_hour?: string;
    period: string;
    repeat: string;
    status?: string;
    student?: any;
    skill?: any;
    skills?: any;
    selectedValues?: any;
    slots: any;
}