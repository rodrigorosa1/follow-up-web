import * as React from "react"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useParams } from "react-router-dom";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";
import { Box, Card, Grid } from "@mui/material";
import { ScheduleBasic } from "./ScheduleBasic";
import { ScheduleProcedures } from "./ScheduleProcedures";

export const ScheduleDetails = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const { id } = useParams();

    return (
        <Grid
            container
            alignItems="center"
            rowSpacing={5}>

            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Grid container alignItems="left" justifyContent="left">
                    <CustomBreadcrumbs
                        title1="agenda"
                        href1="/scheduler"
                        title2="detalhes"
                        href2=""
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
                                    <Tab label="Dados da Agenda" value="1" wrapped />
                                    {id ? (
                                        <Tab label="Objetivos" value="2" />
                                    ) : (
                                        <Tab label="Objetivos" value="2" disabled />
                                    )}
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <ScheduleBasic />
                            </TabPanel>
                            <TabPanel value="2">
                                <ScheduleProcedures />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}