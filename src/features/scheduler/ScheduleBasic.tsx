import * as React from "react"
import { IEvent, Iselection } from "../../types/scheduler.type";
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { deleteAllEvents, deleteEvent, getEventslId, postEvents } from "../../services/event.service";
import { Button, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Alert, Box, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress, Card, CardHeader, Checkbox, Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { isEmptyArray, useFormik } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { HourMask } from "../../components/masks/InputMask";
import { AddCircle, EventBusy, PlaylistRemove, RemoveCircle, ReplyOutlined, Save } from "@mui/icons-material";
import { getActiveProfessionals } from "../../services/professional.service";
import { getActiveStudents } from "../../services/student.service";
import { getProcedures, getSkills, getSkillsSpecialty } from "../../services/skill.service";
import IProcedure from "../../types/procedure.type";
import { getSpecialties } from "../../services/specialty.service";
import ISpecialty from "../../types/specialty.type";
import { ScheduleProcedures } from "./ScheduleProcedures";

function not(a: readonly IProcedure[], b: readonly IProcedure[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly IProcedure[], b: readonly IProcedure[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly IProcedure[], b: readonly IProcedure[]) {
    return [...a, ...not(b, a)];
}

export const ScheduleBasic = () => {
    const initial: IEvent = {
        student_id: '',
        specialty_id: '',
        instructor_id: '',
        start: '',
        end: '',
        start_hour: '',
        end_hour: '',
        period: '',
        repeat: 'NÃO',
        skill: '',
        weekDays: [],
        timeSlots: [{ start_hour: "", end_hour: "" }],
    }

    const [skills, setSkills] = React.useState<Iselection[]>([]);
    const [weekDays, setWeekDays] = React.useState<Iselection[]>([]);
    const [specialties, setSpecialties] = React.useState<ISpecialty[]>([]);
    const [dataForm, setDataForm] = React.useState(initial);
    const [students, setStudents] = React.useState<Iselection[]>([]);
    const [profissionals, setProfessionals] = React.useState<Iselection[]>([]);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarError, setSnackbarError] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openE, setOpenE] = React.useState(false);
    const [procedures, setProcedures] = React.useState<readonly IProcedure[]>([]);
    const [proceduresSelected, setProceduresSelected] = React.useState<readonly IProcedure[]>([]);
    const [checked, setChecked] = React.useState<readonly IProcedure[]>([]);
    const [weekDaysSelected, setWeekDaysSelected] = React.useState<Iselection[]>([]);
    const leftChecked = intersection(checked, procedures);
    const rightChecked = intersection(checked, proceduresSelected);
    const [searchTerm, setSearchTerm] = React.useState("");


    const { id } = useParams();

    let navigate: NavigateFunction = useNavigate();

    const historyBack = () => {
        navigate("/scheduler");
    }

    const specialtyList = async () => {
        const list = await getSpecialties();
        setSpecialties(list);
    }

    const skillsList = async (specialty_id: any) => {
        if (!isEmptyArray(skills)) {
            formik.setFieldValue('skills', []);
        }
        const listSkills = await getSkillsSpecialty(specialty_id);
        const skills_: Iselection[] = listSkills.map((skill: { name: any; id: any; }) => ({
            id: skill.id,
            text: skill.name,
            value: skill.id,
        }))
        setSkills(skills_);

    }

    const dataOptions = async () => {
        const listStudents = await getActiveStudents();
        const students_: Iselection[] = listStudents.map((student: { fullname: any; id: any; }) => ({
            id: student.id,
            text: student.fullname,
            value: student.id,
        }))
        setStudents(students_);

        const listProf = await getActiveProfessionals();
        const prof_: Iselection[] = listProf.map((prof: { fullname: any; id: any; }) => ({
            id: prof.id,
            text: prof.fullname,
            value: prof.id,
        }))
        setProfessionals(prof_);

        const listSkills = await getSkills();
        const skills_: Iselection[] = listSkills.map((skill: { name: any; id: any; }) => ({
            id: skill.id,
            text: skill.name,
            value: skill.id,
        }))
        setSkills(skills_);

        const days = [
            { value: 1, text: 'Seg' },
            { value: 2, text: 'Ter' },
            { value: 3, text: 'Qua' },
            { value: 4, text: 'Qui' },
            { value: 5, text: 'Sex' },
            { value: 6, text: 'Sab' }
        ]
        const days_: Iselection[] = days.map((days: { text: any; value: any; }) => ({
            id: days.value,
            text: days.text,
            value: days.value,
        }))
        setWeekDays(days_);
        setDataLoaded(true);
    }

    const handleSkill = async (event: any) => {
        formik.handleChange(event);
        const prcds = await getProcedures(event.target.value);
        if (proceduresSelected.length > 0) {
            const newProcedures = prcds.filter(
                (procedure: any) => !proceduresSelected.some((p) => p.id === procedure.id)
            );
            if (newProcedures.length > 0) {
                setProcedures(newProcedures);
            } else {
                setProcedures([]);
            }
        } else {
            setProcedures(prcds);
        }
    }

    const handleSpecialty = async (event: any) => {
        formik.handleChange(event);
        skillsList(event.target.value);
    }

    const handleWeekDays = async (event: any) => {
        formik.handleChange(event);
        setWeekDaysSelected(event.target.value);
    }

    const handleToggle = (value: IProcedure) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const numberOfChecked = (items: readonly IProcedure[]) =>
        intersection(checked, items).length;

    const handleToggleAll = (items: readonly IProcedure[]) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setProceduresSelected(proceduresSelected.concat(leftChecked));
        setProcedures(not(procedures, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setProcedures(procedures.concat(rightChecked));
        setProceduresSelected(not(proceduresSelected, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const scheduleId = async () => {
        if (id) {
            const response = await getEventslId(id);
            const event: IEvent = {
                student_id: response.student_id,
                instructor_id: response.instructor_id,
                specialty_id: response.specialty_id,
                event_id: response.event_id,
                start: new Date(response.start).toISOString().split('T')[0],
                end: new Date(response.end).toISOString().split('T')[0],
                start_hour: response.start_hour,
                end_hour: response.end_hour,
                repeat: response.repeat,
                period: response.period,
                skills: response.skills.map((skill: any) => ({
                    id: skill.skill_id,
                    text: skill.skill_name,
                    value: skill.skill_id,
                })),
            }
            setDataForm(event);
        }
        setDataLoaded(true);
    }

    const handleDeleteEvent = () => {
        if (id) {
            deleteEvent(id);
            handleClose();
            handleSnackbarOpen();
            navigate("/scheduler/");
        }
    };

    const handleDeleteAllEvents = () => {
        if (dataForm.event_id) {
            deleteAllEvents(dataForm.event_id);
            handleCloseE();
            handleSnackbarOpen();
            navigate("/scheduler/");
        }
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const handleSnackbarError = () => {
        setSnackbarError(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleMessage = (message: string) => {
        setSnackbarMessage(message);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenE = () => {
        setOpenE(true);
    };

    const handleCloseE = () => {
        setOpenE(false);
    };

    const formatSkillIDs = (skills: any) => {
        const skill_id: any[] = [];
        skills.map((skill: any) => {
            skill_id.push(skill)
        })
        return skill_id;
    }

    React.useEffect(() => {
        dataOptions();
    }, []);

    React.useEffect(() => {
        scheduleId();
    }, []);

    React.useEffect(() => {
        specialtyList();
    }, []);


    const formatPayload = (event: any) => {
        const data = {
            ...event,
            schedule_in: new Date(event.start).toISOString().split('T')[0],
            period: event.repeat == 'NÃO' ? 1 : event.period,
            skill_id: formatSkillIDs(event.skills),
            procedures: proceduresSelected,
            dates: formatDatesForWeek(event.start),
            time_slots: event.timeSlots
        }
        return data;
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: dataForm,
        onSubmit: (values) => {
            const payload = formatPayload(values);
            console.log(payload);
            postEvents(payload).then((r) => {
                if (Array.isArray(r)) {
                    setSnackbarError(false)
                    setSnackbarMessage('Agenda cadastrada com sucesso!');
                    setSnackbarOpen(true);
                    navigate("/scheduler/" + r[0].id);
                } else {
                    handleMessage(r.response.data.detail);
                    handleSnackbarError();
                    handleSnackbarOpen();
                }
            }).catch((e) => {
                console.error(e);
            });
        }
    });

    const formatDatesForWeek = (date: any) => {
        const selectedDates: any[] = [];

        weekDaysSelected.forEach(daySelected => {
            if (date.day() !== daySelected.value) {
                const newDate = date.day(daySelected.value);
                selectedDates.push(new Date(newDate).toISOString().split('T')[0]);
            }
        });

        return selectedDates;
    }

    const handleAddTimeSlot = () => {
        formik.setFieldValue("timeSlots", [
            ...formik.values.timeSlots,
            { start_hour: "", end_hour: "" },
        ]);
    };

    const handleRemoveTimeSlot = (index: number) => {
        const updatedSlots = formik.values.timeSlots.filter((_: any, i: any) => i !== index);
        formik.setFieldValue("timeSlots", updatedSlots);
    };

    const customList = (title: React.ReactNode, items: readonly IProcedure[]) => {
        const filteredItems = items.filter(item =>
            item.objective.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.skill?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <Card>
                <CardHeader
                    sx={{ px: 2, py: 1 }}
                    avatar={
                        <Checkbox
                            onClick={handleToggleAll(items)}
                            checked={numberOfChecked(items) === items.length && items.length !== 0}
                            indeterminate={
                                numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                            }
                            disabled={items.length === 0}
                            inputProps={{
                                'aria-label': 'all items selected',
                            }}
                        />
                    }
                    title={title}
                    subheader={`${numberOfChecked(items)}/${items.length} selecionados`}
                />
                <Divider />
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ px: 2, py: 1 }}
                />
                <List
                    sx={{
                        width: 350,
                        height: 350,
                        bgcolor: 'background.paper',
                        overflow: 'auto',
                    }}
                    dense
                    component="div"
                    role="list"
                >
                    {filteredItems.map((value) => (
                        <ListItemButton
                            key={value.id}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': value.objective,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={value.id} primary={value.objective} secondary={value.skill?.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Card>
        );
    };

    return (
        dataLoaded === false ? (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        ) : (
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                            <Grid container sx={{ m: 1 }}>
                                <FormControl sx={{ m: 1, minWidth: 250 }}>
                                    <DatePicker
                                        label="Data da Agenda"
                                        value={dayjs(formik.values.start)}
                                        format="DD/MM/YYYY"
                                        onChange={(value) => {
                                            formik.setFieldValue('start', value);
                                        }}
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1, minWidth: 250 }}>
                                    <InputLabel>Especialidade</InputLabel>
                                    <Select
                                        label="Especialidade"
                                        id="specialty_id"
                                        name="specialty_id"
                                        value={formik.values.specialty_id}
                                        onChange={handleSpecialty}
                                        fullWidth
                                        required
                                    >
                                        {
                                            specialties.map((specialty: any) => {
                                                return <MenuItem key={specialty.id} value={specialty.id}>
                                                    {specialty.name}
                                                </MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                {
                                    !id ? (
                                        formik.values.timeSlots.map((slot: any, index: any) => (
                                            <Grid item key={index}>
                                                <FormControl sx={{ m: 1, minWidth: 50 }}>
                                                    <TextField
                                                        id={`timeSlots.${index}.start_hour`}
                                                        name={`timeSlots.${index}.start_hour`}
                                                        label="Início"
                                                        value={slot.start_hour}
                                                        onChange={formik.handleChange}
                                                        InputProps={{ inputComponent: HourMask }}
                                                        required
                                                        fullWidth
                                                    />
                                                </FormControl>
                                                <FormControl sx={{ m: 1, minWidth: 50 }}>
                                                    <TextField
                                                        id={`timeSlots.${index}.end_hour`}
                                                        name={`timeSlots.${index}.end_hour`}
                                                        label="Final"
                                                        value={slot.end_hour}
                                                        onChange={formik.handleChange}
                                                        InputProps={{ inputComponent: HourMask }}
                                                        required
                                                    />
                                                </FormControl>
                                                {formik.values.timeSlots.length > 1 && (
                                                    <FormControl sx={{ m: 1 }}>
                                                        <IconButton onClick={() => handleRemoveTimeSlot(index)} color="error">
                                                            <RemoveCircle />
                                                        </IconButton>
                                                    </FormControl>
                                                )}
                                                {index === formik.values.timeSlots.length - 1 && (
                                                    <FormControl sx={{ m: 1 }}>
                                                        <IconButton onClick={handleAddTimeSlot} color="primary">
                                                            <AddCircle />
                                                        </IconButton>
                                                    </FormControl>
                                                )}
                                            </Grid>
                                        ))

                                    ) : (
                                        <Grid item>
                                            <FormControl sx={{ m: 1, minWidth: 50 }}>
                                                <TextField
                                                    id="start_hour"
                                                    name="start_hour"
                                                    label="Final"
                                                    value={formik.values.start_hour}
                                                    onChange={formik.handleChange}
                                                    InputProps={{ inputComponent: HourMask }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormControl sx={{ m: 1, minWidth: 50 }}>
                                                <TextField
                                                    id="end_hour"
                                                    name="end_hour"
                                                    label="Final"
                                                    value={formik.values.end_hour}
                                                    onChange={formik.handleChange}
                                                    InputProps={{ inputComponent: HourMask }}
                                                    required
                                                />
                                            </FormControl>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item>
                        {!id && (
                            <Grid container>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="info">
                                        Em caso de repetição na semana, selecione os dias.
                                    </Alert>
                                </Stack>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item>
                        <Grid container sx={{ m: 1 }}>
                            {!id && (
                                <FormControl sx={{ m: 1, minWidth: 250 }}>
                                    <InputLabel>Dia da semana</InputLabel>
                                    <Select
                                        label="Dia da semana"
                                        id="weekDays"
                                        name="weekDays"
                                        multiple
                                        fullWidth
                                        value={formik.values.weekDays}
                                        onChange={handleWeekDays}
                                        onBlur={formik.handleBlur}
                                        renderValue={(selected: any) => (
                                            <div>
                                                {selected.map((value: any) => (
                                                    <Chip key={value.id} label={value.text as string} />
                                                ))}
                                            </div>
                                        )}
                                    >
                                        {weekDays.map((value: any) => (
                                            <MenuItem key={value.id} value={value}>{value.text}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel>Repete</InputLabel>
                                <Select
                                    label="Repete"
                                    id="repeat"
                                    name="repeat"
                                    value={formik.values.repeat}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    required
                                >
                                    <MenuItem value={'NÃO'}>Não</MenuItem>
                                    <MenuItem value={'SEMANALMENTE'}>Semanalmente</MenuItem>
                                    <MenuItem value={'MENSALMENTE'}>Mensalmente</MenuItem>
                                </Select>
                            </FormControl>
                            {formik.values.repeat !== 'NÃO' && (
                                <FormControl sx={{ m: 1, minWidth: 250 }}>
                                    <InputLabel>Período</InputLabel>
                                    <Select
                                        label="Período"
                                        id="period"
                                        name="period"
                                        value={formik.values.period}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        required
                                    >
                                        <MenuItem value={1}>1 mês</MenuItem>
                                        <MenuItem value={2}>2 meses</MenuItem>
                                        <MenuItem value={3}>3 meses</MenuItem>
                                        <MenuItem value={4}>4 meses</MenuItem>
                                        <MenuItem value={5}>5 meses</MenuItem>
                                        <MenuItem value={5}>6 meses</MenuItem>
                                        <MenuItem value={7}>7 meses</MenuItem>
                                        <MenuItem value={8}>8 meses</MenuItem>
                                        <MenuItem value={9}>9 meses</MenuItem>
                                        <MenuItem value={10}>10 meses</MenuItem>
                                        <MenuItem value={11}>11 meses</MenuItem>
                                        <MenuItem value={12}>12 meses</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <FormControl sx={{ m: 1, minWidth: 720 }}>
                                    <InputLabel>Cliente</InputLabel>
                                    <Select
                                        label="Cliente"
                                        id="student_id"
                                        name="student_id"
                                        value={formik.values.student_id}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        required
                                    >
                                        {
                                            students.map((student) => {
                                                return <MenuItem key={student.id} value={student.id}>
                                                    {student.text}
                                                </MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <FormControl sx={{ m: 1, minWidth: 720 }}>
                                    <InputLabel>Profissional</InputLabel>
                                    <Select
                                        label="Profissional"
                                        id="instructor_id"
                                        name="instructor_id"
                                        value={formik.values.instructor_id}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        required
                                    >
                                        {
                                            profissionals.map((professional) => {
                                                return <MenuItem key={professional.id} value={professional.id}>
                                                    {professional.text}
                                                </MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {!id && (
                                <><Alert severity="info">
                                    Filtre os ojetivos pela habilidade. Para agenda, as habildiades salvas serão consideradas pelos objetivos selecionados.
                                </Alert><Grid container alignItems="center" justifyContent="center">
                                        <FormControl sx={{ m: 1, minWidth: 800 }}>
                                            <InputLabel>Habilidades</InputLabel>
                                            <Select
                                                label="Habilidades"
                                                id="skill"
                                                name="skill_id"
                                                value={formik.values.student_id}
                                                onChange={handleSkill}
                                                fullWidth
                                                required
                                            >
                                                {skills.map((skill) => {
                                                    return <MenuItem key={skill.id} value={skill.id}>
                                                        {skill.text}
                                                    </MenuItem>;
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                                            <Grid item>{customList('Objetivos', procedures)}</Grid>
                                            <Grid item>
                                                <Grid container direction="column" alignItems="center">
                                                    <Button
                                                        sx={{ my: 0.5 }}
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={handleCheckedRight}
                                                        disabled={leftChecked.length === 0}
                                                        aria-label="mover para direita"
                                                    >
                                                        &gt;
                                                    </Button>
                                                    <Button
                                                        sx={{ my: 0.5 }}
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={handleCheckedLeft}
                                                        disabled={rightChecked.length === 0}
                                                        aria-label="mover para esquerda"
                                                    >
                                                        &lt;
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            <Grid item>{customList('Selecionados', proceduresSelected)}</Grid>
                                        </Grid>
                                    </Grid>
                                </>

                            )}

                        </Stack>
                    </Grid>
                    {
                        id ? (
                            <>
                            <ScheduleProcedures />
                            <Grid item sx={{
                                    marginTop: 2,
                                }}>
                                    <Grid container alignItems="center" justifyContent="center">
                                        <Grid item alignContent="right" xl={4} lg={4} md={4} sm={4} xs={4}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleOpen}
                                                startIcon={<EventBusy />}>
                                                Cancelar esta agenda
                                            </Button>
                                        </Grid>
                                        <Grid item alignContent="right" xl={4} lg={4} md={4} sm={4} xs={4}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleOpenE}
                                                startIcon={<PlaylistRemove />}>
                                                Cancelar relacionadas
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="right" justifyContent="right">
                                        <Grid item alignContent="center" xl={1} lg={1} md={1} sm={1} xs={1}>
                                            <IconButton
                                                title="Voltar"
                                                onClick={historyBack}
                                            >
                                                <ReplyOutlined />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid></>
                        ) : (
                            <Grid item sx={{
                                marginTop: 2,
                            }}>
                                <Grid container alignItems="right" justifyContent="right">
                                    <Grid item alignContent="center" xl={1} lg={1} md={1} sm={1} xs={1}>
                                        <IconButton
                                            title="Voltar"
                                            onClick={historyBack}
                                        >
                                            <ReplyOutlined />
                                        </IconButton>
                                    </Grid>

                                    <Grid item xl={1} lg={1} md={1} sm={1} xs={1} mr={2}>
                                        <IconButton
                                            type="submit"
                                            title="Savar"
                                        >
                                            <Save />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }
                    <Grid item>
                        <Box>
                            <Snackbar
                                open={snackbarOpen}
                                autoHideDuration={5000}
                                onClose={handleSnackbarClose}
                                message={snackbarMessage}
                            >
                                {snackbarError ? (
                                    <Alert severity="error" sx={{ width: '100%' }}>
                                        {snackbarMessage}
                                    </Alert>

                                ) : (
                                    <Alert severity="success" sx={{ width: '100%' }}>
                                        Dados salvos com sucesso!
                                    </Alert>
                                )}
                            </Snackbar>
                        </Box>
                    </Grid>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Confirmação de Cancelamento</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Tem certeza de que deseja cancelar esta agenda?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancelar
                            </Button>
                            <Button
                                onClick={() => handleDeleteEvent()}
                                color="primary"
                                autoFocus
                            >
                                Sim
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openE} onClose={handleCloseE}>
                        <DialogTitle>Confirmação de Cancelamento</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Tem certeza de que deseja cancelar todas as agendas relacionadas?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseE} color="primary">
                                Cancelar
                            </Button>
                            <Button
                                onClick={() => handleDeleteAllEvents()}
                                color="primary"
                                autoFocus
                            >
                                Sim
                            </Button>
                        </DialogActions>
                    </Dialog>
                </form>
            </Box>
        )
    );
}