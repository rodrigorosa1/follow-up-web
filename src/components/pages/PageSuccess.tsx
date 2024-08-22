import { Button, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import follow_up_logo_green from "../../assets/img/follow_up.png";
import { Header } from "../layout/header/Header";
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const PageSuccess = () => {
    let navigate: NavigateFunction = useNavigate();
    const goLogin = () => {
        navigate("/login");
    }

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
                            Senha cadastada com sucesso! Para continuar faça login na plataforma!
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            onClick={goLogin}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Entrar
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}