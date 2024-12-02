import { Box, Grid, IconButton, Typography } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LuUserCheck, LuUserPlus } from "react-icons/lu";

export const Registers = () => {
    let navigate: NavigateFunction = useNavigate();

    const goStudents = () => {
        navigate('/students')
    };

    const goProfessional = () => {
        navigate('/professionals')
    };

    return (
        <Grid container
            justifyContent="space-evenly"
            alignItems="center"
            rowSpacing={5}
        >
            <Grid item xl={3} lg={3} md={3} sm={3} xs={3} mr={3}>
                <Box>
                    <IconButton sx={{
                        width: 250,
                        height: 250,
                        color: '#615f63'
                    }}
                    onClick={goStudents}
                    >
                        <Box>
                            <LuUserPlus
                                size={90}
                            />
                            <Typography>Clientes</Typography>
                        </Box>
                    </IconButton>
                </Box>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={3} mr={3}>
                <IconButton sx={{
                    width: 250,
                    height: 250,
                    color: '#615f63'
                }}
                onClick={goProfessional}
                >
                    <Box>
                        <LuUserCheck
                            size={90}
                        />
                        <Typography>Profissionais</Typography>
                    </Box>
                </IconButton>
            </Grid>
       </Grid>

    );
}