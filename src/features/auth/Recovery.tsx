import * as React from "react";
import { Alert, Button, CssBaseline, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import follow_up_logo_green from "../../assets/img/follow_up.png";
import { Copyright } from "../../components/layout/Copyright";
import { recoveryPassword } from "../../services/profile.service";
import { Header } from "../../components/layout/header/Header";

export const Recovery = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarError, setSnackbarError] = React.useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const formatPayload = (data: any) => {
        return {
            email: data.email
        }
    }

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: (values: { email: string; }) => {
            const payload = formatPayload(values)
            setMessage("");
            setLoading(true);
            recoveryPassword(payload).then(
                (r) => {
                    if (r.id) {
                        setSnackbarError(false);
                        setSnackbarMessage('E-mail enviado com sucesso!');
                        setSnackbarOpen(true);
                        setLoading(false);
                    } else {
                        setSnackbarError(true);
                        setSnackbarMessage('E-mail não localizado na base de dados');
                        setSnackbarOpen(true);
                        setLoading(false);
                    }
                }).catch((e) => {
                    console.error(e);
                });
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
                        justifyContent: 'center',
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
                            Será enviando um e-mail com os passos para a recuperação de sua senha
                        </Typography>
                    </Box>

                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                type="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
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
                                Enviar
                            </Button>
                            {message && (
                                <Typography
                                    variant="subtitle1"
                                    className="text-danger pad-10 text-center"
                                >
                                    {message}
                                </Typography>
                            )}
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