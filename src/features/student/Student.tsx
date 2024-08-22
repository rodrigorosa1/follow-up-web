import { Grid, Fab, Switch, IconButton, Avatar, Paper, Autocomplete, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import * as React from "react";
import AddIcon from '@mui/icons-material/Add';
import { HiPencilSquare } from "react-icons/hi2";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { activeStudent, filtersStudents, getStudents } from "../../services/student.service";
import { FilterAltSharp, Search } from "@mui/icons-material";
import { useFormik } from "formik";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";
import { getStudentAvatarId } from "../../services/avatar.service";


export const Student = () => {
    let navigate: NavigateFunction = useNavigate();
    const [students, setStudents] = React.useState<any[]>([]);
    const [currentActive, setCurrentActive] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const goRegister = () => {
        navigate("/students/register");
    };

    const goDetails = (id: string) => {
        navigate('/students/' + id);
    };

    const loadAvatar = (id: string) => {
        return getStudentAvatarId(id).toString();
    }

    const listStudents = async () => {
        const list = await getStudents();
        setStudents(list);
    }

    const handleOpen = (id: string) => {
        setCurrentActive(id);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const activeUpdate = async () => {
        if (currentActive) {
            await activeStudent(currentActive);
            handleClose();
            listStudents();
        }
    }

    const defaultProps = {
        options: students,
        getOptionLabel: (option: any) => option.fullname,
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const formatPayload = (form: any) => {
        const student_id = form.student ? (form.student.id) : null;
        const data = {
            student_id: student_id,
        }
        return data;
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            student: null,
        },
        onSubmit: async (values) => {
            const payload = formatPayload(values);
            const list = await filtersStudents(payload);
            setStudents(list);
        }
    });

    React.useEffect(() => {
        listStudents();
    }, []);


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
                        title1="cadastro"
                        href1="/registers"
                        title2="cliente"
                        href2="/students"
                    />
                </Grid>
            </Grid>

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

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid container alignItems="right" justifyContent="right">
                    <Fab variant="extended" size="small" color="primary" aria-label="add" onClick={goRegister}>
                        <AddIcon sx={{ mr: 1 }} />
                        Novo
                    </Fab>
                </Grid>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead className="tableHeader">
                            <TableRow>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Responsável</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Situação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tableBody">
                            {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textIndent: 5
                                        }}>
                                            <Avatar
                                                alt={row.fullname}
                                                src={loadAvatar(row.id)}
                                            />

                                            {row.fullname}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {row.responsibles.length > 0 && (
                                            row.responsibles[0].fullname
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {row.responsibles.length > 0 && (
                                            row.responsibles[0].phone
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton>
                                                <HiPencilSquare
                                                    size={20}
                                                    color='grey'
                                                    onClick={() => goDetails(row.id)}
                                                />
                                            </IconButton>
                                            <Switch
                                                defaultChecked
                                                color="primary"
                                                size="small"
                                                checked={row.status == 'ATIVO' ? true : false}
                                                onChange={() => handleOpen(row.id)}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={students.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmação de alteração de status</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza de que deseja alterar o status do cliente?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => activeUpdate()}
                        color="primary"
                        autoFocus
                    >
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>

    );

}