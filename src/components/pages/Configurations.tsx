import { Box, Grid, IconButton, Typography } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LuUsers, LuBuilding } from "react-icons/lu";


export const Configurations = () => {
    let navigate: NavigateFunction = useNavigate();

    const goUser = () => {
        navigate('/configurations/users')
    };

    const goCompany = () => {
        navigate('/configurations/company')
    }

    return (
        <Grid container
            justifyContent="space-evenly"
            alignItems="center"
            rowSpacing={5}
        >
            <Grid item xl={3} lg={3} md={3} sm={3} xs={3} mr={3}>
                <IconButton sx={{
                    width: 250,
                    height: 250,
                    color: '#615f63'
                }}
                // onClick={goCompany}
                >
                    <Box>
                        <LuBuilding
                            size={90}
                        />
                        <Typography>Dados Empresa</Typography>
                    </Box>
                </IconButton>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={3} mr={3}>
                <IconButton sx={{
                    width: 250,
                    height: 250,
                    color: '#615f63'
                }}
                    onClick={goUser}
                >
                    <Box>
                        <LuUsers
                            size={90}
                        />
                        <Typography>Usuários</Typography>
                    </Box>
                </IconButton>
            </Grid>
        </Grid>

    );
}