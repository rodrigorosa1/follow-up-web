import * as Yup from "yup";
import { useFormik } from "formik";
import { updatePassword } from "../../services/profile.service";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    height: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ModalPasswordProps {
    isOpen: boolean;
    fetchUser: () => void;
    onClose: () => void;
    onSnackbarMessage: (message: any) => void;
    onSnackbarOpen: () => void;
}


export const ModalPassword: React.FC<ModalPasswordProps> = ({ isOpen, fetchUser, onClose, onSnackbarOpen, onSnackbarMessage }) => {
    const formatPayload = (data: any) => {
        return {
            password: data.password,
        }
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string().required("Digite sua senha"),
        confirm_password: Yup.string().required("Digite sua confirmação de senha").oneOf([Yup.ref('password')], 'As senhas devem coincidir'),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: { password: string; confirm_password: string }) => {
            const payload = formatPayload(values);
            updatePassword(payload);
            onSnackbarMessage('Senha atualizada com sucesso.');
            onSnackbarOpen();
            fetchUser();
            onClose();
        },
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography variant="body1" color="text.secondary" align="center">
                        Digite sua nova senha de acesso para plataforma
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Senha"
                            type="password"
                            name="password"
                            autoComplete="password"
                            autoFocus
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirm_password"
                            label="Confirma"
                            type="password"
                            id="confirm_password"
                            autoComplete="current-password"
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                            error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                            helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >

                            Atualizar
                        </Button>
                    </Box>
                </Box>
            </form>
        </Modal>

    );



}