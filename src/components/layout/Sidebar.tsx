import * as React from "react"
import {
    HiOutlineUserGroup,
    HiOutlineQueueList,
    HiOutlineCalendar,
    HiOutlineAdjustmentsHorizontal,
    HiOutlineCurrencyDollar,
    HiOutlinePaperAirplane,
    HiHome
} from "react-icons/hi2";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Box, Divider, Grid, List, ListItem, ListItemButton, Typography } from "@mui/material";

interface Props {
    handleDrawerClose: () => void;
}

export const Sidebar: React.FC<Props> = ({ handleDrawerClose}) => {
    let navigate: NavigateFunction = useNavigate();

    const goHome = () => {
        handleDrawerClose();
        navigate("/home");
    };

    const goFollowUp = () => {
        handleDrawerClose();
        navigate("/follow-up");
    };

    const goRegisters = () => {
        handleDrawerClose();
        navigate("/registers");
    };

    const goSkills = () => {
        handleDrawerClose();
        navigate("/skills");
    };

    const goScheduler = () => {
        handleDrawerClose();
        navigate("/scheduler");
    };

    const goConfiguration = () => {
        handleDrawerClose();
        navigate("/configurations");
    };

    const goDashboard = () => {
        handleDrawerClose();
        navigate("/dashboard");
    };

    const goFinance = () => {
        handleDrawerClose();
        navigate("/finance");
    };

    const stlyeMenuItem = {
        height: 80,
        justifyContent: 'center',
        backgroudColor: '#747474',
        display: 'flex'

    }

    const styleMenuButton = {
        backgroundColor: "#F2F2F2",
        color: '#818181',
    };

    return (
        <Box>

            <Divider />
            <List>
                <ListItem sx={stlyeMenuItem} className="items-item">
                    <ListItemButton style={styleMenuButton} onClick={goHome} >
                        <Grid container justifyContent="center">
                            <Grid item>
                                <HiHome size={20} />
                            </Grid>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Typography>Home</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={stlyeMenuItem} className="items-item">
                    <ListItemButton style={styleMenuButton} onClick={goFollowUp}>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <HiOutlinePaperAirplane size={20} />
                            </Grid>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Typography>Follow-up</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={stlyeMenuItem} className="items-item">
                    <ListItemButton style={styleMenuButton} onClick={goScheduler}>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <HiOutlineCalendar size={20} />
                            </Grid>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Typography>Agenda</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={stlyeMenuItem} className="items-item">
                    <ListItemButton style={styleMenuButton} onClick={goRegisters}>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <HiOutlineUserGroup size={20} />
                            </Grid>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Typography>Cadastro</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={stlyeMenuItem} className="items-item">
                    <ListItemButton style={styleMenuButton} onClick={goSkills}>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <HiOutlineQueueList size={20} />
                            </Grid>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Typography>Habilidades</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={stlyeMenuItem} className="items-item">
                    <ListItemButton style={styleMenuButton} onClick={goFinance}>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <HiOutlineCurrencyDollar size={20} />
                            </Grid>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Typography>Financeiro</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={stlyeMenuItem} className="items-item">
                    <ListItemButton style={styleMenuButton} onClick={goConfiguration}>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <HiOutlineAdjustmentsHorizontal size={20} />
                            </Grid>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Typography>Configurações</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

}