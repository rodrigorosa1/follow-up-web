export default interface IGrid {
    id?: string | null,
    skill_id: string,
    student_id: string,
    instructor_id: string,
    date_schedule: Date,
    hour_start: string | null,
    hour_finish: string | null,
    observation: string | null,
    status: string | null,
  }