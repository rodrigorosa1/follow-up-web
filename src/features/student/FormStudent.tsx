import { Box, Card, Grid } from "@mui/material";
import React from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useParams } from "react-router-dom";
import { StudentBasic } from "./StudentBasic";
import StudentResponsable from "./StudentsResponsable";
import { StudentAddress } from "./StudentAddress";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";

export const FormStudent = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const { id } = useParams();

    return (
        <Grid
            container
            // justifyContent="space-evenly"
            alignItems="center"
            rowSpacing={5}>

            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Grid container alignItems="left" justifyContent="left">
                    <CustomBreadcrumbs
                        title1="cadastro"
                        href1="/registers"
                        title2="cliente"
                        href2="/students"
                    />
                </Grid>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Card
                    sx={{
                        display: 'flex',
                        maxWidth: 2500,
                    }}
                >
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange}>
                                    <Tab label="Dados Básicos" value="1" wrapped />
                                    {id ? (
                                        <Tab label="Responsaveis" value="2" />
                                    ) : (
                                        <Tab label="Responsaveis" value="2" disabled />
                                    )}
                                    {id ? (
                                        <Tab label="Endereço" value="3" wrapped />
                                    ) : (
                                        <Tab label="Endereço" value="2" wrapped disabled />
                                    )}

                                    <Tab label="Médico(a)" value="4" disabled wrapped />
                                    <Tab label="Outras Terapias)" value="5" disabled wrapped />
                                    <Tab label="Dados Escolares" value="6" disabled wrapped />
                                    <Tab label="Medicamentos" value="7" disabled wrapped />
                                    <Tab label="Convênios" value="8" disabled wrapped />
                                    <Tab label="Arquivos" value="9" disabled wrapped />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <StudentBasic />
                            </TabPanel>
                            <TabPanel value="2">
                                <StudentResponsable />
                            </TabPanel>
                            <TabPanel value="3">
                                <StudentAddress />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Card>
            </Grid>
        </Grid>




    );

}