import * as React from "react"
import ICompany from "../../../types/company.type";
import { companyForUserLogged, updateCompany } from "../../../services/company.service";
import { useFormik } from "formik";
import { Alert, Box, FormControl, Grid, IconButton, Snackbar, Stack, TextField } from "@mui/material";
import { CepMask, CompanyMask, PhoneMask } from "../../../components/masks/InputMask";
import { FindReplace, ReplyOutlined, Save } from "@mui/icons-material";
import { findiCep } from "../../../services/external.service";
import { NavigateFunction, useNavigate } from 'react-router-dom';


export const CompanyDetails = () => {
    const [company, setCompany] = React.useState<ICompany | null>(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarError, setSnackbarError] = React.useState(false);

    let navigate: NavigateFunction = useNavigate();

    const historyBack = () => {
        navigate("/configurations");
    }

    const initial = {
        social_name: '',
        fantasy_name: '',
        document: '',
        municipal_registration: '',
        address: '',
        number_address: '',
        complement: '',
        zip_code: '',
        city: '',
        district: '',
        state: '',
        email: '',
        phone: '',
        city_code: '',
        aliquot: '',
        item_list_service: '',
        municipal_tax_code: '',
        iss_retained: '',
    }

    const companyLogged = async () => {
        const company = await companyForUserLogged();
        if (company) {
            setCompany(company);
        }
    }

    const cep = async (value: string) => {
        await findiCep(value).then((resp) => {
            formik.setFieldValue('zip_code', resp.cep);
            formik.setFieldValue('address', resp.logradouro);
            formik.setFieldValue('district', resp.bairro);
            formik.setFieldValue('city', resp.localidade);
            formik.setFieldValue('state', resp.uf);
        }).catch((error) => {
            return error;
        });
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    React.useEffect(() => {
        companyLogged();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: company || initial,
        onSubmit: (values) => {
            if (company?.id) {
                updateCompany(company.id, values).then((r) => {
                    if (r.id) {
                        setSnackbarError(false)
                        setSnackbarMessage('Cadastro atualizado com sucesso!');
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
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box>
                <Grid item>
                    <Grid container>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="info">
                                Informações da Empresa
                            </Alert>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container sx={{ m: 1 }}>
                        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <FormControl sx={{ m: 1, minWidth: 250 }}>
                                    <TextField
                                        id="social_name"
                                        name="social_name"
                                        label="Razão Social"
                                        size="small"
                                        value={formik.values.social_name}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        autoFocus
                                        required
                                    />
                                </FormControl>
                            </Stack>

                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <FormControl sx={{ m: 1, minWidth: 250 }}>
                                    <TextField
                                        id="fantasy_name"
                                        name="fantasy_name"
                                        label="Nome Fantasia"
                                        size="small"
                                        value={formik.values.fantasy_name}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        autoFocus
                                        required
                                    />
                                </FormControl>
                            </Stack>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <TextField
                                        id="document"
                                        name="document"
                                        label="CNPJ"
                                        size="small"
                                        value={formik.values.document}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        autoFocus
                                        required
                                        InputProps={{ inputComponent: CompanyMask }}
                                    />
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="E-mail"
                                        size="small"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        autoFocus
                                        required
                                    />
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <TextField
                                        id="phone"
                                        name="phone"
                                        label="Telefone"
                                        size="small"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        autoFocus
                                        required
                                        InputProps={{ inputComponent: PhoneMask }}
                                    />
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item xl={3} lg={3} md={3} sm={6} xs={6} sx={{ m: 1 }}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
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
                            </Stack>
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
                            <Stack sx={{ width: '100%' }} spacing={2}>
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
                            </Stack>
                        </Grid>
                        <Grid item xl={1} lg={1} md={1} sm={6} xs={6} sx={{ m: 1 }}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <TextField
                                    id="number_address"
                                    name="number_address"
                                    label="Nº"
                                    size="small"
                                    value={formik.values.number_address}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    autoFocus
                                    required
                                />
                            </Stack>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={6} xs={6} sx={{ m: 1 }}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
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
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={6} sx={{ m: 1 }}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
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
                            </Stack>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={6} sx={{ m: 1 }}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
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
                            </Stack>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={6} xs={6} sx={{ m: 1 }}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
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
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="info">
                                Informações Tributárias para NFS
                            </Alert>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container sx={{ m: 1 }}>
                        <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <FormControl sx={{ m: 1, minWidth: 50 }}>
                                    <TextField
                                        id="aliquot"
                                        name="aliquot"
                                        label="Alíquota"
                                        size="small"
                                        value={formik.values.aliquot}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        autoFocus
                                    />
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <FormControl sx={{ m: 1, minWidth: 100 }}>
                                    <TextField
                                        id="item_list_service"
                                        name="item_list_service"
                                        label="Cod. Lista de Serviço"
                                        size="small"
                                        value={formik.values.item_list_service}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        autoFocus
                                    />
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <FormControl sx={{ m: 1, minWidth: 100 }}>
                                    <TextField
                                        id="municipal_tax_code"
                                        name="municipal_tax_code"
                                        label="Cód. Trib. do Municipio"
                                        size="small"
                                        value={formik.values.municipal_tax_code}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        autoFocus
                                    />
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ mr: 1, p: 1 }}>
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
            </Box>
        </form>
    )
}