import { Grid, Fab, Box, Switch, IconButton, } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { GridColDef } from '@mui/x-data-grid';
import { HiPencilSquare } from "react-icons/hi2";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getSkills } from "../../services/skill.service";
import { CustomDataGrid } from "../../components/data-grid/custom";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";

export const Skills = () => {
    let navigate: NavigateFunction = useNavigate();
    const [skills, setSkills] = useState<any[]>([]);

    const goRegister = () => {
        navigate("/skills/register");
    };

    const goDetails = (id: string) => {
        navigate('/skills/' + id);
    };

    const activeUpdate = (id: string) => {
        navigate('/skills/' + id);
    }

    const listSkills = async () => {
        const skills = await getSkills();
        setSkills(skills);
    }

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Habilidade',
            width: 500,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'specialty_name',
            headerName: 'Especialidade',
            width: 500,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'status',
            headerName: 'Situação',
            width: 150,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton>
                        <HiPencilSquare
                            size={20}
                            color='grey'
                            onClick={() => goDetails(params.row.id)}
                        />
                    </IconButton>

                    <Switch
                        defaultChecked
                        disabled
                        color="primary"
                        size="small"
                    />
                    {/* {params.value} */}
                </div>
            ),
            headerClassName: 'header-datagrid-prof',
        },
    ];


    useEffect(() => {
        listSkills();
    }, []);

    return (
        <Grid container
            justifyContent="space-evenly"
            alignItems="center"
            rowSpacing={3}
            spacing={5}
            columnSpacing={{ xs: 5, sm: 7, md: 9 }}
        >
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Grid container alignItems="left" justifyContent="left">
                    <CustomBreadcrumbs
                        title1="cadastro"
                        href1="#"
                        title2="habilidades"
                        href2="/skills"
                    />
                </Grid>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Grid container alignItems="right" justifyContent="right">
                    <Fab variant="extended" size="small" color="primary" aria-label="add" onClick={goRegister}>
                        <AddIcon sx={{ mr: 1 }} />
                        Novo
                    </Fab>
                </Grid>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box
                    sx={{
                        height: 700,
                        width: '100%',
                    }}
                >
                    <CustomDataGrid
                        columns={columns}
                        rows={skills}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}