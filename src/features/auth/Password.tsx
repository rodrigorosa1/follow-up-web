import * as React from "react";
import * as Yup from "yup";
import { Alert, Button, CssBaseline, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import follow_up_logo_green from "../../assets/img/follow_up.png";
import { Copyright } from "../../components/layout/Copyright";
import { refreshPassword } from "../../services/profile.service";
import { Header } from "../../components/layout/header/Header";

export const Password = () => {
    const { token } = useParams();
    let navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarError, setSnackbarError] = React.useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const formatPayload = (data: any, token: string) => {
        return {
            password: data.password,
            token: token,
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
            if (token) {
                const payload = formatPayload(values, token);
                setLoading(true);
                refreshPassword(payload).then(
                    (r) => {
                        if (r.id) {
                            setSnackbarError(false);
                            setSnackbarMessage('Senha atualizada com sucesso!');
                            setSnackbarOpen(true);
                            setLoading(false);
                            navigate("/success-password/" + token);
                        } else {
                            setSnackbarError(true);
                            setSnackbarMessage(r.response.data.detail);
                            setSnackbarOpen(true);
                            setLoading(false);
                        }
                    }).catch((e) => {
                        console.error(e);
                    });
            }
        },
    });

    return (
        <Grid container
            justifyContent="space-evenly"
            component="main"
            sx={{ height: '50em' }}
        >
            <Header />

            <CssBaseline />

            <Grid item xs={10} sm={10} md={10} component={Paper} elevation={6} square
                sx={{
                    marginTop: 5,
                }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyItems: 'center',
                        justifyContent: 'center'

                    }}
                >
                    <Box>
                        <img
                            src={follow_up_logo_green}
                            srcSet=''
                            alt=''
                            height={'50px'}
                        />
                    </Box>
                    <Box
                        sx={{
                            marginTop: 5,
                        }}
                    >
                        <Typography variant="body1" color="text.secondary" align="center">
                            Cadastre sua senha de acesso para plataforma
                        </Typography>
                    </Box>

                    <form onSubmit={formik.handleSubmit}>
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
                                disabled={loading}
                            >
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                Cadastrar
                            </Button>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </form>
                </Box>

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