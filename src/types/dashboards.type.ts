import { HelpTypeEnum } from "../helpers/Enums/help-type.enum";

export interface IDashboardSpecialtiesHelp {
    help_type: HelpTypeEnum;
    specialty: string;
    total: number;
}

export interface IDatadSpecialtiesHelp {
    categories: string[];
    series: {
        name: string,
        data: number[]
    }[];
}

export interface IDashboardSkillGoal {
    name: string;
    points: number;
}

export interface IDataSkillsGoal {
    categories: string[];
    series: number[];
}