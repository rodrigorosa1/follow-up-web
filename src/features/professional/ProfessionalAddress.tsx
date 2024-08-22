import { Box, Grid, IconButton, TextField, Snackbar, Alert, LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { findiCep } from "../../services/external.service";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ReplyOutlined, Save, FindReplace, } from "@mui/icons-material";
import { CepMask } from "../../components/masks/InputMask";
import { getProfAddress, postProfAddress, upProfAddress } from "../../services/professional.service";

export const ProfessionalAddress = () => {
    const initial = {
        zip_code: '',
        name: '',
        address: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        state: ''
    }
    let navigate: NavigateFunction = useNavigate();
    const { id } = useParams();
    const [dataForm, setDataForm] = useState(initial);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarError, setSnackbarError] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [idAddress, setIdAddress] = useState('');

    const historyBack = () => {
        navigate("/professionals");
    }

    const profAdress = async () => {
        if (id) {
            const prfs = await getProfAddress(id);
            if (prfs.id) {
                setIdAddress(prfs.id);
            }
            const initial = initialEditValues(prfs);
            setDataForm(initial);
        }
        setDataLoaded(true);
    }


    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    }

    const initialEditValues = (values: any) => {
        const initial = {
            zip_code: values.zip_code,
            name: values.name,
            address: values.address,
            number: values.number,
            complement: values.complement,
            district: values.district,
            city: values.city,
            state: values.state
        }
        return initial;
    }

    const cep = async (value: string) => {
        await findiCep(value).then((resp) => {
            const initial = {
                zip_code: resp.cep,
                name: resp.name,
                address: resp.logradouro,
                number: '',
                complement: '',
                district: resp.bairro,
                city: resp.localidade,
                state: resp.uf
            }
            setDataForm(initial);
        }).catch((error) => {
            return error;
        });
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: dataForm,
        onSubmit: (values) => {
            if (id) {
                console.log(idAddress)
                if (idAddress) {
                    upProfAddress(idAddress, values).then((r) => {
                        if (r.id) {
                            setSnackbarError(false)
                            setSnackbarMessage('Endereço atualizado com sucesso!');
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
                    postProfAddress(id, values).then((r) => {
                        if (r.id) {
                            setSnackbarError(false)
                            setSnackbarMessage('Endereço cadastrado com sucesso!');
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

    useEffect(() => {
        profAdress();
    }, []);




    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            {dataLoaded === false ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>

            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <Grid item>
                        <Grid container>
                            <Grid item xl={3} lg={3} md={3} sm={6} xs={6} sx={{ m: 1 }}>
                                <TextField
                                    id="zip_code"
                                    name="zip_code"
                                    label="CEP"
                                    size="small"
                                    value={formik.values.zip_code}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    autoFocus
                                    required
                                    InputProps={{ inputComponent: CepMask }}
                                />
                            </Grid>
                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1} mr={2}>
                                <IconButton
                                    title="Buscar"
                                    onClick={() => cep(formik.values.zip_code)}
                                >
                                    <FindReplace />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={12} xs={12} sx={{ m: 1 }}>
                                <TextField
                                    id="address"
                                    name="address"
                                    label="Endereço"
                                    size="small"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    autoFocus
                                    required
                                />
                            </Grid>
                            <Grid item xl={1} lg={1} md={1} sm={6} xs={6} sx={{ m: 1 }}>
                                <TextField
                                    id="number"
                                    name="number"
                                    label="Número"
                                    size="small"
                                    value={formik.values.number}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    autoFocus
                                    required
                                />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={6} xs={6} sx={{ m: 1 }}>
                                <TextField
                                    id="complement"
                                    name="complement"
                                    label="Complemento"
                                    size="small"
                                    value={formik.values.complement}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xl={4} lg={4} md={4} sm={6} xs={6} sx={{ m: 1 }}>
                                <TextField
                                    id="district"
                                    name="district"
                                    label="Bairro"
                                    size="small"
                                    value={formik.values.district}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    autoFocus
                                    required
                                />
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={6} xs={6} sx={{ m: 1 }}>
                                <TextField
                                    id="city"
                                    name="city"
                                    label="Cidade"
                                    size="small"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    autoFocus
                                    required
                                />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={6} xs={6} sx={{ m: 1 }}>
                                <TextField
                                    id="state"
                                    name="state"
                                    label="UF"
                                    size="small"
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    autoFocus
                                    required
                                />
                            </Grid>
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

        </LocalizationProvider>
    );

}