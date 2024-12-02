import { Box, Grid, IconButton, Typography } from "@mui/material";
import { LuCodesandbox, LuFileSearch, LuPanelTopClose, LuPanelTopOpen } from "react-icons/lu";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const Finances = () => {
    let navigate: NavigateFunction = useNavigate();

    const goPayments = () => {
        navigate('/finance/payments')
    };

    const goBillings = () => {
        navigate('/finance/billings')
    };

    const goSpecialty = () => {
        navigate('/finance/specialties')
    };

    return (
        <Grid container
            justifyContent="space-evenly"
            alignItems="center"
            rowSpacing={5}
        >
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} mr={2}>
                <Box>
                    <IconButton sx={{
                        width: 250,
                        height: 250,
                        color: '#615f63'
                    }}
                        onClick={goPayments}
                    >
                        <Box>
                            <LuPanelTopClose
                                size={90}
                            />
                            <Typography>Pagamentos</Typography>
                        </Box>
                    </IconButton>

                </Box>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} mr={2}>
                <IconButton sx={{
                    width: 250,
                    height: 250,
                    color: '#615f63'
                }}
                    onClick={goBillings}
                >
                    <Box>
                        <LuPanelTopOpen
                            size={90}
                        />
                        <Typography>Recebimentos</Typography>
                    </Box>
                </IconButton>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} mr={2}>
                <IconButton sx={{
                    width: 250,
                    height: 250,
                    color: '#615f63'
                }}
                    onClick={goSpecialty}
                >
                    <Box>
                        <LuCodesandbox
                            size={90}
                        />
                        <Typography>Especialidades</Typography>
                    </Box>
                </IconButton>
            </Grid>
            {/* <Grid item xl={2} lg={2} md={2} sm={2} xs={2} mr={2}>
                <IconButton sx={{
                    width: 250,
                    height: 250,
                    color: '#615f63'
                }}
                    // onClick={goReceivables}
                >
                    <Box>
                        <LuFileSearch
                            size={90}
                        />
                        <Typography>Relatórios</Typography>
                    </Box>
                </IconButton>
            </Grid> */}
        </Grid>
    );

}