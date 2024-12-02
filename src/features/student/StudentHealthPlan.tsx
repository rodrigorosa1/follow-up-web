import * as React from "react"
import { useFormik } from "formik";
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { getStudentHealthPlan } from "../../services/student.service";
import { IHealthPlan } from "../../types/healthPlan.type";
import { Alert, Box, Button, Grid, IconButton, LinearProgress, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ReplyOutlined } from "@mui/icons-material";
import { ModalStudentHealthPlan } from "./ModalStudentHealthPlan";
import AddIcon from '@mui/icons-material/Add';
import { HiOutlineArchiveBoxXMark, HiPencilSquare } from "react-icons/hi2";
import { ModalSelectPlan } from "./ModalSelectPlan";
import SendIcon from '@mui/icons-material/Send';
import { DeleteHealthPlanDialog } from "../../components/dialogs/custom-dialogs";

export const StudentHealthPlan = () => {
    const initial = {
        plan: '',
        social_name: '',
        fantasy_name: '',
        document: '',
        zip_code: '',
        name: '',
        address: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        state: ''
    }

    let navigate: NavigateFunction = useNavigate();
    const { id } = useParams();
    const [dataForm, setDataForm] = React.useState(initial);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarError, setSnackbarError] = React.useState(false);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [healthPlanStudent, setHealthPlanStudent] = React.useState<IHealthPlan[]>([]);
    const [healthPlanSelected, setHealthPlanSelected] = React.useState<IHealthPlan | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isModalPlanOpen, setIsModalPlanOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const historyBack = () => {
        navigate("/students");
    }

    const studentPlan = async () => {
        if (id) {
            const plan = await getStudentHealthPlan(id);
            if (plan) {
                setHealthPlanStudent(plan)
            }
        }
        setDataLoaded(true)
    }

    const handlePlanClick = (plan: IHealthPlan) => {
        setHealthPlanSelected(plan);
        setIsModalOpen(true);
    };

    const handlePlandNew = () => {
        setHealthPlanSelected(null);
        setIsModalOpen(true);
    };

    const handleSelectPlan = () => {
        setIsModalPlanOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleCloseSelectPlan = () => {
        setIsModalPlanOpen(false);
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    }

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: dataForm,
        onSubmit: (values) => {
        },
    });

    const handleClickOpen = (plan: IHealthPlan) => {
        setHealthPlanSelected(plan);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        studentPlan();
    };

    React.useEffect(() => {
        studentPlan();
    }, []);

    return (
        dataLoaded === false ? (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        ) : (
            <form onSubmit={formik.handleSubmit}>
                <Grid container>
                    {id && (
                        <Grid item>
                            <ModalSelectPlan
                                studentPlan={studentPlan}
                                isOpen={isModalPlanOpen}
                                id={id}
                                onClose={handleCloseSelectPlan}
                                onSnackbarOpen={handleSnackbarOpen}
                            />
                        </Grid>
                    )}
                    <Grid item>
                        <ModalStudentHealthPlan
                            healthPlan={healthPlanSelected}
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onSnackbarOpen={handleSnackbarOpen}
                            studentPlan={studentPlan}
                        />
                    </Grid>
                    {id && (
                        <Grid item>
                            <DeleteHealthPlanDialog
                                healthPlan={healthPlanSelected}
                                isOpen={open}
                                id={id}
                                studentPlan={studentPlan}
                                onClose={handleClose}
                                onSnackbarOpen={handleSnackbarOpen}
                            />

                        </Grid>
                    )}
                    <Grid item>
                        <Grid container>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    onClick={handleSelectPlan}
                                    variant="outlined"
                                    startIcon={<SendIcon />}>
                                    Vincular com plano
                                </Button>
                                <Button
                                    onClick={handlePlandNew}
                                    variant="contained"
                                    startIcon={<AddIcon />}>
                                    Novo Plano
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    {healthPlanStudent ? (
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 400 }} aria-label="responsáveis" size='small'>
                                    <TableHead
                                        sx={{
                                            backgroundColor: '#edf5f3',
                                        }}>
                                        <TableRow>
                                            <TableCell>Plano</TableCell>
                                            <TableCell>Cidade</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {healthPlanStudent.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.plan.fantasy_name}
                                                </TableCell>
                                                <TableCell >{row.plan.city}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton>
                                                        <HiPencilSquare
                                                            size={18}
                                                            color='grey'
                                                            onClick={() => handlePlanClick(row.plan)}
                                                        />
                                                    </IconButton>
                                                    <IconButton>
                                                        <HiOutlineArchiveBoxXMark
                                                            size={18}
                                                            color='grey'
                                                            onClick={() => handleClickOpen(row.plan)}
                                                        />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                    ) : (
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ p: 2, }}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="info">
                                    Nenhum plano de saúde para o cliente...
                                </Alert>
                            </Stack>
                        </Grid>
                    )}
                </Grid>
                <Grid item sx={{ p: 2, }}>
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
                </Grid>
            </form>


        )


    );




}