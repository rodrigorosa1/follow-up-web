import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { HiPencilSquare } from "react-icons/hi2";
import { getUser, getUserAvatarId } from '../../services/user.service';
import { Alert, Avatar, Box, Fab, Grid, IconButton, Snackbar, Switch, } from '@mui/material';
import IUser from '../../types/user.type';
import { ModalUser } from './ModalUser';
import { GridColDef } from '@mui/x-data-grid';
import { CustomDataGrid } from '../../components/data-grid/custom';
import { CustomBreadcrumbs } from '../../components/layout/Breadcrumbs';

export const User = () => {
    const [users, setUser] = useState<any[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarError, setSnackbarError] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUserClick = (user: IUser) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleNewUserClick = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const getUsers = async () => {
        const users = await getUser();
        setUser(users);
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const loadAvatar = (id: string) => {
        return getUserAvatarId(id);
    }

    useEffect(() => {
        getUsers();
    }, []);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: '',
            width: 90,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        alt={params.row.fullnamename}
                        src={loadAvatar(params.row.id)}
                    />
                </div>
            ),
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'fullname',
            headerName: 'Nome',
            width: 400,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'position',
            headerName: 'Setor',
            width: 180,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'status',
            headerName: 'Situação',
            width: 180,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton>
                        <HiPencilSquare
                            size={20}
                            color='grey'
                            onClick={() => handleUserClick(params.row)}
                        />
                    </IconButton>

                    <Switch
                        defaultChecked
                        disabled
                        color="primary"
                        size="small"
                    />
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
                        title1="configurações"
                        href1="/configurations"
                        title2="usuarios"
                        href2="/configurations/users"
                    />
                </Grid>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Grid container alignItems="right" justifyContent="right">
                    <Fab variant="extended" size="small" color="primary" aria-label="add" onClick={handleNewUserClick}>
                        <AddIcon sx={{ mr: 1 }} />
                        Novo
                    </Fab>
                </Grid>
            </Grid>
            <Box>
                <Grid item>
                    <ModalUser
                        user={selectedUser}
                        isOpen={isModalOpen}
                        getUsers={getUsers}
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
                        rows={users}
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