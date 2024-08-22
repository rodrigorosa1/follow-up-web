import { Alert, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Snackbar, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as React from "react";
import * as AuthService from "../../services/auth.service";
import IUser from "../../types/user.type"; import { ReplyOutlined, Save, Lock, } from "@mui/icons-material";
import { getUserAvatarId, updateUser, uploadAvatarUser } from "../../services/user.service";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Avatar } from "@files-ui/react";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";
import { ModalPassword } from "../../components/auth/ModalPassword";

export const Profile = () => {
    const [currentUser, setCurrentUser] = React.useState<IUser>();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarError, setSnackbarError] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const initial = {
        fullname: currentUser?.fullname,
        email: currentUser?.email,
        document: currentUser?.document,
        image_path: currentUser?.image_path,
        position: currentUser?.position,
    };

    let navigate: NavigateFunction = useNavigate();

    const fetchUser = async () => {
        const user = await AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    };

    const historyBack = () => {
        navigate("/home");
    }

    const handleMessage = (message: string) => {
        setSnackbarMessage(message);
    };

    const handleImageChange = (img: any) => {
        if (currentUser?.id) {
            const payload = {
                file: img
            }
            uploadAvatarUser(currentUser.id, payload).then((r) => {
                if (r.id) {
                    setSnackbarError(false)
                    setSnackbarMessage('Imagem atualizada com sucesso!');
                    setSnackbarOpen(true);
                    window.location.reload();
                } else {
                    setSnackbarError(true)
                    setSnackbarMessage(r.response.data.detail);
                    setSnackbarOpen(true);
                }
            }).catch((e) => {
                console.error(e);
            });
        }
    }

    const loadAvatar = (id: any) => {
        return getUserAvatarId(id);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initial,
        onSubmit: (values) => {
            if (currentUser) {
                updateUser(currentUser.id, values).then((r) => {
                    if (r.id) {
                        setSnackbarError(false)
                        setSnackbarMessage('Dados atualizado com sucesso!');
                        setSnackbarOpen(true);
                        window.location.reload();
                    } else {
                        setSnackbarError(true)
                        setSnackbarMessage(r.response.data.detail);
                        setSnackbarOpen(true);
                    }
                }).catch((e) => {
                    console.error(e);
                });
            }
        }
    });

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    React.useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Grid
            container
            justifyContent="space-evenly"
            alignItems="center"
            rowSpacing={5}>
            <Grid item>
                <ModalPassword
                    isOpen={isModalOpen}
                    fetchUser={fetchUser}
                    onClose={handleCloseModal}
                    onSnackbarOpen={handleSnackbarOpen}
                    onSnackbarMessage={handleMessage}
                />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Grid container alignItems="left" justifyContent="left">
                    <CustomBreadcrumbs
                        title1="configurações"
                        href1="#"
                        title2="perfil"
                        href2="/profile"
                    />
                </Grid>
            </Grid>
            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                {currentUser && (
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar
                                    src={loadAvatar(currentUser.id)}
                                    alt="Avatar"
                                    onChange={handleImageChange}
                                    variant="circle"
                                    style={{ width: "150px", height: "150px" }}
                                    changeLabel="Alterar imagem"
                                    emptyLabel={"Escolha uma imagem..."}
                                />
                            }
                            action={
                                <IconButton aria-label="Alterar senha">
                                    <Lock
                                        onClick={() => handleModal()}
                                    />
                                </IconButton>
                            }
                            title={currentUser.fullname}
                            subheader={currentUser.email}
                        />
                        <form onSubmit={formik.handleSubmit}>
                            <CardContent>
                                <Grid container rowSpacing={2} alignItems="center" justifyContent="center">
                                    <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                                        <TextField
                                            id="fullname"
                                            name="fullname"
                                            label="Nome"
                                            size="small"
                                            value={formik.values.fullname}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email"
                                            size="small"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                                        <TextField
                                            id="document"
                                            name="document"
                                            label="Documento"
                                            size="small"
                                            value={formik.values.document}
                                            onChange={formik.handleChange}
                                            disabled
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                                        <TextField
                                            id="position"
                                            name="position"
                                            label="Setor"
                                            size="small"
                                            value={formik.values.position}
                                            onChange={formik.handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Grid container rowSpacing={2} alignItems="right" justifyContent="right">
                                    <Grid item alignContent="center" xl={1} lg={1} md={1} sm={1} xs={1} sx={{ mr: 2, mt: 2 }}>
                                        <IconButton
                                            title="Voltar"
                                            onClick={historyBack}
                                        >
                                            <ReplyOutlined />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xl={1} lg={1} md={1} sm={1} xs={1} mr={2} sx={{ mr: 2, mt: 2 }}>
                                        <IconButton
                                            type="submit"
                                            title="Savar"
                                        >
                                            <Save />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </form>
                    </Card>
                )}
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

    );

}