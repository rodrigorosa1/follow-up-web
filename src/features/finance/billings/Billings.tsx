import * as React from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IBillingResume } from "../../../types/billing.type";
import { IStudent } from "../../../types/student.type";
import { getStudents } from "../../../services/student.service";
import { resumeBillings } from "../../../services/billing.service";
import { useFormik } from "formik";
import { Autocomplete, FormControl, FormLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { CustomBreadcrumbs } from "../../../components/layout/Breadcrumbs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FilterAltSharp, Search } from "@mui/icons-material";
import dayjs from "dayjs";
import { formatCurrency } from "../../../helpers/currency";
import { HiEye } from "react-icons/hi2";

interface IPayload {
    status: string | null,
    start: string | null,
    end: string | null,
}

export const Billings = () => {
    let navigate: NavigateFunction = useNavigate();
    const [billings, setBillings] = React.useState<IBillingResume[]>([]);
    const [students, setStudents] = React.useState<IStudent[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [dataDetails, setDataDetails] = React.useState<IPayload>();

    const goDetails = (student_id: string) => {
        navigate('/finance/billings/' + student_id, { state: { dataDetails } });
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const formatPayload = (form: any) => {
        const status = form.status ? (form.status) : null;
        const formattedStart = new Date(form.start).toISOString().split('T')[0];
        const formattedEnd = new Date(form.end).toISOString().split('T')[0];
        const data = {
            student_id: form.student.id,
            status: status,
            start: formattedStart,
            end: formattedEnd
        }
        return data;
    }

    const listStudents = async () => {
        const list = await getStudents();
        setStudents(list);
    }

    const defaultProps = {
        options: students,
        getOptionLabel: (option: any) => option.fullname,
    };

    const startResume = async () => {
        const payload = {
            status: "PREVISTO",
            start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
            end: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString().split('T')[0]
        }
        const billings = await resumeBillings(payload);
        setDataDetails(payload);
        setBillings(billings);
    }

    React.useEffect(() => {
        startResume();
    }, []);

    React.useEffect(() => {
        listStudents();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            student: null,
            status: "PREVISTO",
            start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
            end: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString().split('T')[0]
        },
        onSubmit: async (values) => {
            const payload = formatPayload(values);
            const payments = await resumeBillings(payload);
            setBillings(payments);
        }
    });

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
                        title1="Financeiro"
                        href1="/finance"
                        title2="Recebimentos"
                        href2="/billings"
                    />
                </Grid>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <form onSubmit={formik.handleSubmit}>
                        <Paper elevation={2}>
                            <React.Fragment>
                                <Grid container>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <div className="paperFilters">
                                            <FilterAltSharp />
                                            <Typography color="#818181" variant="subtitle2" sx={{ flex: 1, m: 1 }} gutterBottom>
                                                Filtros
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6} sx={{
                                        textIndent: 5,
                                        marginTop: 1,
                                        marginLeft: 10,
                                        marginBottom: 2
                                    }}>
                                        <Autocomplete
                                            {...defaultProps}
                                            value={formik.values.student}
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue('student', newValue);
                                            }}
                                            id="student_id"
                                            disableCloseOnSelect
                                            renderInput={(params) => (
                                                <TextField {...params} label="Cliente" variant="standard" />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xl={3} lg={3} md={3} sm={3} xs={3} sx={{
                                        marginLeft: 5,
                                        marginTop: 1,
                                        marginBottom: 1
                                    }}>
                                        <FormControl>
                                            <FormLabel>De</FormLabel>
                                            <DatePicker
                                                value={dayjs(formik.values.start)}
                                                format="DD/MM/YYYY"
                                                onChange={(value) => {
                                                    formik.setFieldValue('start', value);
                                                }}
                                                slotProps={{ textField: { size: 'small' } }}
                                            />

                                        </FormControl>
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={3} sm={3} xs={3} sx={{
                                        marginLeft: 5,
                                        marginTop: 1,
                                        marginBottom: 1
                                    }}>
                                        <FormControl>
                                            <FormLabel>Até</FormLabel>
                                            <DatePicker
                                                value={dayjs(formik.values.end)}
                                                format="DD/MM/YYYY"
                                                onChange={(value) => {
                                                    formik.setFieldValue('end', value);
                                                }}
                                                slotProps={{ textField: { size: 'small' } }}
                                            />

                                        </FormControl>
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={3} sm={3} xs={3} sx={{
                                        marginLeft: 5,
                                        marginTop: 1,
                                        marginBottom: 1
                                    }}>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            label="Status"
                                            id="status"
                                            name="status"
                                            value={formik.values.status}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            required
                                            size="small"
                                        >
                                            <MenuItem value={'PREVISTO'} selected>Previsto</MenuItem>
                                            <MenuItem value={'CONFIRMADO'}>Confirmado</MenuItem>
                                            <MenuItem value={'FEITO'}>Feito</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                        <div className="buttonPaperFilters">
                                            <IconButton
                                                type="submit"
                                                title="Buscar"
                                            >
                                                <Search />
                                            </IconButton>
                                        </div>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        </Paper>
                    </form>
                </Grid>
            </LocalizationProvider>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead className="tableHeader">
                            <TableRow>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Quantidade</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tableBody">
                            {billings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {row.fullname}
                                    </TableCell>
                                    <TableCell>
                                        {row.category}
                                    </TableCell>
                                    <TableCell>
                                        {row.count}
                                    </TableCell>
                                    <TableCell>
                                        {formatCurrency(row.total)}
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton>
                                            <HiEye
                                                size={20}
                                                color='grey'
                                                onClick={() => goDetails(row.student_id)}
                                            />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={billings.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Grid>
        </Grid>
    );
}