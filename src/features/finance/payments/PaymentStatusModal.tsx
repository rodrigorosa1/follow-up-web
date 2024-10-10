import * as React from "react";
import { IPayament } from "../../../types/payment.type";
import { useFormik } from "formik";
import { updatePayment } from "../../../services/payment.service";
import { Box, FormControl, FormLabel, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { ReplyOutlined, Save } from "@mui/icons-material";
import { formatCurrency, parseCurrencyToFloat } from "../../../helpers/currency";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    m: 2
};

interface ModalPaymentProps {
    payment?: IPayament | null;
    isOpen: boolean;
    onClose: () => void;
    onSnackbarOpen: () => void;
    startResume: () => void;
}

export const PaymentStatusModal: React.FC<ModalPaymentProps> = ({ payment, isOpen, onClose, onSnackbarOpen, startResume }) => {
    const initial = {
        status: payment?.status,
        value: formatCurrency(payment?.value),
        date_due: payment?.date_due,
    };

    const formatPayload = (form: any) => {
        const data = {
            status: form.status,
            date_due: new Date(form.date_due).toISOString().split('T')[0],
            value: parseCurrencyToFloat(form.value)
        }

        return data
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initial,
        onSubmit: (values) => {
            if (payment?.id) {
                const payload = formatPayload(values);
                updatePayment(payment.id, payload);
                onSnackbarOpen();
                onClose();
                startResume();
            }
        }
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Dados do Pagamento
                    </Typography>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ mr: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid container>
                                <FormControl sx={{ m: 2, minWidth: 450 }}>
                                    <FormLabel>Data Vencimento</FormLabel>
                                    <DatePicker
                                        value={dayjs(formik.values.date_due)}
                                        format="DD/MM/YYYY"
                                        onChange={(value) => {
                                            formik.setFieldValue('date_due', value);
                                        }}
                                        slotProps={{ textField: { size: 'small' } }}
                                    />

                                </FormControl>
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ mr: 2 }}>
                        <Grid container>
                            <FormControl sx={{ m: 2, minWidth: 450 }}>
                                <TextField
                                    id="value"
                                    name="value"
                                    label="Valor"
                                    size="small"
                                    value={formik.values.value}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    required
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item sx={{ mr: 2 }}>
                        <Grid container>
                            <FormControl sx={{ m: 2, minWidth: 450 }}>
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
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container alignItems="right" justifyContent="right">
                            <Grid item alignContent="center" xl={1} lg={1} md={1} sm={1} xs={1} sx={{ mr: 2 }}>
                                <IconButton
                                    title="Voltar"
                                    onClick={onClose}
                                >
                                    <ReplyOutlined />
                                </IconButton>
                            </Grid>
                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1} mr={2} sx={{ mr: 2 }}>
                                <IconButton
                                    type="submit"
                                    title="Savar"
                                >
                                    <Save />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Modal>
    );
}