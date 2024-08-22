import { Grid, Fab, Box, Switch, Link, Typography, IconButton, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColDef, GridRowSpacingParams, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { grey } from "@mui/material/colors";
import { HiPencilSquare, HiUserCircle } from "react-icons/hi2";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getProfessionals } from "../../services/professional.service";
import Breadcrumbs from '@mui/material/Breadcrumbs';

export const Procedures = () => {
    let navigate: NavigateFunction = useNavigate();
    const [procedures, setProcedures] = useState<any[]>([]);

    const goRegister = () => {
        navigate("/procedures/register");
    };

    const goDetails = (id: string) => {
        navigate('/procedures/' + id);
    };

    

}