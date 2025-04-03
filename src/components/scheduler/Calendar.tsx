import * as React from "react"
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react'
import { IEvent } from "../../types/scheduler.type";
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { Paper } from "@mui/material";
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './CalendarStyles.css';
import { NavigateFunction, useNavigate } from 'react-router-dom';


interface SchedulerProps {
    events: IEvent[];
}

export const HomeCalendar: React.FC<SchedulerProps> = ({ events }) => {
    let navigate: NavigateFunction = useNavigate();

    const handleNewEvent = () => {
        navigate("/scheduler/register");
    }

    const handleEventClick = (eventInfo: any) => {
        navigate('/scheduler/' + eventInfo.event.extendedProps.event_id);
    };

    return (
        <Paper>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrap5Plugin]}
                initialView="timeGridDay"
                customButtons={{
                    create: {
                        text: 'criar-square',
                        icon: 'plus',
                        click: function () {
                            handleNewEvent();
                        }
                    }
                }}
                titleFormat={{
                    year: 'numeric', month: 'short', day: 'numeric'
                }}
                buttonIcons={{
                    prev: 'chevron-left',
                    next: 'chevron-right',
                }}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'create timeGridWeek,timeGridDay,listWeek',
                }}
                height={650}
                eventColor="#32A6A6"
                events={events}
                eventClick={handleEventClick}
                slotMinTime="08:00:00"
                slotMaxTime="19:00:00"
                // timeZone="America/Sao_Paulo"
                locale={ptBrLocale}
                themeSystem="bootstrap5"
                allDaySlot={false}
            />
        </Paper>

    );
}
