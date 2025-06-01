import * as React from "react";
import { IBilling } from "../../../types/billing.type";
import { useFormik } from "formik";
import { Box, FormControl, FormLabel, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { ReplyOutlined, Save } from "@mui/icons-material";
import { formatCurrency, parseCurrencyToFloat } from "../../../helpers/currency";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { updateBilling } from "../../../services/billing.service";
import { PageLoad } from "../../../components/animations/PageLoad";


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

interface ModalBillingProps {
    billing?: IBilling | null;
    isOpen: boolean;
    onClose: () => void;
    onSnackbarOpen: () => void;
    onSnackbarError: (active: boolean) => void;
    onSnackbarMessage: (message: string) => void;
    startResume: () => void;
}

export const BillingStatusModal: React.FC<ModalBillingProps> = ({ billing, isOpen, onClose, onSnackbarOpen, onSnackbarError, onSnackbarMessage, startResume }) => {
    const [dataLoaded, setDataLoaded] = React.useState(true);

    const initial = {
        status: billing?.status,
        value: formatCurrency(billing?.value),
        date_due: billing?.date_due,
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
            if (billing?.id) {
                const payload = formatPayload(values);
                setDataLoaded(false);
                updateBilling(billing.id, payload).then((r) => {
                    if (r.id) {
                        onSnackbarError(false);
                        onSnackbarOpen();
                        onClose();
                        setDataLoaded(true);
                        startResume();
                        return;
                    }
                    onSnackbarMessage('Erro ao atualizar status');
                    onSnackbarError(true);
                    onSnackbarOpen();
                    setDataLoaded(true);
                    onClose();
                }).catch((e) => {
                    console.error(e);
                });
            }
        }
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Dados para Recebimento
                    </Typography>
                    {!dataLoaded ? (
                        <PageLoad />
                    ) : (
                        <Grid container>
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
                            <Grid container alignItems="right" justifyContent="right" sx={{ marginTop: 2 }}>
                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2} sx={{ mr: 2 }}>
                                    <IconButton
                                        title="Voltar"
                                        onClick={onClose}
                                    >
                                        <ReplyOutlined />
                                    </IconButton>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2} sx={{ mr: 2 }}>
                                    <IconButton
                                        type="submit"
                                        title="Savar"
                                    >
                                        <Save />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </form>
        </Modal>
    );

}