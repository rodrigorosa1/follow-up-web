import * as React from "react"
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { filtersFollowUp, getFollowUp } from "../../services/follow-up.service";
import { Avatar, Grid, IconButton, Typography, Table, TableBody, TableCell, TableHead, TableRow, Chip, Paper, TableContainer, Autocomplete, Card, CardHeader, CardContent, FormControl, FormLabel, TablePagination, colors, } from "@mui/material";
import { HiEye, } from "react-icons/hi2";
import { TextField } from "@material-ui/core";
import { FilterAltSharp, Search } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";
import { getStudents } from "../../services/student.service";
import { getInstructorAvatarId, getStudentAvatarId } from "../../services/avatar.service";


export const FollowUp = () => {
    let navigate: NavigateFunction = useNavigate();
    const [events, setEvents] = React.useState<any[]>([]);
    const [students, setStudents] = React.useState<any[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const goDetails = (id: string) => {
        navigate('/follow-up/' + id);
    };

    const listEvents = async () => {
        const list = await getFollowUp();
        setEvents(list);
    }

    const listStudents = async () => {
        const stds = await getStudents()
        setStudents(stds);
    }

    const loadStudentAvatar = (id: string) => {
        return getStudentAvatarId(id).toString();
    }

    const loadProfessionalAvatar = (id: string) => {
        return getInstructorAvatarId(id).toString();
    }

    const defaultProps = {
        options: students,
        getOptionLabel: (option: any) => option.fullname,
    };

    const truncateText = (text: string, maxLength: number): string => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + '...';
      };

    React.useEffect(() => {
        listEvents();
        listStudents();
    }, []);

    const formatPayload = (form: any) => {
        const student_id = form.student ? (form.student.id) : null;
        const formattedStart = new Date(form.start).toISOString().split('T')[0];
        const formattedEnd = new Date(form.end).toISOString().split('T')[0];
        const data = {
            student_id: student_id,
            start: formattedStart,
            end: formattedEnd
        }
        return data;
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            student: null,
            start: null,
            end: null
        },
        onSubmit: async (values) => {
            const payload = formatPayload(values);
            const list = await filtersFollowUp(payload);
            setEvents(list);
        }
    });

    return (
        <Grid container
            justifyContent="space-evenly"
            alignItems="center"
            rowSpacing={3}
            spacing={5}
            columnSpacing={{ xs: 5, sm: 7, md: 9 }}
        >
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid container alignItems="left" justifyContent="left">
                    <CustomBreadcrumbs
                        title1="follow-up"
                        href1="/follow-up"
                        title2=""
                        href2=""
                    />
                </Grid>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <form onSubmit={formik.handleSubmit}>
                        <Paper elevation={2}>
                            <React.Fragment>
                                <Grid container>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <div className="paperFilters">
                                            <FilterAltSharp />
                                            <Typography color="#818181" variant="subtitle2" sx={{ flex: 1, m: 1 }} gutterBottom>
                                                Filtros
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xl={4} lg={4} md={4} sm={4} xs={4} sx={{
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
                                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2} sx={{
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
                                            />

                                        </FormControl>
                                    </Grid>
                                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2} sx={{
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
                                            />

                                        </FormControl>
                                    </Grid>
                                    <Grid item xl={2} lg={2} md={1} sm={1} xs={1}>
                                        <div className="buttonPaperFilters">
                                            <IconButton
                                                type="submit"
                                                title="Buscar"
                                            >
                                                <Search />
                                            </IconButton>
                                        </div>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        </Paper>
                    </form>
                </Grid>
            </LocalizationProvider>

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead className="tableHeader">
                            <TableRow>
                                <TableCell>Data Agenda</TableCell>
                                <TableCell>Hora</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Profissional</TableCell>
                                <TableCell>Habilidade</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Ver</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tableBody">
                            {events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <div>
                                            <Chip
                                                label={new Date(row.start).toLocaleDateString('pt-BR')}
                                                color='default'
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <Chip
                                                label={row.start_hour}
                                                color='default'
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textIndent: 5
                                        }}>
                                            {row.student && (
                                                <Avatar
                                                    alt={row.student.fullname}
                                                    src={loadStudentAvatar(row.student.id)}
                                                />

                                            )}
                                            {row.student.fullname}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textIndent: 5
                                        }}>
                                            {row.instructor && (
                                                <Avatar
                                                    alt={row.instructor.fullname}
                                                    src={loadProfessionalAvatar(row.instructor.id)}
                                                />
                                            )}
                                            {row.instructor.fullname}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            {row.skills.map((skill: any) => (
                                                <Chip
                                                    key={skill.id}
                                                    label={truncateText(skill.skill_name, 25)} />
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            color={
                                                row.status === 'AGENDADO' ? 'default' :
                                                    row.status === 'EM ANDAMENTO' ? 'primary' :
                                                        row.status === 'PAUSADO' ? 'warning' :
                                                            row.status === 'CONCLUÍDO' ? 'success' :
                                                                'error'
                                            }
                                        /></TableCell>
                                    <TableCell align="left">
                                        <IconButton>
                                            <HiEye
                                                size={20}
                                                color='grey'
                                                onClick={() => goDetails(row.id)}
                                            />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={events.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Grid>
        </Grid>
    );

}