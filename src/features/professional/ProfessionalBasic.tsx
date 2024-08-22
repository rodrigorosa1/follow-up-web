import { Box, Checkbox, FormControlLabel, Grid, IconButton, TextField, Snackbar, Alert, LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getProfessionalId, postProf, updateProf, uploadAvatarProf } from "../../services/professional.service";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ReplyOutlined, Save, AccountBox, } from "@mui/icons-material";
import dayjs from 'dayjs';
import { CompanyMask, DocumentMask, PhoneMask } from "../../components/masks/InputMask";
import { Avatar } from "@files-ui/react";
import { getUserAvatarId } from "../../services/user.service";


export const ProfessionalBasic = () => {
    const initial = {
        fullname: '',
        speciality: '',
        email: '',
        document: '',
        indentity_number: '',
        org_exp: '',
        uf_exp: '',
        nationality: '',
        birthday: '',
        document_company: '',
        social_name: '',
        fantasy_name: '',
        phone: '',
        avatar: '',
    }

    let navigate: NavigateFunction = useNavigate();

    const { id } = useParams();
    const [dataForm, setDataForm] = useState(initial);
    const [userId, setUserId] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarError, setSnackbarError] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);


    const historyBack = () => {
        navigate("/professionals");
    }

    const professional = async () => {
        if (id) {
            const prfs = await getProfessionalId(id);
            const initial = initialEditValues(prfs);
            setDataForm(initial);
            setUserId(prfs.user_id);
        }
        setDataLoaded(true);
    }

    const formatPayload = (form: any) => {
        const formattedDate = new Date(form.birthday).toISOString().split('T')[0];
        const data = {
            fullname: form.fullname,
            specialty: form.speciality,
            email: form.email,
            document: form.document,
            indentity_number: form.indentity_number,
            org_exp: form.org_exp,
            uf_exp: form.uf_exp,
            nationality: form.nationality,
            birthday: formattedDate,
            document_company: form.document_company,
            social_name: form.social_name,
            fantasy_name: form.fantasy_name,
            phone: form.phone,
            avatar: form.avatar,
        }
        return data;
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: dataForm,
        onSubmit: (values) => {
            const payload = formatPayload(values);
            if (id) {
                updateProf(id, payload).then((r) => {
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

            } else {
                postProf(payload).then((r) => {
                    if (r.id) {
                        setSnackbarError(false)
                        setSnackbarMessage('Cadastro realizado com sucesso!');
                        setSnackbarOpen(true);
                        navigate("/professionals/" + r.id);
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

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleImageChange = (img: any) => {
        if (id) {
            const payload = {
                file: img
            }
            uploadAvatarProf(id, payload).then((r) => {
                if (r.id) {
                    setSnackbarError(false)
                    setSnackbarMessage('Imagem atualizada com sucesso!');
                    setSnackbarOpen(true);
                    navigate("/professionals/" + r.id);
                    window.location.reload();
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

    const loadAvatar = (id: string) => {
        return getUserAvatarId(id);
    }

    const initialEditValues = (values: any) => {
        const initial = {
            fullname: values.fullname,
            speciality: values.specialty_instructor_id,
            email: values.email,
            document: values.document,
            indentity_number: values.indentity_number,
            org_exp: values.org_exp,
            uf_exp: values.uf_exp,
            nationality: values.nationality,
            birthday: values.birthday,
            document_company: values.document_company,
            social_name: values.social_name,
            fantasy_name: values.fantasy_name,
            phone: values.phone,
            avatar: values.avatar,
        }
        return initial;
    }

    useEffect(() => {
        professional();
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
                            <Grid item xs={10}>
                                <Box sx={{
                                    width: 1250,
                                    height: 250,
                                }}>
                                    <Grid container>
                                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{ m: 1 }}>
                                            <TextField
                                                id="fullname"
                                                name="fullname"
                                                label="Nome"
                                                size="small"
                                                value={formik.values.fullname}
                                                onChange={formik.handleChange}
                                                fullWidth
                                                margin="normal"
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xl={5} lg={5} md={5} sm={12} xs={12} sx={{ m: 1 }}>
                                            {id ? (
                                                <TextField
                                                    id="email"
                                                    name="email"
                                                    label="E-mail"
                                                    size="small"
                                                    type="email"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    fullWidth
                                                    autoFocus
                                                    disabled
                                                />
                                            ) : (
                                                <TextField
                                                    id="email"
                                                    name="email"
                                                    label="E-mail"
                                                    size="small"
                                                    type="email"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    fullWidth
                                                    autoFocus
                                                    required
                                                />
                                            )}

                                        </Grid>
                                        <Grid item xl={2} lg={2} md={2} sm={12} xs={12} sx={{ m: 1 }}>
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
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1} sx={{ m: 1 }} >
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="WhatsApp" />
                                        </Grid>

                                    </Grid>
                                    <Grid container>
                                        <Grid item xl={3} lg={3} md={3} sm={12} xs={12} sx={{ m: 1 }}>
                                            <DatePicker
                                                label="Data de Nascimento"
                                                value={dayjs(formik.values.birthday)}
                                                format="DD/MM/YYYY"
                                                onChange={(value) => {
                                                    formik.setFieldValue('birthday', value);
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xl={3} lg={3} md={3} sm={12} xs={12} sx={{ m: 1 }}>
                                            {id ? (
                                                <TextField
                                                    id="document"
                                                    name="document"
                                                    label="Documento"
                                                    size="small"
                                                    value={formik.values.document}
                                                    onChange={formik.handleChange}
                                                    autoFocus
                                                    disabled
                                                    fullWidth
                                                />
                                            ) : (
                                                <TextField
                                                    id="document"
                                                    name="document"
                                                    label="Documento"
                                                    size="small"
                                                    value={formik.values.document}
                                                    onChange={formik.handleChange}
                                                    autoFocus
                                                    required
                                                    fullWidth
                                                    InputProps={{ inputComponent: DocumentMask }}
                                                />
                                            )}

                                        </Grid>
                                        <Grid item xl={2} lg={2} md={2} sm={12} xs={12} sx={{ m: 1 }}>
                                            <TextField
                                                id="indentity_number"
                                                name="indentity_number"
                                                label="RG"
                                                size="small"
                                                value={formik.values.indentity_number}
                                                onChange={formik.handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={1} sm={12} xs={12} sx={{ m: 1 }}>
                                            <TextField
                                                id="org_exp"
                                                name="org_exp"
                                                label="Orgão Exp"
                                                size="small"
                                                value={formik.values.org_exp}
                                                onChange={formik.handleChange}
                                                fullWidth
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={1} sm={12} xs={12} sx={{ m: 1 }}>
                                            <TextField
                                                id="uf_exp"
                                                name="uf_exp"
                                                label="UF Exp"
                                                size="small"
                                                value={formik.values.uf_exp}
                                                onChange={formik.handleChange}
                                                fullWidth
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xl={2} lg={2} md={2} sm={12} xs={12} sx={{ m: 1 }}>
                                            <TextField
                                                id="nationality"
                                                name="nationality"
                                                label="Nacionalidade"
                                                size="small"
                                                value={formik.values.nationality}
                                                onChange={formik.handleChange}
                                                autoFocus
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={2} alignContent="center">
                                <Box sx={{
                                    width: 250,
                                    height: 250,
                                }}
                                >
                                    {id ? (
                                        <Grid container alignItems="center" justifyContent="center">
                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                <Avatar
                                                    src={loadAvatar(userId)}
                                                    alt="Avatar"
                                                    onChange={handleImageChange}
                                                    // variant="circle"
                                                    style={{ width: "150px", height: "150px" }}
                                                    emptyLabel={"Escolha uma imagem..."}
                                                    changeLabel="Alterar imagem"
                                                />
                                            </Grid>
                                        </Grid>

                                    ) : (
                                        <Grid container alignItems="center" justifyContent="center">
                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                <IconButton>
                                                    <AccountBox
                                                        color="info"
                                                        sx={{
                                                            width: 200,
                                                            height: 200,
                                                        }}
                                                    />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Box sx={{
                            width: 30,
                            height: 40,

                        }}
                        ></Box>

                        <Grid container>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4} sx={{ m: 1 }}>
                                <TextField
                                    id="document_company"
                                    name="document_company"
                                    label="CNPJ"
                                    size="small"
                                    value={formik.values.document_company}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    autoFocus
                                    required
                                    InputProps={{ inputComponent: CompanyMask }}
                                />
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4} sx={{ m: 1 }}>
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
                            </Grid>
                            <Grid item xl={3} lg={3} md={3} sm={3} xs={3} sx={{ m: 1 }}>
                                <TextField
                                    id="fantasy_name"
                                    name="fantasy_name"
                                    label="Fantasia"
                                    size="small"
                                    value={formik.values.fantasy_name}
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