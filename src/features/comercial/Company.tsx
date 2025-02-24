import * as React from "react"
import AddIcon from '@mui/icons-material/Add';
import { HiPencilSquare } from "react-icons/hi2";
import { GridColDef } from "@mui/x-data-grid";
import { Alert, Box, Chip, Fab, Grid, IconButton, Snackbar } from "@mui/material";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";
import { CustomDataGrid } from "../../components/data-grid/custom";
import { ModalCompany } from "./ModalCompany";
import ICompany from "../../types/company.type";
import { getCompanies } from "../../services/company.service";


export const Company = () => {
    const [companies, setCompanies] = React.useState<ICompany[]>([]);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [selectedCompany, setSelectedCompany] = React.useState<ICompany | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [snackbarError, setSnackbarError] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const handleCompany = (company: ICompany) => {
        setSelectedCompany(company);
        setIsModalOpen(true);
    };

    const handleNewCompany = () => {
        setSelectedCompany(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const companiesList = async () => {
        const companies = await getCompanies();
        setCompanies(companies);
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    React.useEffect(() => {
        companiesList();
    }, []);

    const columns: GridColDef[] = [
        {
            field: 'social_name',
            headerName: 'Razão Social',
            width: 500,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 240,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'licences_n',
            headerName: 'Licenças',
            width: 180,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'status',
            headerName: 'Situação',
            width: 180,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                        label={params.row.status}
                        size="small"
                        color={
                            params.row.status === 'BLOQUEADA' ? 'error' :
                                params.row.status === 'ATIVA' ? 'success' :
                                    'default'
                        }
                    />
                </div>
            ),
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'id',
            headerName: '',
            width: 50,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton>
                        <HiPencilSquare
                            size={20}
                            color='grey'
                            onClick={() => handleCompany(params.row)}
                        />
                    </IconButton>
                </div>
            ),
            headerClassName: 'header-datagrid-prof',
        },
    ];

    return (
        <Grid container
            justifyContent="space-evenly"
            alignItems="center"
            rowSpacing={3}
            spacing={5}
            columnSpacing={{ xs: 5, sm: 7, md: 9 }}
        >
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Grid container alignItems="left" justifyContent="left">
                    <CustomBreadcrumbs
                        title1="comercial"
                        href1="/comercial/companies"
                        title2="empresas"
                        href2="/comercial/companies"
                    />
                </Grid>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Grid container alignItems="right" justifyContent="right">
                    <Fab variant="extended" size="small" color="primary" aria-label="add" onClick={handleNewCompany}>
                        <AddIcon sx={{ mr: 1 }} />
                        Novo
                    </Fab>
                </Grid>
            </Grid>
            <Box>
                <Grid item>
                    <ModalCompany
                        company={selectedCompany}
                        isOpen={isModalOpen}
                        companiesList={companiesList}
                        onClose={handleCloseModal}
                        onSnackbarOpen={handleSnackbarOpen}
                    />
                </Grid>
            </Box>

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box
                    sx={{
                        height: 700,
                        width: '100%',
                    }}
                >
                    <CustomDataGrid
                        columns={columns}
                        rows={companies}
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