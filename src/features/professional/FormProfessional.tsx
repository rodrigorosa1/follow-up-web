import { Box, Breadcrumbs, Card, Grid, Link } from "@mui/material";
import React from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ProfessionalBasic } from "./ProfessionalBasic";
import { ProfessionalAddress } from "./ProfessionalAddress";
import { useParams } from "react-router-dom";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";


export const FormProfessional = () => {
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
                        title2="profissional"
                        href2="/professionals"
                    />
                </Grid>
            </Grid>



            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Card
                    sx={{
                        display: 'flex',
                        maxWidth: 1820,
                    }}
                >
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange}>
                                    <Tab label="Dados Básicos" value="1" />

                                    {id ? (
                                        <Tab label="Endereço" value="2" />
                                    ) : (
                                        <Tab label="Endereço" value="2" disabled />
                                    )}

                                    {id ? (
                                        <Tab label="Dados de pagamento" value="3" disabled />
                                    ) : (
                                        <Tab label="Dados de pagamento" value="3" disabled />
                                    )}


                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <ProfessionalBasic />
                            </TabPanel>
                            <TabPanel value="2">
                                <ProfessionalAddress />
                            </TabPanel>
                            <TabPanel value="3">
                                Em desenvolvimento
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Card>
            </Grid>
        </Grid>




    );

}