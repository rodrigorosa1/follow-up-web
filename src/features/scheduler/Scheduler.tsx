import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { getEvents } from "../../services/event.service";
import { IEvent, Iselection } from "../../types/scheduler.type";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";
import { HomeCalendar } from "../../components/scheduler/Calendar";
import { PageLoad } from "../../components/animations/PageLoad";

export const ComponetScheduler = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const fetchData = async () => {
        const listEvents = await getEvents();
        const events: IEvent[] = listEvents.map((evt: {
            id: string;
            event_id: string;
            title: string;
            student_id: string;
            instructor_id: string;
            details: string;
            start: Date;
            end: Date;
            start_hour: string;
            end_hour: string;
            period: string;
            repeat: string;
            status: string;
            skills: Iselection[];
        }) => ({
            _id: evt.id,
            event_id: evt.event_id,
            title: evt.title,
            student_id: evt.student_id,
            instructor_id: evt.instructor_id,
            details: evt.details,
            start: new Date(evt.start),
            end: new Date(evt.end),
            start_hour: evt.start_hour,
            end_hour: evt.end_hour,
            repeat: evt.repeat,
            period: evt.period,
            status: evt.status,
        }))
        setEvents(events);
        setDataLoaded(true);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Grid container
            justifyContent="space-evenly"
            alignItems="center"
            rowSpacing={3}
            spacing={5}
            columnSpacing={{ xs: 5, sm: 7, md: 9 }}
        >
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid container alignItems="left" justifyContent="left">
                    <CustomBreadcrumbs
                        title1="agenda"
                        href1="/scheduler"
                        title2=""
                        href2=""
                    />
                </Grid>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                {
                    dataLoaded === false ? (
                       <PageLoad />
                    ) : (
                        <HomeCalendar
                            events={events}
                        />
                    )
                }
            </Grid>
        </Grid>
    );
}