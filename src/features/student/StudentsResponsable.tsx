import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, Alert, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, Fab, Snackbar, Box, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { HiOutlineArchiveBoxXMark, HiPencilSquare } from 'react-icons/hi2';
import AddIcon from '@mui/icons-material/Add';
import { ReplyOutlined } from '@mui/icons-material';
import { ModalResponsable } from './ModalResponsable';
import { getStudentsResponsible } from '../../services/student.service';
import { useParams } from 'react-router-dom';
import { IResponsable } from "../../types/student.type";
import { DeleteResponsableDialog } from "../../components/dialogs/custom-dialogs";


export default function StudentResponsable() {
    const { id } = useParams();
    const [responsibles, setResponsibles] = useState<any[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarError, setSnackbarError] = useState(false);
    const [selectedResponsable, setSelectedResponsable] = useState<IResponsable | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);

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
        const resps = await getStudentsResponsible(id);
        setResponsibles(resps);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    useEffect(() => {
        getResponsables();
    }, []);

    return (
        <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid container alignItems="right" justifyContent="right">
                    <Fab variant="extended" size="small" color="primary" aria-label="add"
                        onClick={handleNewUserClick}
                    >
                        <AddIcon sx={{ mr: 1 }} />
                    </Fab>
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
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="responsáveis" size='small'>
                        <TableHead
                            sx={{
                                backgroundColor: '#edf5f3',
                            }}>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Vínculo</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {responsibles.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.fullname}
                                    </TableCell>
                                    <TableCell >{row.bond}</TableCell>
                                    <TableCell align="center">
                                        <IconButton>
                                            <HiPencilSquare
                                                size={18}
                                                color='grey'
                                                onClick={() => handleUserClick(row)}
                                            />
                                        </IconButton>
                                        <IconButton>
                                            <HiOutlineArchiveBoxXMark
                                                size={18}
                                                color='grey'
                                                onClick={() => handleClickOpen(row)}
                                            />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item>
                <Box sx={{
                    width: 15,
                    height: 15,

                }}
                />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid container alignItems="right" justifyContent="right">

                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2} mr={2}>
                        <IconButton
                            title="Voltar"
                        // onClick={historyBack}

                        >
                            <ReplyOutlined />
                        </IconButton>
                        {/* <IconButton
                            type="submit"
                            title="Savar"
                        >
                            <Save />
                        </IconButton> */}
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

    );
}