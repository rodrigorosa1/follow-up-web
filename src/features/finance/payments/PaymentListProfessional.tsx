import * as React from "react";
import { IPayament } from "../../../types/payment.type";
import { instructorPayments } from "../../../services/payment.service";
import { useLocation, useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { useFormik } from "formik";
import { Alert, Avatar, Box, Chip, FormControl, FormLabel, Grid, IconButton, InputLabel, LinearProgress, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { CustomBreadcrumbs } from "../../../components/layout/Breadcrumbs";
import dayjs from "dayjs";
import { formatCurrency } from "../../../helpers/currency";
import { FilterAltSharp, ReplyOutlined, Search } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { HiPencilSquare } from "react-icons/hi2";
import { getInstructorAvatarId } from "../../../services/avatar.service";
import { getDataPayment } from "../../../services/professional.service";
import { IProfessional, IProfessionalBankAccount } from "../../../types/professional.type";
import { PaymentStatusModal } from "./PaymentStatusModal";

export const PaymentListProfessional = () => {
    let navigate: NavigateFunction = useNavigate();
    const [payments, setPayments] = React.useState<IPayament[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [professional, setProfessional] = React.useState<IProfessional>()
    const [details, setDetails] = React.useState<IProfessionalBankAccount>();
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarError] = React.useState(false);
    const [selected, setSelected] = React.useState<IPayament | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const { instructor_id } = useParams();
    const location = useLocation();
    const { dataDetails } = location.state || {};

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
            instructor_id: instructor_id,
            status: status,
            start: formattedStart,
            end: formattedEnd
        }
        return data;
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleClick = (payment: IPayament) => {
        setSelected(payment);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const startResume = async () => {
        const payload = {
            instructor_id: instructor_id,
            status: dataDetails.status ? dataDetails.status : "PREVISTO",
            start: dataDetails.start ? dataDetails.start : new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
            end: dataDetails.end ? dataDetails.end : new Date(new Date().setDate(new Date().getDate() + 60)).toISOString().split('T')[0],
        }
        const payments = await instructorPayments(payload);
        setPayments(payments);
        setProfessional(payments[0].instructor);
        instructorPaymentDetails(payments[0].instructor)
    }

    const instructorPaymentDetails = async (professional: IProfessional) => {
        const details = getDataPayment(professional.id);
        setDetails(await details);
        setDataLoaded(true);
    }

    React.useEffect(() => {
        startResume();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            professional: null,
            status: dataDetails.status ? dataDetails.status : "PREVISTO",
            start: dataDetails.start ? dataDetails.start : new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
            end: dataDetails.end ? dataDetails.end : new Date(new Date().setDate(new Date().getDate() + 60)).toISOString().split('T')[0]
        },
        onSubmit: async (values) => {
            const payload = formatPayload(values);
            const payments = await instructorPayments(payload);
            setPayments(payments);
        }
    });

    return (
        <Grid container
            spacing={3}
        >
            {dataLoaded === false ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
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
                    <Box>
                        <Grid item>
                            <PaymentStatusModal
                                payment={selected}
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                                onSnackbarOpen={handleSnackbarOpen}
                                startResume={startResume}
                            />
                        </Grid>
                    </Box>
                    {professional && (
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper elevation={2}>
                                <Grid container>
                                    <Grid item xs={12} md={4} lg={4}>
                                        <div className='resultDetailsSkill'>
                                            <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                Profissional
                                            </Typography>
                                            <Grid container justifyContent="left" alignItems={"center"}>
                                                <Avatar
                                                    alt={professional.fullname}
                                                    src={getInstructorAvatarId(professional.id)}
                                                />
                                                <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                    {professional.fullname}
                                                </Typography>
                                            </Grid>
                                        </div>

                                    </Grid>
                                    {details && (
                                        <Grid container>
                                            <Grid item xs={12} md={4} lg={4}>
                                                <div className='resultDetailsSkill'>
                                                    <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                        Chave PIX
                                                    </Typography>
                                                    <Grid container justifyContent="left" alignItems={"center"}>
                                                        <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                            {details.key}
                                                        </Typography>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={4} lg={4}>
                                                <div className='resultDetailsSkill'>
                                                    <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                        Tipo de Pagamento
                                                    </Typography>
                                                    <Grid container justifyContent="left" alignItems={"center"}>
                                                        <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                            {professional.mode_payment}
                                                        </Typography>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={4} lg={4}>
                                                <div className='resultDetailsSkill'>
                                                    <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                        Valor
                                                    </Typography>
                                                    <Grid container justifyContent="left" alignItems={"center"}>
                                                        <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                            {formatCurrency(professional.value)}
                                                        </Typography>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </Paper>
                        </Grid>
                    )}

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
                                                        slotProps={{ textField: { size: 'small' } }}
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
                                        <TableCell>Data</TableCell>
                                        <TableCell>Cliente</TableCell>
                                        <TableCell>Especialidade</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Valor</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className="tableBody">
                                    {payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                {new Date(row.date_due).toLocaleDateString('pt-BR')}
                                            </TableCell>
                                            <TableCell>
                                                {row.schedule.student.fullname}
                                            </TableCell>
                                            <TableCell>
                                                {row.schedule.specialty.name}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.status}
                                                    color={row.status === 'PREVISTO' ? 'default' :
                                                        row.status === 'CONFIRMADO' ? 'primary' :
                                                            row.status === 'FEITO' ? 'success' :
                                                                'error'} />
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(row.value)}
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton>
                                                    <HiPencilSquare
                                                        size={20}
                                                        color='grey'
                                                        onClick={() => handleClick(row)}
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
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container justifyContent="right" alignItems={"right"}>
                            <IconButton
                                title="Voltar"
                                onClick={() => navigate(-1)}
                            >
                                <ReplyOutlined />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Box>
                            <Snackbar
                                open={snackbarOpen}
                                autoHideDuration={5000}
                                onClose={handleSnackbarClose}
                            >
                                {snackbarError ? (
                                    <Alert severity="error" sx={{ width: '100%' }}>
                                        Erro
                                    </Alert>

                                ) : (
                                    <Alert severity="success" sx={{ width: '100%' }}>
                                        Sucesso
                                    </Alert>
                                )}
                            </Snackbar>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}