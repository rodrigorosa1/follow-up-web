import { createTheme } from "@mui/material";
import { ptBR } from '@mui/material/locale';
//import React from "react";


export const appTheme =  createTheme({
    palette: {
        mode: 'light',
        primary: { main: "#068798"},
        secondary : { main: "#ffff"},
        info: {main: "#5c5c5c"},
        text: { primary: "#fffff", secondary: "#5c5c5c"}
    },
}, ptBR);