import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { HiPencilSquare, HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { specialityList } from '../../services/configuration.service';
import { Alert, Box, Breadcrumbs, Fab, Grid, IconButton, Link, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { ModalSpecialty } from './ModalSpecialty';
import Ispecialty from '../../types/specialty.type';


export const Specialty = () => {

    const [specialities, setSpeciality] = useState<any[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarError, setSnackbarError] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState<Ispecialty | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUserClick = (specialty: Ispecialty) => {
        setSelectedSpecialty(specialty);
        setIsModalOpen(true);
    };

    const handleNewClick = () => {
        setSelectedSpecialty(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        getSpecialty();
      };

    const getSpecialty = async () => {
        const specialty = await specialityList();
        setSpeciality(specialty);
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    useEffect(() => {
        getSpecialty();
    }, []);


    return (
        <Grid container
            justifyContent="space-evenly"
            alignItems="center"
            rowSpacing={5}
            spacing={8}
            columnSpacing={{ xs: 5, sm: 7, md: 9 }}
        >
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Grid container alignItems="left" justifyContent="left">
                    <div role="presentation">
                        <Breadcrumbs aria-label="breadcrumb" separator=">">
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/configurations"
                            >
                                Configurações
                            </Link>
                            <Typography color="text.primary">Especialidades</Typography>
                        </Breadcrumbs>
                    </div>
                </Grid>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Grid container alignItems="right" justifyContent="right">
                    <Fab variant="extended" size="small" color="primary" aria-label="add" onClick={handleNewClick}>
                        <AddIcon sx={{ mr: 1 }} />
                        Novo
                    </Fab>
                </Grid>
            </Grid>
            <Box>
                <Grid item>
                    <ModalSpecialty
                        specialty={selectedSpecialty}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onSnackbarOpen={handleSnackbarOpen}
                    />
                </Grid>
            </Box>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="responsáveis" size='small'>
                        <TableHead
                            sx={{
                                backgroundColor: '#edf5f3',
                            }}>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {specialities.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.specialty}
                                    </TableCell>
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