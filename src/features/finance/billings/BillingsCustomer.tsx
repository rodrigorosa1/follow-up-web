import * as React from "react";
import { useLocation, useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { IBilling } from "../../../types/billing.type";
import { IStudent } from "../../../types/student.type";
import { studentsBillings, updateManyBilling } from "../../../services/billing.service";
import { useFormik } from "formik";
import { Alert, Avatar, Box, Checkbox, Chip, FormControl, FormLabel, Grid, IconButton, InputLabel, LinearProgress, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { CustomBreadcrumbs } from "../../../components/layout/Breadcrumbs";
import { getStudentAvatarId } from "../../../services/avatar.service";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FilterAltSharp, ReplyOutlined, Search } from "@mui/icons-material";
import dayjs from "dayjs";
import { formatCurrency } from "../../../helpers/currency";
import { HiPencilSquare, HiDocumentArrowUp } from "react-icons/hi2";
import { BillingStatusModal } from "./BillingStatusModal";
import { getStudentsId } from "../../../services/student.service";
import SwapHoriz from '@mui/icons-material/SwapHoriz';
import { BillingTypeChange } from "./BillingTypeChange";
import { BillingInvoiceGenerate } from "./BillingInvoiceGenerate";

export const BillingsCustomer = () => {
    let navigate: NavigateFunction = useNavigate();
    const [billings, setBillings] = React.useState<IBilling[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [student, setStudent] = React.useState<IStudent>();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarError] = React.useState(false);
    const [selected, setSelected] = React.useState<IBilling | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isModalInvoiceOpen, setIsModalInvoiceOpen] = React.useState(false);
    const [checked, setChecked] = React.useState<string[]>([]);
    const [status, setStatus] = React.useState('');
    const [generateInvoice, setGenerateInvoice] = React.useState('');
    const [isContractModalOpen, setIsContractModalOpen] = React.useState(false);

    const isSelected = (id: string) => checked.includes(id);
    const handleSelect = (id: string) => {
        setChecked(prevSelected =>
            isSelected(id) ? prevSelected.filter(item => item !== id) : [...prevSelected, id]
        );
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const allIds = billings.map((row: any) => row.id);
            setChecked(allIds);
        } else {
            setChecked([]);
        }
    };


    const { student_id } = useParams();
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
            student_id: student_id,
            status: status,
            start: formattedStart,
            end: formattedEnd
        }
        return data;
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleClick = (billing: IBilling) => {
        setSelected(billing);
        setIsModalOpen(true);
    };

    const handleInvoiceModal = (billing: IBilling) => {
        setSelected(billing);
        setIsModalInvoiceOpen(true);
    };

    const handleContact = () => {
        setIsContractModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsContractModalOpen(false);
        setIsModalInvoiceOpen(false);
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const formatPayloadChecks = (ids: any, status: any) => {
        return {
            ids: ids,
            status: status
        }
    }

    const handleStatusChange = (event: any) => {
        if (checked.length > 0) {
            const payload = formatPayloadChecks(checked, event.target.value);
            updateManyBilling(payload);
            startResume();
        }
    };

    const handleGenerateInvoice = (event: any) => {
        if (checked.length > 0) {
            setIsModalInvoiceOpen(true);
        }
    };

    const startResume = async () => {
        const payload = {
            student_id: student_id,
            status: dataDetails.status ? dataDetails.status : "PREVISTO",
            start: dataDetails.start ? dataDetails.start : new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
            end: dataDetails.end ? dataDetails.end : new Date(new Date().setDate(new Date().getDate() + 60)).toISOString().split('T')[0],
        }
        const billings = await studentsBillings(payload);
        setBillings(billings);
        studentInfo(billings[0].student.id);
    }

    React.useEffect(() => {
        startResume();
    }, []);


    const studentInfo = async (id: string) => {
        const student = await getStudentsId(id);
        setStudent(student);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            student: null,
            status: dataDetails.status ? dataDetails.status : "PREVISTO",
            start: dataDetails.start ? dataDetails.start : new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
            end: dataDetails.end ? dataDetails.end : new Date(new Date().setDate(new Date().getDate() + 60)).toISOString().split('T')[0]
        },
        onSubmit: async (values) => {
            const payload = formatPayload(values);
            const billings = await studentsBillings(payload);
            setBillings(billings);
        }
    });

    return (
        <Grid container
            spacing={3}
        >
            {/* <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box> */}
            <Grid container spacing={3}>
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
            </Grid>
            <Box>
                <Grid item>
                    <BillingStatusModal
                        billing={selected}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onSnackbarOpen={handleSnackbarOpen}
                        startResume={startResume}
                    />
                </Grid>
                {student && (
                    <Grid item>
                        <BillingTypeChange
                            contractor_id={student.contractor.id}
                            type={student.contractor.type_billing}
                            isOpen={isContractModalOpen}
                            onClose={handleCloseModal}
                            onSnackbarOpen={handleSnackbarOpen}
                            startResume={startResume}
                        />
                    </Grid>
                )}
                {student && (
                    <Grid item>
                        <BillingInvoiceGenerate
                            billing={selected}
                            ids={checked}
                            isOpen={isModalInvoiceOpen}
                            onClose={handleCloseModal}
                            student_id={student?.id}
                            onSnackbarOpen={handleSnackbarOpen}
                            startResume={startResume}
                        />
                    </Grid>
                )}
            </Box>
            {student && (
                <Grid item xs={12} md={12} lg={12}>
                    <Paper elevation={2}>
                        <Grid container>
                            <Grid item xs={12} md={4} lg={4}>
                                <div className='resultDetailsSkill'>
                                    <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                        Cliente
                                    </Typography>
                                    <Grid container justifyContent="left" alignItems={"center"}>
                                        <Avatar
                                            alt={student.fullname}
                                            src={getStudentAvatarId(student.id)}
                                        />
                                        <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                            {student.fullname}
                                        </Typography>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <div className='resultDetailsSkill'>
                                    <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                        Tipo de faturamento
                                    </Typography>
                                    <Grid container justifyContent="left" alignItems={"center"}>
                                        <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                            {student.contractor.type_billing}
                                            <IconButton aria-label="delete" color="primary" title="Alterar tipo" onClick={handleContact} sx={{ flex: 1 }}>
                                                <SwapHoriz />
                                            </IconButton>
                                        </Typography>

                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                        {student.contractor.type_billing === 'CONVÊNIO' && student.plans && student.plans.length > 0 ? (
                            <Grid container>
                                <Grid item xs={12} md={4} lg={4}>
                                    <div className='resultDetailsSkill'>
                                        <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                            Nome do Convênio
                                        </Typography>
                                        <Grid container justifyContent="left" alignItems={"center"}>
                                            <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                {student.plans[0].fantasy_name}
                                            </Typography>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <div className='resultDetailsSkill'>
                                        <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                            E-mail:
                                        </Typography>
                                        <Grid container justifyContent="left" alignItems={"center"}>
                                            <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                {student.plans[0].email}
                                            </Typography>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <div className='resultDetailsSkill'>
                                        <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                            Contato
                                        </Typography>
                                        <Grid container justifyContent="left" alignItems={"center"}>
                                            <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                {student.plans[0].phone}
                                            </Typography>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container>
                                <Grid item xs={12} md={4} lg={4}>
                                    <div className='resultDetailsSkill'>
                                        <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                            Nome do Responsável
                                        </Typography>
                                        <Grid container justifyContent="left" alignItems={"center"}>
                                            <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                {student.responsibles && student.responsibles.length > 0 && (
                                                    student.responsibles[0].fullname
                                                )}
                                            </Typography>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <div className='resultDetailsSkill'>
                                        <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                            E-mail:
                                        </Typography>
                                        <Grid container justifyContent="left" alignItems={"center"}>
                                            <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                {student.responsibles && student.responsibles.length > 0 && (
                                                    student.responsibles[0].email
                                                )}
                                            </Typography>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <div className='resultDetailsSkill'>
                                        <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                            Contato
                                        </Typography>
                                        <Grid container justifyContent="left" alignItems={"center"}>
                                            <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                {student.responsibles && student.responsibles.length > 0 && (
                                                    student.responsibles[0].phone
                                                )}
                                            </Typography>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        )}
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
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={checked.length > 0 && checked.length < billings.length}
                                        checked={checked.length === billings.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Profissional</TableCell>
                                <TableCell>Especialidade</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Valor</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tableBody">
                            {billings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                                <TableRow key={row.id} selected={isSelected(row.id)}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected(row.id)}
                                            onChange={() => handleSelect(row.id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {new Date(row.date_due).toLocaleDateString('pt-BR')}
                                    </TableCell>
                                    <TableCell>
                                        {row.schedule.instructor.fullname}
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
                                                title="Editar"
                                                color='grey'
                                                onClick={() => handleClick(row)}
                                            />
                                        </IconButton>
                                        {/* <IconButton>
                                            <HiDocumentArrowUp
                                                size={20}
                                                color='grey'
                                                title="Gerar NF"
                                                onClick={() => handleGenerateInvoice(row)}
                                            />
                                        </IconButton> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Typography variant="subtitle1">Com selecionados:</Typography>

                                        <Select
                                            value={status}
                                            onChange={handleStatusChange}
                                            displayEmpty
                                            size="small"
                                            style={{ minWidth: 120 }}
                                        >
                                            <MenuItem value="">
                                                <em>Alterar Status</em>
                                            </MenuItem>
                                            <MenuItem value="PREVISTO">Previsto</MenuItem>
                                            <MenuItem value="CONFIRMADO">Confirmado</MenuItem>
                                            <MenuItem value="FEITO">Feito</MenuItem>
                                            <MenuItem value="CANCELADO">Cancelado</MenuItem>
                                        </Select>

                                        <Select
                                            value={generateInvoice}
                                            onChange={handleGenerateInvoice}
                                            displayEmpty
                                            size="small"
                                            style={{ minWidth: 120 }}
                                        >
                                            <MenuItem value="">
                                                <em>Gerar Nota Fiscal</em>
                                            </MenuItem>
                                            <MenuItem value="SIM">Sim</MenuItem>
                                        </Select>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
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
    );
}