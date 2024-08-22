export interface IProcedureExecution {
    id?: string | null,
    schedule_id: string,
    procedure_id: number,
    tries: number,
    time: string,
    success: boolean,
    user_id: string,
    created_date: Date
}

export interface IProcedureResult {
    skill_id?: string | null,
    name: string,
    tries: number,
    time: string,
    goal: number,
    period: string,
    objective: string,
    stimulus: string,
    answer: string
    consequence: string,
    materials: string,
    help: string,
    points: number,
    status: string,
    execution: [IProcedureExecution]
}

