import * as React from "react"
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { getStudentHealthPlan } from "../../services/student.service";
import { IHealthPlan } from "../../types/healthPlan.type";
import { Alert, Box, Button, Grid, IconButton, Snackbar, Stack } from "@mui/material";
import { ReplyOutlined } from "@mui/icons-material";
import { ModalStudentHealthPlan } from "./ModalStudentHealthPlan";
import AddIcon from '@mui/icons-material/Add';
import { HiOutlineArchiveBoxXMark, HiPencilSquare } from "react-icons/hi2";
import { ModalSelectPlan } from "./ModalSelectPlan";
import SendIcon from '@mui/icons-material/Send';
import { DeleteHealthPlanDialog } from "../../components/dialogs/custom-dialogs";
import { PageLoad } from "../../components/animations/PageLoad";
import { GridColDef } from "@mui/x-data-grid";
import { CustomDataGrid } from "../../components/data-grid/custom";

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
            const response = await getStudentHealthPlan(id);
            const onlyPlans = response.map((item: { plan: any; }) => item.plan);
            setHealthPlanStudent(onlyPlans)
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

    const columns: GridColDef[] = [
        {
            field: 'fantasy_name',
            headerName: 'Plano',
            width: 500,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'city',
            headerName: 'Cidade',
            width: 430,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'id',
            headerName: 'Situação',
            width: 180,
            renderCell: (params: any) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton>
                        <HiPencilSquare
                            size={20}
                            color='grey'
                            onClick={() => handlePlanClick(params.row)}
                        />
                    </IconButton>
                    <IconButton>
                        <HiOutlineArchiveBoxXMark
                            size={20}
                            color='grey'
                            onClick={() => handleClickOpen(params.row)}
                        />
                    </IconButton>
                </div>
            ),
            headerClassName: 'header-datagrid-prof',
        },
    ];

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
        !dataLoaded ? (
            <Grid item>
                <PageLoad />
            </Grid>
        ) : (
            <Grid item>
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
                            <Box
                                sx={{
                                    height: 500,
                                    width: '100%',
                                }}
                            >
                                <CustomDataGrid
                                    columns={columns}
                                    rows={healthPlanStudent}
                                />
                            </Box>

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
            </Grid>
        )
    );




}