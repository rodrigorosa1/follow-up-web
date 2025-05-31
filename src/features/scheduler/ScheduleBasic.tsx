import * as React from "react"
import { IEvent, Iselection } from "../../types/scheduler.type";
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { deleteAllEvents, getEventslId, postEvents, updateEvents } from "../../services/event.service";
import { Button, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Alert, Box, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Stack } from "@mui/material";
import { useFormik } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { HourMask } from "../../components/masks/InputMask";
import { AddCircle, PlaylistRemove, RemoveCircle, ReplyOutlined, Save } from "@mui/icons-material";
import { getActiveProfessionals } from "../../services/professional.service";
import { getActiveStudents } from "../../services/student.service";
import { getProcedures, getSkillsSpecialty } from "../../services/skill.service";
import IProcedure from "../../types/procedure.type";
import { getSpecialties } from "../../services/specialty.service";
import ISpecialty from "../../types/specialty.type";
import { ProcedureSchedule } from "./modals/ProcedureSchedule";
import { PageLoad } from "../../components/animations/PageLoad";

export const ScheduleBasic = () => {
    const initial: IEvent = {
        student_id: '',
        start: '',
        period: '',
        repeat: '',
        slots: [
            {
                weekDays: [],
                specialty_id: '',
                instructor_id: '',
                skill_id: '',
                skills: [],
                procedures: [],
                allProcedures: [],
                timeSlots: [{ start_hour: '', end_hour: '' }],
            },
        ],
    }

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
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedProcedures, setSelectedProcedures] = React.useState<IProcedure[]>([]);
    const [selectedProceduresSlot, setSelectedProceduresSlot] = React.useState<IProcedure[]>([]);
    const [selectedSkillId, setSelectedSkillId] = React.useState<string | null>(null);
    const [selectedSlotIndex, setSelectedSlotIndex] = React.useState<number | null>(null);


    const { id } = useParams();

    let navigate: NavigateFunction = useNavigate();

    const historyBack = () => {
        navigate("/scheduler");
    }

    const specialtyList = async () => {
        const list = await getSpecialties();
        setSpecialties(list);
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

    const handleWeekDays = (event: any, slotIndex: number) => {
        const selectedValues = event.target.value;
        formik.setFieldValue(`slots.${slotIndex}.weekDays`, selectedValues);
    };

    const parseWeekDays = (weekDaysString: string) => {
        const days = [
            { value: 1, text: 'Seg' },
            { value: 2, text: 'Ter' },
            { value: 3, text: 'Qua' },
            { value: 4, text: 'Qui' },
            { value: 5, text: 'Sex' },
            { value: 6, text: 'Sab' }
        ]
        return weekDaysString.split(',').map(value => {
            const day = days.find(d => d.value === Number(value));
            return day ? { value: day.value, text: day.text } : null;
        }).filter(Boolean);
    };

    const scheduleId = async (event_id: string) => {
        const response = await getEventslId(event_id);
        const event: IEvent = {
            student_id: response.student_id,
            event_id: response.id,
            start: new Date(response.start_in).toISOString().split('T')[0],
            repeat: response.repeat,
            period: response.period,
            slots: response.slots.map((slot: {
                procedures: any[];
                all_procedures: any[];
                skills: any[];
                skill_id: any;
                instructor_id: any;
                specialty_id: any;
                date_weeks: any;
                time_slots: any[];
            }) => ({
                instructor_id: slot.instructor_id,
                specialty_id: slot.specialty_id,
                skill_id: slot.skill_id,
                skills: slot.skills.map((skill: { id: any; name: any }) => ({
                    id: skill.id,
                    text: skill.name,
                    value: skill.id,
                })),
                procedures: slot.procedures.map((procedure: any) => ({
                    ...procedure,
                    id: procedure.procedure_id
                })),
                allProcedures: slot.all_procedures || [],
                weekDays: parseWeekDays(slot.date_weeks),
                timeSlots: slot.time_slots.map((time: {
                    start_hour: any;
                    end_hour: any
                }) => ({
                    start_hour: time.start_hour,
                    end_hour: time.end_hour,
                }))
            }))
        }
        formik.setFieldValue('slots', event.slots);
        setDataForm(event);
        setDataLoaded(true);
    }

    const handleDeleteAllEvents = () => {
        if (dataForm.event_id) {
            setDataLoaded(false);
            deleteAllEvents(dataForm.event_id).then((r) => {
                if (r.status_code === 200) {
                    handleCloseE();
                    handleSnackbarOpen();
                    setDataLoaded(true);
                    navigate("/scheduler/");
                }
                handleMessage(r.response.data.detail);
                handleCloseE();
                handleSnackbarError();
                handleSnackbarOpen();
                setDataLoaded(true);
            }).catch((e) => {
                console.error(e);
            });
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

    const handleCloseE = () => {
        setOpenE(false);
    };

    React.useEffect(() => {
        dataOptions();
    }, []);


    React.useEffect(() => {
        if (id) {
            scheduleId(id);
        }
    }, [id]);

    React.useEffect(() => {
        specialtyList();
    }, []);

    const formatPayload = (event: any) => {
        const schedule_in = new Date(event.start).toISOString().split('T')[0];
        const data = {
            schedule_in: schedule_in,
            repeat: event.repeat,
            period: event.repeat == 'NÃO' ? 1 : event.period,
            student_id: event.student_id,
            date_slots: formatDatesSlot(schedule_in, event.slots),
        }
        return data;
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: dataForm,
        onSubmit: (values) => {
            setDataLoaded(false);
            const payload = formatPayload(values);
            if (id) {
                updateEvents(dataForm?.event_id, payload).then((r) => {
                    if (Array.isArray(r)) {
                        setSnackbarError(false)
                        setSnackbarMessage('Agenda atualizada com sucesso!');
                        setSnackbarOpen(true);
                        setDataLoaded(true);
                        navigate("/scheduler/" + r[0].event_id);
                        return;
                    }
                    handleMessage(r.response.data.detail);
                    setDataLoaded(false);
                    handleSnackbarError();
                    handleSnackbarOpen();
                }).catch((e) => {
                    console.error(e);
                });
                return;
            }
            postEvents(payload).then((r) => {
                if (Array.isArray(r)) {
                    setSnackbarError(false)
                    setSnackbarMessage('Agenda cadastrada com sucesso!');
                    setSnackbarOpen(true);
                    setDataLoaded(true);
                    navigate("/scheduler/" + r[0].event_id);
                    return;
                }
                handleMessage(r.response.data.detail);
                setDataLoaded(false);
                handleSnackbarError();
                handleSnackbarOpen();
            }).catch((e) => {
                console.error(e);
            });
        }
    });

    const formatDatesSlot = (initialDate: string, slots: any[]) => {
        const parsedDate = dayjs(initialDate);

        return slots.map(slot => {
            const selectedDates = slot.weekDays.map((daySelected: { value: number }) => {
                return parsedDate.day(daySelected.value).format('YYYY-MM-DD');
            });

            return {
                specialty_id: slot.specialty_id,
                instructor_id: slot.instructor_id,
                skill_id: slot.skill_id,
                procedures: slot.procedures,
                dates: selectedDates,
                time_slots: slot.timeSlots,
                date_weeks: slot.weekDays
            };
        });
    };

    const handleAddSlot = () => {
        formik.setFieldValue("slots", [
            ...formik.values.slots,
            {
                weekDays: [],
                allProcedures: [],
                procedures: [],
                specialty_id: "",
                instructor_id: "",
                skill_id: "",
                timeSlots: [{ start_hour: "", end_hour: "" }],
            },
        ]);
    };

    const handleRemoveSlot = (slotIndex: number) => {
        if (formik.values.slots.length > 1) {
            const updatedSlots = formik.values.slots.filter((_: any, i: any) => i !== slotIndex);
            formik.setFieldValue("slots", updatedSlots);
        }
    };

    const handleAddTimeSlot = (slotIndex: number) => {
        const updatedSlots = [...formik.values.slots];
        updatedSlots[slotIndex].timeSlots.push({ start_hour: "", end_hour: "" });
        formik.setFieldValue("slots", updatedSlots);
    };

    const handleRemoveTimeSlot = (slotIndex: number, timeSlotIndex: number) => {
        if (formik.values.slots[slotIndex].timeSlots.length > 1) {
            const updatedSlots = [...formik.values.slots];
            updatedSlots[slotIndex].timeSlots = updatedSlots[slotIndex].timeSlots.filter(
                (_: any, i: any) => i !== timeSlotIndex
            );
            formik.setFieldValue("slots", updatedSlots);
        }
    };

    const handleSkill = async (event: any, slotIndex: number) => {
        formik.handleChange(event);
        formik.setFieldValue(`slots.${slotIndex}.skill_id`, event.target.value);
        formik.setFieldValue(`slots.${slotIndex}.allProcedures`, []);
        formik.setFieldValue(`slots.${slotIndex}.procedures`, []);
    }

    const handleSpecialty = async (event: any, slotIndex: number) => {
        formik.handleChange(event);
        const listSkills = await getSkillsSpecialty(event.target.value);
        const skills_: Iselection[] = listSkills.map((skill: { name: any; id: any }) => ({
            id: skill.id,
            text: skill.name,
            value: skill.id,
        }));

        formik.setFieldValue(`slots.${slotIndex}.skills`, skills_);
    };

    const handleOpenModal = async (slotIndex: number) => {
        setSelectedSlotIndex(slotIndex);
        setSelectedProceduresSlot([]);

        const skillId = formik.values.slots[slotIndex].skill_id;
        if (!skillId) {
            alert("Selecione uma habilidade primeiro!");
            return;
        }
        setSelectedSkillId(skillId);

        const slotFound = formik.values.slots.find(
            (slot: any) => slot.skill_id === skillId && slot.allProcedures.length && slot.procedures.length
        );

        if (slotFound) {
            setSelectedProcedures(slotFound.allProcedures);
            setSelectedProceduresSlot(slotFound.procedures);
            setOpenModal(true);
            return;
        }

        if (!formik.values.slots[slotIndex].allProcedures.length) {
            const procedures = await getProcedures(skillId);
            formik.setFieldValue(`slots.${slotIndex}.allProcedures`, procedures);
            setSelectedProcedures(procedures);
            setOpenModal(true);
            return;
        }

        if (formik.values.slots[slotIndex].procedures.length) {
            setSelectedProceduresSlot(formik.values.slots[slotIndex].procedures);
        }

        setSelectedProcedures(formik.values.slots[slotIndex].allProcedures);
        setOpenModal(true);
    };

    const handleSaveProceduresToSlot = (slotIndex: number, procedures: IProcedure[], skillId: string) => {
        formik.values.slots.forEach((slot: any, index: number) => {
            if (slot.skill_id === skillId) {
                formik.setFieldValue(`slots.${index}.procedures`, procedures);
            }
        });
        formik.setFieldValue(`slots.${slotIndex}.procedures`, procedures);
    };

    return (
        !dataLoaded ? (
            <PageLoad />
        ) : (
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid item>
                        <ProcedureSchedule
                            isOpen={openModal}
                            allProcedures={selectedProcedures}
                            onClose={() => setOpenModal(false)}
                            selectedSlot={{ selectedProceduresSlot, index: selectedSlotIndex, skillId: selectedSkillId }}
                            selectedProcedures={selectedProceduresSlot}
                            onSaveProcedures={handleSaveProceduresToSlot}
                            onSnackbarOpen={handleSnackbarOpen}
                        />
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <Grid container sx={{ m: 1 }}>
                                    <FormControl sx={{ m: 1, minWidth: 250 }}>
                                        <DatePicker
                                            label="Inicia em"
                                            value={dayjs(formik.values.start)}
                                            format="DD/MM/YYYY"
                                            onChange={(value) => {
                                                formik.setFieldValue('start', value);
                                            }}
                                        />
                                    </FormControl>
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
                            </LocalizationProvider>
                            <Grid container sx={{ m: 1 }}>
                                <FormControl sx={{ m: 1, minWidth: 790 }}>
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
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container sx={{ m: 1 }}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="info">
                                    Em caso de repetição na semana, selecione os dias.
                                </Alert>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container sx={{ m: 1 }}>
                            {
                                formik.values.slots.map((slot: any, slotIndex: any) => (
                                    <Grid item key={slotIndex} sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
                                        <Grid container>
                                            <Grid item>
                                                <FormControl sx={{ m: 1, minWidth: 200, maxWidth: 200 }}>
                                                    <InputLabel>Dia da semana</InputLabel>
                                                    <Select
                                                        label="Dia da semana"
                                                        id={`slots.${slotIndex}.weekDays`}
                                                        name={`slots.${slotIndex}.weekDays`}
                                                        multiple
                                                        fullWidth
                                                        value={slot.weekDays} // Pegando o valor diretamente do Formik
                                                        onChange={(event) => handleWeekDays(event, slotIndex)} // Corrigindo a atualização correta do slot
                                                        onBlur={formik.handleBlur}
                                                        renderValue={(selected: any) => (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: "100%", overflow: "hidden" }}>
                                                                {selected.map((value: any) => (
                                                                    <Chip
                                                                        key={value.id}
                                                                        label={value.text}
                                                                        sx={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis" }}
                                                                    />
                                                                ))}
                                                            </Box>
                                                        )}
                                                    >
                                                        {weekDays.map((value: any) => (
                                                            <MenuItem key={value.id} value={value}>
                                                                {value.text}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item>
                                                <Stack sx={{ width: '100%' }} spacing={2}>
                                                    <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 200 }}>
                                                        <InputLabel>Especialidade</InputLabel>
                                                        <Select
                                                            label="Especialidade"
                                                            id={`slots.${slotIndex}.specialty_id`}
                                                            name={`slots.${slotIndex}.specialty_id`}
                                                            value={slot.specialty_id}
                                                            onChange={(event) => handleSpecialty(event, slotIndex)}
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
                                                </Stack>
                                            </Grid>
                                            <Grid item>
                                                <Stack sx={{ width: '100%' }} spacing={2}>
                                                    <FormControl sx={{ m: 1, minWidth: 250, maxWidth: 270 }}>
                                                        <InputLabel>Profissional</InputLabel>
                                                        <Select
                                                            label="Profissional"
                                                            id={`slots.${slotIndex}.instructor_id`}
                                                            name={`slots.${slotIndex}.instructor_id`}
                                                            value={slot.instructor_id}
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
                                            <Grid item>
                                                <Stack sx={{ width: '100%' }} spacing={2}>
                                                    <FormControl sx={{ m: 1, minWidth: 200, maxWidth: 250 }}>
                                                        <InputLabel>Habilidades</InputLabel>
                                                        <Select
                                                            label="Habilidades"
                                                            id={`slots.${slotIndex}.skill_id`}
                                                            name={`slots.${slotIndex}.skill_id`}
                                                            value={slot.skill_id}
                                                            onChange={(event) => handleSkill(event, slotIndex)}
                                                            fullWidth
                                                            required
                                                        >
                                                            {slot.skills?.map((skill: any) => (
                                                                <MenuItem key={skill.id} value={skill.id}>
                                                                    {skill.text}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Stack>
                                                {formik.values.slots[slotIndex].skill_id && (

                                                    <Grid item alignContent="right" sx={{ m: 1, marginTop: 0.1 }}>
                                                        <Button variant="contained"
                                                            onClick={() => handleOpenModal(slotIndex)}
                                                            size="small"
                                                            color="secondary">
                                                            Objetivos
                                                        </Button>
                                                    </Grid>
                                                )}

                                            </Grid>
                                            <Grid item>
                                                {formik.values.slots.length > 1 && (
                                                    <IconButton onClick={() => handleRemoveSlot(slotIndex)} color="error">
                                                        <RemoveCircle />
                                                    </IconButton>
                                                )}
                                                {
                                                    slotIndex === formik.values.slots.length - 1 && (
                                                        <IconButton onClick={handleAddSlot} color="primary" title="Adicionar bloco">
                                                            <AddCircle />
                                                        </IconButton>
                                                    )
                                                }
                                            </Grid>
                                        </Grid>
                                        {slot.timeSlots.map((timeSlot: any, timeSlotIndex: any) => (
                                            <Grid container alignItems="center" key={timeSlotIndex} sx={{ mt: 1, marginTop: 0.1, }}>
                                                <Grid item xs={3}>
                                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                                        <FormControl sx={{ m: 1, minWidth: 50 }}>
                                                            <TextField
                                                                id={`slots.${slotIndex}.timeSlots.${timeSlotIndex}.start_hour`}
                                                                name={`slots.${slotIndex}.timeSlots.${timeSlotIndex}.start_hour`}
                                                                label="Início"
                                                                value={timeSlot.start_hour}
                                                                onChange={formik.handleChange}
                                                                InputProps={{ inputComponent: HourMask }}
                                                                required
                                                            />
                                                        </FormControl>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                                        <FormControl sx={{ m: 1, minWidth: 50 }}>
                                                            <TextField
                                                                id={`slots.${slotIndex}.timeSlots.${timeSlotIndex}.end_hour`}
                                                                name={`slots.${slotIndex}.timeSlots.${timeSlotIndex}.end_hour`}
                                                                label="Final"
                                                                value={timeSlot.end_hour}
                                                                onChange={formik.handleChange}
                                                                InputProps={{ inputComponent: HourMask }}
                                                                required
                                                            />
                                                        </FormControl>
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    {slot.timeSlots.length > 1 && (
                                                        <IconButton
                                                            onClick={() => handleRemoveTimeSlot(slotIndex, timeSlotIndex)}
                                                            color="error"
                                                        >
                                                            <RemoveCircle />
                                                        </IconButton>
                                                    )}
                                                </Grid>
                                                {timeSlotIndex === slot.timeSlots.length - 1 && (
                                                    <Grid item>
                                                        <IconButton onClick={() => handleAddTimeSlot(slotIndex)} color="primary" title="Adicionar horário">
                                                            <AddCircle />
                                                        </IconButton>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        ))}
                                    </Grid>
                                ))}
                        </Grid>
                    </Grid>

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
                            {id && (
                                <Grid item alignContent="center" xl={1} lg={1} md={1} sm={1} xs={1}>
                                    <IconButton
                                        title="Cancelar agenda"
                                        onClick={handleOpen}
                                    >
                                        <PlaylistRemove />
                                    </IconButton>
                                </Grid>
                            )}
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
                                onClick={() => handleDeleteAllEvents()}
                                color="primary"
                                autoFocus
                            >
                                Sim
                            </Button>
                        </DialogActions>
                    </Dialog>
                </form>
            </Box >
        )
    );
}