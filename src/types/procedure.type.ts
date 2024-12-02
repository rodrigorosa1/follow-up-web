export default interface IProcedure {
  id?: string,
  skill_id? : string | null,
  skill_name?: string | null,
  tries: string,
  time: string | null,
  goal: string | null,
  period: string | null,
  name: string | null,
  objective: string | null,
  stimulus: string | null,
  help: string | null,
  materials: string | null,
  answer: string | null,
  consequence: string | null,
  student_id?: string | null,
}