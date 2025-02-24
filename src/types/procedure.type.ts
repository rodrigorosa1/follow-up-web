export default interface IProcedure {
  id?: string,
  skill_id? : string;
  skill_name?: string;
  tries: string | null;
  time: string | null;
  goal: string | null;
  period: string | null;
  name: string | null;
  objective: string;
  stimulus: string | null;
  help: string | null;
  materials: string | null;
  answer: string | null;
  consequence: string | null;
  student_id?: string | null;
  skill?: {
    name: string;
};
}