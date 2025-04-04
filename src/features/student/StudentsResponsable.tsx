import * as React from "react"
import { useEffect, useState } from "react";
import { Alert, IconButton, Grid, Fab, Snackbar, Box } from '@mui/material';
import { HiOutlineArchiveBoxXMark, HiPencilSquare } from 'react-icons/hi2';
import AddIcon from '@mui/icons-material/Add';
import { ReplyOutlined } from '@mui/icons-material';
import { ModalResponsable } from './ModalResponsable';
import { getStudentsResponsible } from '../../services/student.service';
import { useParams } from 'react-router-dom';
import { IResponsable } from "../../types/student.type";
import { DeleteResponsableDialog } from "../../components/dialogs/custom-dialogs";
import { PageLoad } from "../../components/animations/PageLoad";
import { GridColDef } from "@mui/x-data-grid";
import { CustomDataGrid } from "../../components/data-grid/custom";


export default function StudentResponsable() {
    const { id } = useParams();
    const [responsibles, setResponsibles] = useState<any[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarError, setSnackbarError] = useState(false);
    const [selectedResponsable, setSelectedResponsable] = useState<IResponsable | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [dataLoaded, setDataLoaded] = React.useState(false);

    const handleUserClick = (responsable: IResponsable) => {
        setSelectedResponsable(responsable);
        setIsModalOpen(true);
    };

    const handleNewUserClick = () => {
        setSelectedResponsable(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        getResponsables();
    };

    const handleClickOpen = (responsable: IResponsable) => {
        setSelectedResponsable(responsable);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        getResponsables();
    };

    const getResponsables = async () => {
        setDataLoaded(false);
        const resps = await getStudentsResponsible(id);
        setResponsibles(resps);
        setDataLoaded(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const columns: GridColDef[] = [
        {
            field: 'fullname',
            headerName: 'Nome',
            width: 500,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'bond',
            headerName: 'Vínculo',
            width: 500,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'status',
            headerName: 'Situação',
            width: 150,
            renderCell: (params: any) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton>
                        <HiPencilSquare
                            size={20}
                            color='grey'
                            onClick={() => handleUserClick(params)}
                        />
                    </IconButton>
                    <IconButton>
                        <HiOutlineArchiveBoxXMark
                            size={20}
                            color='grey'
                            onClick={() => handleClickOpen(params)}
                        />
                    </IconButton>
                </div>
            ),
            headerClassName: 'header-datagrid-prof',
        },
    ];

    useEffect(() => {
        getResponsables();
    }, []);

    return (
        <Grid container>
            {!dataLoaded ? (
                <Grid item>
                    <PageLoad />
                </Grid>
            ) : (
                <Grid item>
                    <Grid container>
                        <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                            <Grid container alignItems="right" justifyContent="right">
                                <Fab variant="extended" size="small" color="primary" aria-label="add"
                                    onClick={handleNewUserClick}
                                >
                                    <AddIcon sx={{ mr: 1 }} />
                                </Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <ModalResponsable
                            responsable={selectedResponsable}
                            isOpen={isModalOpen}
                            id={id}
                            getResponsables={getResponsables}
                            onClose={handleCloseModal}
                            onSnackbarOpen={handleSnackbarOpen}
                        />
                    </Grid>
                    <Grid item>
                        <DeleteResponsableDialog
                            responsable={selectedResponsable}
                            isOpen={open}
                            getResponsables={getResponsables}
                            onClose={handleClose}
                            onSnackbarOpen={handleSnackbarOpen}
                        />
                    </Grid>


                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Box
                                sx={{
                                    height: 500,
                                    width: '100%',
                                }}
                            >
                                <CustomDataGrid
                                    columns={columns}
                                    rows={responsibles}
                                />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{
                                width: 15,
                                height: 15,

                            }}
                            />
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
                                            Erro
                                        </Alert>

                                    ) : (
                                        <Alert severity="success" sx={{ width: '100%' }}>
                                            Sucesso
                                        </Alert>
                                    )}
                                </Snackbar>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Grid container alignItems="right" justifyContent="right">

                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2} mr={2}>
                                    <IconButton
                                        title="Voltar"
                                    // onClick={historyBack}
                                    >
                                        <ReplyOutlined />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


            )}

        </Grid>






    );
}