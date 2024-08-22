import * as React from 'react';
import { IconButton, Badge, Popover, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getNotifications } from '../../services/notification.service';
import EventIcon from '@mui/icons-material/Event';

export const Notifications = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [notifications, setNotifications] = React.useState<any[]>([]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const getNotif = async () => {
        const list = await getNotifications();
        setNotifications(list.slice(0, 10));
    }

    React.useEffect(() => {
        // getNotif();
        const interval = setInterval(() => {
            // getNotif();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="notification-container">
            <IconButton aria-label="notifications" onClick={handleClick} disabled>
                <Badge badgeContent={notifications.filter(notification => !notification.read).length} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <List>
                    {notifications.map((item: any) => (
                        <ListItem
                            className={`notification-item ${!item.read ? 'unread' : ''}`}
                        >
                            <ListItemIcon>
                                <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary={item.message} />
                            {!item.read && <div className="unread-indicator"></div>}
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </div>
    );

}