import * as React from "react"
import { Alert, Box, Card, Fab, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { getProcedures, getSkillslId, postSkills, updateSkills } from "../../services/skill.service";
import { useFormik } from "formik";
import { ReplyRounded, Save } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { HiPencilSquare, HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import IProcedure from "../../types/procedure.type";
import { ModalProcedure } from "../procedures/ModalProcedure";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";
import { getSpecialties } from "../../services/specialty.service";
import ISpecialty from "../../types/specialty.type";
import { PageLoad } from "../../components/animations/PageLoad";
import { GridColDef } from "@mui/x-data-grid";
import { CustomDataGrid } from "../../components/data-grid/custom";


export const SkillsDetails = () => {
    const initial = {
        name: '',
        specialty_id: '',
        objective: '',
    }

    let navigate: NavigateFunction = useNavigate();
    const { id } = useParams();
    const [dataForm, setDataForm] = React.useState(initial);
    const [procedures, setProcedures] = React.useState<IProcedure[]>([]);
    const [specialties, setSpecialties] = React.useState<ISpecialty[]>([]);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarError, setSnackbarError] = React.useState(false);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [selectedProcedure, setSelectedProcedure] = React.useState<IProcedure | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);


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
        setDataLoaded(true);
    };

    const specialtyList = async () => {
        const list = await getSpecialties();
        setSpecialties(list);
    }

    const historyBack = () => {
        navigate("/skills");
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: dataForm,
        onSubmit: (values) => {
            setDataLoaded(false)
            if (id) {
                updateSkills(id, values).then((r) => {
                    if (r.id) {
                        setSnackbarError(false)
                        setSnackbarMessage('Habilidade atualizada com sucesso!');
                        setSnackbarOpen(true);
                        setDataLoaded(true)
                        return;
                    }
                    setSnackbarError(true)
                    setSnackbarMessage(r.response.data.detail);
                    setSnackbarOpen(true);
                    setDataLoaded(true)
                }).catch((e) => {
                    console.error(e);
                });
                return;
            }
            postSkills(values).then((r) => {
                if (r.id) {
                    setSnackbarError(false)
                    setSnackbarMessage('Habilidade cadastrada com sucesso!');
                    setSnackbarOpen(true);
                    setDataLoaded(true)
                    navigate("/skills/" + r.id);
                    return;
                }
                setSnackbarError(true)
                setSnackbarMessage(r.response.data.detail);
                setSnackbarOpen(true);
                setDataLoaded(true)
            }).catch((e) => {
                console.error(e);
            });
        }
    });

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const initialEditValues = (values: any) => {
        const initial = {
            specialty_id: values.specialty_id,
            name: values.name,
            objective: values.objective,
        }
        return initial;
    }

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Objetivo',
            width: 390,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'objective',
            headerName: 'Descrição',
            width: 500,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'goal',
            headerName: 'Situação',
            width: 150,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton>
                        <HiPencilSquare
                            size={20}
                            color='grey'
                            onClick={() => handlePrcdClick(params.row)}
                        />
                    </IconButton>
                </div>
            ),
            headerClassName: 'header-datagrid-prof',
        },
    ];

    React.useEffect(() => {
        getSkill();
    }, []);

    React.useEffect(() => {
        specialtyList();
    }, []);


    return (
        <Grid
            container
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

            {!dataLoaded ? (
                <PageLoad />
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
                                    <InputLabel>Especialidade</InputLabel>
                                    <Select
                                        label="Especialidade"
                                        id="specialty_id"
                                        name="specialty_id"
                                        value={formik.values.specialty_id}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        required
                                        size="small"
                                    >
                                        {
                                            specialties.map((specialty: any) => {
                                                return <MenuItem key={specialty.id} value={specialty.id}>
                                                    {specialty.name}
                                                </MenuItem>
                                            })
                                        }
                                    </Select>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            <Grid container rowSpacing={5}>
                                <Grid item xl={10} lg={10} md={10} sm={10} xs={10} sx={{ m: 2 }}>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Nome"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        margin="normal"
                                        required
                                        size="small"
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
                                        rows={2}
                                        value={formik.values.objective}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        size="small"
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
                                <Box
                                    sx={{
                                        height: 650,
                                        width: '100%',
                                    }}
                                >
                                    <CustomDataGrid
                                        columns={columns}
                                        rows={procedures}
                                    />
                                </Box>
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