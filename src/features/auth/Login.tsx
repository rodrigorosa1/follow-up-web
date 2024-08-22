import { AppBar, Button, CssBaseline, Grid, Link, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import follow_up_img from "../../assets/img/hands-child.jpg";
import follow_up_logo_green from "../../assets/img/follow_up.png";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../services/auth.service";
import { Copyright } from "../../components/layout/Copyright";

type Props = {}

const Login: React.FC<Props> = () => {
    let navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Digite seu e-mail"),
        password: Yup.string().required("Digite sua senha"),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (formValue: { username: string; password: string }) => {
            const { username, password } = formValue;
            setMessage("");
            setLoading(true);
            login(username, password).then(
                () => {
                    navigate("/home");
                },
                (error) => {
                    const resMessage = 'Dados inválidaos'
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        },
    });

    return (
        <Grid container component="main" sx={{ height: '50em' }}>
            <AppBar>
                <Toolbar />
            </AppBar>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${follow_up_img})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginTop: 5
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{
                marginTop: 5
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

                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="E-mail"
                                name="username"
                                autoComplete="email"
                                autoFocus
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
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
                                Entrar
                            </Button>
                            {message && (
                                <Typography
                                    variant="subtitle1"
                                    className="text-danger pad-10 text-center"
                                >
                                    {message}
                                </Typography>
                            )}

                            <Grid container>
                                <Grid item xs>
                                    <Link href="/recovery-password" variant="body2">
                                        Esqueceu a senha?
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;