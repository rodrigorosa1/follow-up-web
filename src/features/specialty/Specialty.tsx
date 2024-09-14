import * as React from "react";
import ISpecialty from "../../types/specialty.type";
import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, Fab, Grid, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { HiPencilSquare } from "react-icons/hi2";
import { getSpecialties } from "../../services/specialty.service";
import { ModalSpecialty } from "./ModalSpecialty";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";
import { formatCurrency } from "../../helpers/currency";



export const Specialty = () => {
    const [specialties, setSpecialties] = React.useState<ISpecialty[]>([]);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage] = React.useState('');
    const [snackbarError] = React.useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = React.useState<ISpecialty | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const listSpecialties = async () => {
        const specialty = await getSpecialties();

        setSpecialties(specialty);
    }

    const handleClick = (specialty: ISpecialty) => {
        setSelectedSpecialty(specialty);
        setIsModalOpen(true);
    };

    const handleNewClick = () => {
        setSelectedSpecialty(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        listSpecialties();
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    React.useEffect(() => {
        listSpecialties();
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
                    <CustomBreadcrumbs
                        title1="financeiro"
                        href1="#"
                        title2="especialidades"
                        href2="/specialty"
                    />
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
                        listSpecialties={listSpecialties}
                    />
                </Grid>
            </Box>
            <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="responsáveis" size='small'>
                        <TableHead
                            sx={{
                                backgroundColor: '#edf5f3',
                            }}>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell style={{ width: 160 }}>Valor Hora</TableCell>
                                <TableCell style={{ width: 100 }} align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {specialties.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {formatCurrency(row.value_hour)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton>
                                            <HiPencilSquare
                                                size={18}
                                                color='grey'
                                                onClick={() => handleClick(row)}
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