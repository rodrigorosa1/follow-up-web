import { Box, Typography, Grid, IconButton, TextField, Modal, Card, CardHeader, CardContent, CardActions } from "@mui/material";
import { useFormik } from "formik";
import { ReplyOutlined, Save } from "@mui/icons-material";
import { getUserAvatarId, postUser, updateUser, uploadAvatarUser } from "../../services/user.service";
import IUser from "../../types/user.type";
import { DocumentMask } from "../../components/masks/InputMask";
import { Avatar } from "@files-ui/react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ModalUserProps {
    user: IUser | null;
    isOpen: boolean;
    getUsers: () => void;
    onClose: () => void;
    onSnackbarOpen: () => void;
}

export const ModalUser: React.FC<ModalUserProps> = ({ user, isOpen, getUsers, onClose, onSnackbarOpen }) => {
    const initial: IUser = user || {
        fullname: '',
        email: '',
        permission: '',
        document: '',
        image_path: '',
        position: '',
        status: '',
    };

    const handleImageChange = (img: any) => {
        if (user?.id) {
            const payload = {
                file: img
            }
            uploadAvatarUser(user.id, payload);
            getUsers();
            onSnackbarOpen();
            onClose();
        }
    }

    const loadAvatar = (id: string) => {
        if (user?.id) {
            return getUserAvatarId(id);
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initial,
        onSubmit: (values) => {
            if (user?.id) {
                updateUser(user.id, values);
            } else {
                postUser(values);
                getUsers();
            }
            onSnackbarOpen();
            getUsers();
            onClose();
        }
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography variant="body1" color="text.secondary" align="center">
                        {user ? 'Informações do Usuário' : 'Novo usuário'}
                    </Typography>
                    <Card>
                        {user?.id && (
                            <CardHeader
                                avatar={
                                    <Avatar
                                        src={loadAvatar(user.id)}
                                        alt="Avatar"
                                        onChange={handleImageChange}
                                        variant="circle"
                                        style={{ width: "150px", height: "150px" }}
                                        emptyLabel={"Escolha uma imagem..."}
                                        changeLabel="Alterar imagem"
                                    />
                                }
                                title={user.fullname}
                                subheader={user.email}
                            />
                        )}
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
                                    {user?.id ? (
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email"
                                            size="small"
                                            type="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            disabled
                                        />
                                    ) : (
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email"
                                            size="small"
                                            type="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            fullWidth
                                        />
                                    )}
                                </Grid>
                                <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                                    {user?.id ? (
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
                                    ) : (
                                        <TextField
                                            id="document"
                                            name="document"
                                            label="Documento"
                                            size="small"
                                            value={formik.values.document}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            InputProps={{ inputComponent: DocumentMask }}
                                        />
                                    )}
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
                                        onClick={onClose}
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
                    </Card>
                </Box>
            </form>
        </Modal>

    );
}