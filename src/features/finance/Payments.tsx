import * as React from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IPaymentResume } from "../../types/payment.type";
import { FilterAltSharp, Search } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { HiEye, } from "react-icons/hi2";
import { resumePayments } from "../../services/payment.service";
import { FormControl, FormLabel, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { CustomBreadcrumbs } from "../../components/layout/Breadcrumbs";
import dayjs from "dayjs";


export const Payments = () => {
    let navigate: NavigateFunction = useNavigate();
    const [payments, setPayments] = React.useState<IPaymentResume[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
            status: status,
            start: formattedStart,
            end: formattedEnd
        }
        return data;
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            student: null,
            start: null,
            end: null
        },
        onSubmit: async (values) => {
            const payload = formatPayload(values);
            const payments = await resumePayments(payload);
            setPayments(payments);
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
                        title2="Pagamentos"
                        href2="/payments"
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
                                    <Grid item xl={4} lg={4} md={4} sm={4} xs={4} sx={{
                                        textIndent: 5,
                                        marginTop: 1,
                                        marginLeft: 10,
                                        marginBottom: 2
                                    }}>

                                    </Grid>
                                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2} sx={{
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
                                            />

                                        </FormControl>
                                    </Grid>
                                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2} sx={{
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
                                            />

                                        </FormControl>
                                    </Grid>
                                    <Grid item xl={2} lg={2} md={1} sm={1} xs={1}>
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
                                <TableCell>Nome/Razão Social</TableCell>
                                <TableCell>CNPJ</TableCell>
                                <TableCell>Quantidade</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tableBody">
                            {payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {row.instructor.fullname}
                                    </TableCell>
                                    <TableCell>
                                        {row.instructor.document_company}
                                    </TableCell>
                                    <TableCell>
                                        {row.count}
                                    </TableCell>
                                    <TableCell>
                                        {row.total}
                                    </TableCell>
                                    <TableCell>
                                        {row.count}
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton>
                                            <HiEye
                                                size={20}
                                                color='grey'
                                            // onClick={() => goDetails(row.id)}
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
                        count={payments.length}
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