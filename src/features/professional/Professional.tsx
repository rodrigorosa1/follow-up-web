import { Grid, Fab, Switch, Typography, IconButton, Avatar, Paper, Autocomplete, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import * as React from "react";
import AddIcon from '@mui/icons-material/Add';
import { HiPencilSquare } from "react-icons/hi2";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { activeProf, filtersProfessionals, getProfessionals } from "../../services/professional.service";
import { useFormik } from "formik";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";
import { FilterAltSharp, Search } from "@mui/icons-material";
import { getInstructorAvatarId } from "../../services/avatar.service";

export const Professional = () => {
    let navigate: NavigateFunction = useNavigate();
    const [professionals, setProfessionals] = React.useState<any[]>([]);
    const [currentActive, setCurrentActive] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const goRegister = () => {
        navigate("/professionals/register");
    };

    const goDetails = (id: string) => {
        navigate('/professionals/' + id);
    };

    const loadAvatar = (id: string) => {
        return getInstructorAvatarId(id).toString();
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
            await activeProf(currentActive);
            handleClose();
            listProfessionals();
        }
    }

    const listProfessionals = async () => {
        const list = await getProfessionals();
        setProfessionals(list);
    }

    const defaultProps = {
        options: professionals,
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
        const instructor_id = form.professional ? (form.professional.id) : null;
        const data = {
            instructor_id: instructor_id,
        }
        return data;
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            professional: null,
        },
        onSubmit: async (values) => {
            const payload = formatPayload(values);
            const list = await filtersProfessionals(payload);
            setProfessionals(list);
        }
    });

    React.useEffect(() => {
        listProfessionals();
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
                        title2="profissional"
                        href2="/professionals"
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
                                        value={formik.values.professional}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('professional', newValue);
                                        }}
                                        id="professional_id"
                                        disableCloseOnSelect

                                        renderInput={(params) => (
                                            <TextField {...params} label="Profssional" variant="standard" />
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
                                <TableCell>Profissional</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Situação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tableBody">
                            {professionals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textIndent: 5
                                        }}>
                                            <Avatar
                                                alt={row.fullname}
                                                src={loadAvatar(row.user_id)}
                                            />

                                            {row.fullname}
                                        </div>
                                    </TableCell>
                                    <TableCell>{row.phone}</TableCell>
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
                                            {/* {params.value} */}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={professionals.length}
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
                        Tem certeza de que deseja alterar o status do profissional?
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