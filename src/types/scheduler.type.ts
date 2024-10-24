export interface Iselection {
    id: string;
    text: string;
    value: string;
}

export interface IEvent {
    id?: string;
    event_id?: string;
    title?: string;
    skill_id?: string;
    student_id: string;
    instructor_id: string;
    details?: string;
    start: string;
    end: string;
    start_hour?: string;
    end_hour?: string;
    period: string;
    repeat: string;
    status?: string;
    student?: any;
    professional?: any;
    skill?: any;
    skills: any;
    selectedValues?: any;
    procedures?: any;
    weekDays?: any;
    hours?: any;
}