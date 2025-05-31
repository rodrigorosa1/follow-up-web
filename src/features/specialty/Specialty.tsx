import * as React from "react";
import ISpecialty from "../../types/specialty.type";
import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, Fab, Grid, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { HiPencilSquare } from "react-icons/hi2";
import { getSpecialties } from "../../services/specialty.service";
import { ModalSpecialty } from "./ModalSpecialty";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";
import { formatCurrency } from "../../helpers/currency";
import { GridColDef } from "@mui/x-data-grid";
import { CustomDataGrid } from "../../components/data-grid/custom";



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

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Especialidade',
            width: 500,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'value_hour',
            headerName: 'Valor Hora',
            width: 500,
            headerClassName: 'header-datagrid-prof',
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'right' }}>
                    {formatCurrency(params.row.value_hour)}
                </div>
            ),
        },
        {
            field: 'status',
            headerName: 'Situação',
            width: 150,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton>
                        <HiPencilSquare
                            size={20}
                            color='grey'
                            onClick={() => handleClick(params.row)}
                        />
                    </IconButton>
                </div>
            ),
            headerClassName: 'header-datagrid-prof',
        },
    ];


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
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box
                    sx={{
                        height: 500,
                        width: '100%',
                    }}
                >
                    <CustomDataGrid
                        columns={columns}
                        rows={specialties}
                    />
                </Box>

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