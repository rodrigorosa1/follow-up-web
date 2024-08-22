import * as React from 'react';
import { Grid, Paper } from "@mui/material";
import { CardSchedule } from "../../components/dashboard/CardSchedule";
import { ListSchedule } from "../../components/dashboard/ListSchedule";
import { ListFollowUp } from "../../components/dashboard/ListFollowUp";
import { getEventToday } from "../../services/event.service";
import { CustomBreadcrumbs } from '../../components/layout/Breadcrumbs';


export const Home = () => {
    const [total, setTotal] = React.useState<any[]>([]);
    const [events, setEvents] = React.useState<any[]>([]);

    const eventsToday = async () => {
        const list = await getEventToday();
        const total = list.length;
        setTotal(total);
        setEvents(list.slice(0, 3));
    }

    React.useEffect(() => {
        eventsToday();
    }, []);

    return (
        <Grid>
            <Grid container spacing={3}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container alignItems="left" justifyContent="left">
                        <CustomBreadcrumbs
                            title1=""
                            href1=""
                            title2=""
                            href2=""
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 260,
                        }}
                    >
                        <CardSchedule total={total} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 260,
                        }}
                    >
                        <ListSchedule
                            events={events}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <ListFollowUp />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );

}