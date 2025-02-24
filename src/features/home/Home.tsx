import * as React from 'react';
import { Autocomplete, FormControl, FormLabel, Grid, IconButton, Paper, TextField } from "@mui/material";
import { CardSchedule } from "../../components/dashboard/CardSchedule";
import { ListSchedule } from "../../components/dashboard/ListSchedule";
import { getEventToday } from "../../services/event.service";
import { CustomBreadcrumbs } from '../../components/layout/Breadcrumbs';
import { SkillsGoal } from '../../components/charts/SkillsGoal';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FilterAltSharp } from '@mui/icons-material';
import { useFormik } from 'formik';
import { getStudents } from '../../services/student.service';
import { IStudent } from '../../types/student.type';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { dashSpecialtiesHelp, skillsGoal } from '../../services/follow-up.service';
import { IDashboardSkillGoal, IDashboardSpecialtiesHelp, IDatadSpecialtiesHelp, IDataSkillsGoal } from '../../types/dashboards.type';
import { SpecialtiesHelp } from '../../components/charts/SpecialtiesHelp';

interface IPayload {
    start: string | null,
    end: string | null,
}

export const Home = () => {
    const [total, setTotal] = React.useState<any[]>([]);
    const [events, setEvents] = React.useState<any[]>([]);
    const [students, setStudents] = React.useState<IStudent[]>([]);
    const [dataSpecialtiesHelp, setDataSpecialtiesHelp] = React.useState<IDatadSpecialtiesHelp>();
    const [dataSkillGoal, setDataSkillGoal] = React.useState<IDataSkillsGoal>();

    const eventsToday = async () => {
        const list = await getEventToday();
        const total = list.length;
        setTotal(total);
        setEvents(list.slice(0, 3));
    }

    const listStudents = async () => {
        const list = await getStudents();
        setStudents(list);
    }

    const defaultProps = {
        options: students,
        getOptionLabel: (option: any) => option.fullname,
    };

    const startResume = async () => {
        const payload = {
            start: new Date(new Date().setDate(new Date().getDate() - 180)).toISOString().split('T')[0],
            end: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString().split('T')[0]
        }
        const dashSpecialty = await dashSpecialtiesHelp(payload);
        const data = getHelpTypeTotals(dashSpecialty);
        if (data) {
            setDataSpecialtiesHelp(data);
        }

        const dashSkill = await skillsGoal(payload);
        const dataSkill = setSkillGoals(dashSkill);
        if (dataSkill) {
            setDataSkillGoal(dataSkill)
        }
    }

    const setSpecialtyDashCategories = (data: { specialty: string }[]) => {
        return Array.from(new Set(data.map(item => item.specialty)));
    };

    const getHelpTypeTotals = (data: IDashboardSpecialtiesHelp[]) => {
        const specialties = setSpecialtyDashCategories(data);
        const helpTypeMap = new Map<string, number[]>();

        data.forEach(({ help_type, specialty, total }) => {
            if (!helpTypeMap.has(help_type)) {
                helpTypeMap.set(help_type, Array(specialties.length).fill(0));
            }
            const index = specialties.indexOf(specialty);
            if (index !== -1) {
                helpTypeMap.get(help_type)![index] += total;
            }
        });

        return {
            categories: specialties,
            series: Array.from(helpTypeMap, ([name, data]) => ({ name, data }))
        };
    };

    const setSkillGoals = (data: IDashboardSkillGoal[]) => {
        return {
            categories: data.map(item => item.name),
            series: data.map(item => item.points)
        };
    };

    const formatPayload = (form: any) => {
        const data = {
            student_id: form.student_id ? (form.student_id) : null,
            status: form.status ? (form.status) : null,
            start: new Date(form.start).toISOString().split('T')[0],
            end: new Date(form.end).toISOString().split('T')[0]
        }
        return data;
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            student: null,
            start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
            end: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString().split('T')[0]
        },
        onSubmit: async (values) => {
            const payload = formatPayload(values);
            const dashSpecialty = await dashSpecialtiesHelp(payload);
            const data = getHelpTypeTotals(dashSpecialty);
            if (data) {
                setDataSpecialtiesHelp(data);
            }

            const dashSkill = await skillsGoal(payload);
            const dataSkill = setSkillGoals(dashSkill);
            if (dataSkill) {
                setDataSkillGoal(dataSkill)
            }
        }
    });

    React.useEffect(() => {
        eventsToday();
    }, []);

    React.useEffect(() => {
        listStudents();
    }, []);

    React.useEffect(() => {
        startResume();
    }, []);

    return (
        <Grid>
            <Grid container spacing={3}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container alignItems="left" justifyContent="left">
                        <CustomBreadcrumbs
                            title1=""
                            href1=""
                            title2=""
                            href2=""
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 260,
                        }}
                    >
                        <CardSchedule total={total} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 260,
                        }}
                    >
                        <ListSchedule
                            events={events}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <form onSubmit={formik.handleSubmit}>
                                <Paper elevation={2}>
                                    <Grid container>
                                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3} sx={{
                                            marginLeft: 5,
                                            marginTop: 1,
                                            marginBottom: 1
                                        }}>
                                            <FormControl>
                                                <FormLabel>De</FormLabel>
                                                <DatePicker
                                                    value={dayjs(formik.values.start)}
                                                    format="DD/MM/YYYY"
                                                    onChange={(value) => {
                                                        formik.setFieldValue('start', value);
                                                    }}
                                                    slotProps={{ textField: { size: 'small' } }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3} sx={{
                                            marginLeft: 5,
                                            marginTop: 1,
                                            marginBottom: 1
                                        }}>
                                            <FormControl>
                                                <FormLabel>Até</FormLabel>
                                                <DatePicker
                                                    value={dayjs(formik.values.end)}
                                                    format="DD/MM/YYYY"
                                                    onChange={(value) => {
                                                        formik.setFieldValue('end', value);
                                                    }}
                                                    slotProps={{ textField: { size: 'small' } }}
                                                />

                                            </FormControl>
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3} sx={{
                                            textIndent: 5,
                                            marginTop: 1,
                                            marginLeft: 10,
                                            marginBottom: 2
                                        }}>
                                            <Autocomplete
                                                {...defaultProps}
                                                value={formik.values.student}
                                                onChange={(event, newValue) => {
                                                    formik.setFieldValue('student', newValue);
                                                }}
                                                id="student_id"
                                                disableCloseOnSelect
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Cliente" variant="standard" />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                            <div className="buttonPaperFilters">
                                                <IconButton
                                                    type="submit"
                                                    title="Buscar"
                                                >
                                                    <FilterAltSharp
                                                        fontSize='small'
                                                    />
                                                </IconButton>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </form>
                        </Grid>
                    </LocalizationProvider>

                </Grid>
                {dataSpecialtiesHelp && (
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 300,
                            }}
                        >
                            <SpecialtiesHelp
                                dataSeries={dataSpecialtiesHelp.series}
                                categories={dataSpecialtiesHelp.categories}
                            />
                        </Paper>
                    </Grid>
                )}

                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 600,
                        }}
                    >
                        {dataSkillGoal && (
                            <SkillsGoal
                                dataSeries={dataSkillGoal.series}
                                categories={dataSkillGoal.categories}
                            />)}
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );

}