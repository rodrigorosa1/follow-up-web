import * as React from "react"
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import { getDataPayment, getProfessionalId, postDataPayment, updateDataPayment } from "../../services/professional.service";
import { Alert, Box, FormControl, Grid, IconButton, InputLabel, LinearProgress, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { getSpecialties } from "../../services/specialty.service";
import ISpecialty from "../../types/specialty.type";
import { ReplyOutlined, Save } from "@mui/icons-material";
import { formatCurrency, parseCurrencyToFloat } from "../../helpers/currency";
import { getBanks } from "../../services/external.service";
import { IBank } from "../../types/payment.type";

export const ProfessionalPayment = () => {
    const initial = {
        specialty_id: '',
        type_payment: '',
        mode_payment: '',
        value: '',
        comission: null,
        key: '',

    }

    let navigate: NavigateFunction = useNavigate();
    const { id } = useParams();
    const [dataForm, setDataForm] = React.useState(initial);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarError, setSnackbarError] = React.useState(false);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [idPayment, setIdPayment] = React.useState('');
    const [specialties, setSpecialties] = React.useState<ISpecialty[]>([]);
    const [banks, setBanks] = React.useState<IBank[]>([]);

    const historyBack = () => {
        navigate("/professionals");
    }

    const getProfessional = async () => {
        if (id) {
            const professional = await getProfessionalId(id);
            if (professional) {
                const dataPay = await getDataPayment(id);
                if (dataPay.id) {
                    const data = {
                        specialty_id: professional.specialty_id,
                        type_payment: professional.type_payment,
                        mode_payment: professional.mode_payment,
                        value: formatCurrency(professional.value),
                        comission: professional.comission,
                        bank_number: dataPay.bank_number,
                        bank_branch: dataPay.bank_branch,
                        account_number: dataPay.account_number,
                        key: dataPay.key,
                    }
                    const initial = initialEditValues(data);
                    setDataForm(initial);
                    setIdPayment(dataPay.id)
                }
            }
        }
        setDataLoaded(true);
    }

    const specialtyList = async () => {
        const list = await getSpecialties();
        setSpecialties(list);
    }

    const listBanks = async () => {
        const banks = await getBanks();
        setBanks(banks);
    }

    const initialEditValues = (values: any) => {
        const initial = {
            specialty_id: values.specialty_id,
            type_payment: values.type_payment,
            mode_payment: values.mode_payment,
            comission: values.comission,
            value: values.value,
            key: values.key,
        }
        return initial;
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: dataForm,
        onSubmit: (values) => {
            const formattedValues = {
                ...values,
                value: parseCurrencyToFloat(values.value),
            };
            if (id) {
                if (idPayment) {
                    updateDataPayment(id, formattedValues).then((r) => {
                        if (r.id) {
                            setSnackbarError(false)
                            setSnackbarMessage('Dados para pagamento atualizados com sucesso.');
                            setSnackbarOpen(true);
                        } else {
                            setSnackbarError(true)
                            setSnackbarMessage(r.response.data.detail);
                            setSnackbarOpen(true);
                        }
                    }).catch((e) => {
                        console.error(e);
                    });
                } else {
                    postDataPayment(id, formattedValues).then((r) => {
                        if (r.id) {
                            setSnackbarError(false)
                            setSnackbarMessage('Dados para pagamento cadastrado com sucesso.');
                            setSnackbarOpen(true);
                        } else {
                            setSnackbarError(true)
                            setSnackbarMessage(r.response.data.detail);
                            setSnackbarOpen(true);
                        }
                    }).catch((e) => {
                        console.error(e);
                    });
                }
            }
        },
    });

    React.useEffect(() => {
        getProfessional();
    }, []);

    React.useEffect(() => {
        specialtyList();
    }, []);

    React.useEffect(() => {
        listBanks();
    }, []);

    return (
        <Grid>
            {dataLoaded === false ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <Grid item>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 450 }}>
                                <InputLabel>Especialidade</InputLabel>
                                <Select
                                    label="Especialidade"
                                    id="specialty_id"
                                    name="specialty_id"
                                    value={formik.values.specialty_id}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    required
                                >
                                    {
                                        specialties.map((specialty: any) => {
                                            return <MenuItem key={specialty.id} value={specialty.id}>
                                                {specialty.name}
                                            </MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel>Tipo</InputLabel>
                                <Select
                                    label="Tipo"
                                    id="type_payment"
                                    name="type_payment"
                                    value={formik.values.type_payment}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    required
                                >
                                    <MenuItem selected value={'PIX'}>Pix</MenuItem>
                                    {/* <MenuItem value={'TED'}>Transferência Bancaria</MenuItem> */}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel>Por</InputLabel>
                                <Select
                                    label="Por"
                                    id="mode_payment"
                                    name="mode_payment"
                                    value={formik.values.mode_payment}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    required
                                >
                                    {/* <MenuItem value={'MENSAL'}>Mês</MenuItem> */}
                                    <MenuItem selected value={'AGENDA'}>Agenda</MenuItem>
                                    {/* <MenuItem value={'COMISSÃO'}>Comissão</MenuItem> */}
                                </Select>
                            </FormControl>
                            {formik.values.mode_payment === 'COMISSÃO' && (
                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                    <TextField
                                        id="comission"
                                        name="comission"
                                        label="Comissão %"
                                        value={formik.values.comission}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        required
                                    />
                                </FormControl>
                            )}
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <TextField
                                    id="value"
                                    name="value"
                                    label="Valor (R$)"
                                    value={formik.values.value}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    required
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    {/* <Grid item>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel>Banco</InputLabel>
                                <Select
                                    label="Banco"
                                    id="bank_number"
                                    name="bank_number"
                                    value={formik.values.bank_number}
                                    onChange={formik.handleChange}
                                    fullWidth
                                >
                                    {
                                        banks.map((bank) => {
                                            return <MenuItem key={bank.code} value={bank.code}>
                                                {bank.code} - {bank.name}
                                            </MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <TextField
                                    id="bank_branch"
                                    name="bank_branch"
                                    label="Agência"
                                    value={formik.values.bank_branch}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <TextField
                                    id="account_number"
                                    name="account_number"
                                    label="Conta e Digito"
                                    value={formik.values.account_number}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>
                    </Grid> */}
                    <Grid item>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 600 }}>
                                <TextField
                                    id="key"
                                    name="key"
                                    label="Chave Pix"
                                    value={formik.values.key}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="right" justifyContent="right">
                            <Grid item alignContent="center" xl={1} lg={1} md={1} sm={1} xs={1}>
                                <IconButton
                                    title="Voltar"
                                    onClick={historyBack}
                                >
                                    <ReplyOutlined />
                                </IconButton>
                            </Grid>
                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1} mr={2}>
                                <IconButton
                                    type="submit"
                                    title="Savar"
                                >
                                    <Save />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={5000}
                            onClose={handleSnackbarClose}
                            message={snackbarMessage}
                        >
                            {snackbarError ? (
                                <Alert severity="error" sx={{ width: '100%' }}>
                                    {snackbarMessage}
                                </Alert>

                            ) : (
                                <Alert severity="success" sx={{ width: '100%' }}>
                                    {snackbarMessage}
                                </Alert>
                            )}
                        </Snackbar>
                    </Grid>
                </form>
            )}
        </Grid>
    );
}