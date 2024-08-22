import { Alert, Box, Card, Fab, Grid, IconButton, LinearProgress,  Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getProcedures, getSkillslId, postSkills, updateSkills } from "../../services/skill.service";
import { useFormik } from "formik";
import { ReplyRounded, Save } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { HiPencilSquare, HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import IProcedure from "../../types/procedure.type";
import { ModalProcedure } from "../procedures/ModalProcedure";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";


export const SkillsDetails = () => {
    const initial = {
        name: '',
        objective: '',
    }

    let navigate: NavigateFunction = useNavigate();
    const { id } = useParams();
    const [dataForm, setDataForm] = useState(initial);
    const [procedures, setProcedures] = useState<any[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarError, setSnackbarError] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [selectedProcedure, setSelectedProcedure] = useState<IProcedure | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handlePrcdClick = (procedure: IProcedure) => {
        setSelectedProcedure(procedure);
        setIsModalOpen(true);
    };

    const handlePrcdNew = () => {
        setSelectedProcedure(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        getSkill();
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const getSkill = async () => {
        if (id) {
            const skill = await getSkillslId(id);
            const initial = initialEditValues(skill);
            setDataForm(initial);

            const prcds = await getProcedures(id);
            setProcedures(prcds);
        }
    };

    const historyBack = () => {
        navigate("/skills");
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: dataForm,
        onSubmit: (values) => {
            if (id) {
                updateSkills(id, values).then((r) => {
                    if (r.id) {
                        setSnackbarError(false)
                        setSnackbarMessage('Habilidade atualizada com sucesso!');
                        setSnackbarOpen(true);
                    } else {
                        setSnackbarError(true)
                        setSnackbarMessage(r.response.data.detail);
                        setSnackbarOpen(true);
                    }
                }).catch((e) => {
                    console.error(e);
                });
            } else {
                postSkills(values).then((r) => {
                    if (r.id) {
                        setSnackbarError(false)
                        setSnackbarMessage('Habilidade cadastrada com sucesso!');
                        setSnackbarOpen(true);
                        navigate("/skills/" + r.id);
                    } else {
                        setSnackbarError(true)
                        setSnackbarMessage(r.response.data.detail);
                        setSnackbarOpen(true);
                    }
                }).catch((e) => {
                    console.error(e);
                });
            }
        }
    });

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const initialEditValues = (values: any) => {
        const initial = {
            name: values.name,
            objective: values.objective,
        }
        return initial;
    }

    useEffect(() => {
        getSkill();
    }, []);


    return (
        <Grid
            container
        // rowSpacing={5}
        >
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Grid container alignItems="left" justifyContent="left">
                    <CustomBreadcrumbs
                        title1="cadastro"
                        href1="#"
                        title2="habilidades"
                        href2="/skills"
                    />
                </Grid>
            </Grid>

            {dataLoaded === true ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>

            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <Card
                    >
                        <Box sx={{
                            width: 1250,
                        }}>
                            <Grid item xl={10} lg={10} md={10} sm={10} xs={10} sx={{ m: 2 }}>
                                <Typography variant="h6" component="h2">
                                    Dados da Habilidade
                                </Typography>
                            </Grid>
                        </Box>
                        <Box>
                            <Grid container rowSpacing={5}>
                                <Grid item xl={10} lg={10} md={10} sm={10} xs={10} sx={{ m: 2 }}>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Nome"
                                        size="small"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            <Grid container>
                                <Grid item xl={10} lg={10} md={10} sm={10} xs={10} sx={{ m: 2 }}>
                                    <TextField
                                        id="objective"
                                        name="objective"
                                        label="Descrição"
                                        multiline
                                        size="small"
                                        rows={2}
                                        value={formik.values.objective}
                                        onChange={formik.handleChange}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            <Grid item>
                                <ModalProcedure
                                    procedure={selectedProcedure}
                                    isOpen={isModalOpen}
                                    id={id}
                                    onClose={handleCloseModal}
                                    onSnackbarOpen={handleSnackbarOpen}
                                    getSkill={getSkill}
                                />
                            </Grid>
                        </Box>
                        <Box>
                            <Grid item xl={10} lg={10} md={10} sm={10} xs={10} sx={{ m: 2 }}>
                                <Typography variant="h6" component="h2">
                                    Objetivos
                                </Typography>
                            </Grid>
                            {id ? (
                                <Grid item xl={10} lg={10} md={10} sm={12} xs={12} sx={{ m: 2 }}>
                                    <Grid container alignItems="right" justifyContent="right">
                                        <Fab variant="extended" size="small" color="primary" aria-label="add"
                                            onClick={handlePrcdNew}
                                        >
                                            <AddIcon sx={{ mr: 1 }} />
                                        </Fab>
                                    </Grid>
                                </Grid>

                            ) : (
                                <Grid item></Grid>
                            )}

                            <Grid item xl={10} lg={10} md={10} sm={12} xs={12} sx={{ m: 2 }}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 400 }} aria-label="responsáveis" size='small'>
                                        <TableHead
                                            sx={{
                                                backgroundColor: '#edf5f3',
                                            }}>
                                            <TableRow>
                                                <TableCell>Objetivo</TableCell>
                                                <TableCell>Descrição</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {procedures.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.objective}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <IconButton>
                                                            <HiPencilSquare
                                                                size={18}
                                                                color='grey'
                                                                onClick={() => handlePrcdClick(row)}
                                                            />
                                                        </IconButton>
                                                        <IconButton>
                                                            <HiOutlineArchiveBoxXMark
                                                                size={18}
                                                                color='grey'
                                                            // onClick={() => goDetails(params.row.id)}
                                                            />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Box>
                        <Box>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                                <Grid container alignItems="right" justifyContent="right">
                                    <Grid item alignContent="center" xl={1} lg={1} md={1} sm={1} xs={1}>
                                        <IconButton
                                            title="Voltar"
                                            onClick={historyBack}

                                        >
                                            <ReplyRounded />
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
                        </Box>
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
                                        {snackbarMessage}
                                    </Alert>
                                )}
                            </Snackbar>
                        </Box>
                    </Card>


                </form>
            )
            }

        </Grid >







    )




}