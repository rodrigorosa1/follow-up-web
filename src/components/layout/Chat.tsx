import React, { useState, MouseEvent } from 'react';
import { IconButton, Popover, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

interface ChatComponentProps {
    // Adicione quaisquer props que deseje passar para o componente de Chat
}


export const ChatComponent: React.FC<ChatComponentProps> = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="chat-container">
            <IconButton aria-label="chat" onClick={handleClick} disabled>
                <ChatIcon />
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
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Nome do Amigo 1"
                            secondary="Última mensagem enviada."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Nome do Amigo 2"
                            secondary="Última mensagem enviada."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Nome do Amigo 3"
                            secondary="Última mensagem enviada."
                        />
                    </ListItem>
                </List>
            </Popover>
        </div>
    );

}