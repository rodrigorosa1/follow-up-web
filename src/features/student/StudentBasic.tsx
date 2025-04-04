import { Box, FormControl, Grid, IconButton, InputLabel, TextField, Snackbar, Alert } from "@mui/material";
import { useFormik } from "formik";
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getStudentsId, updateStudent, postStudent, uploadAvatarStudent } from "../../services/student.service";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ReplyOutlined, Save, AccountBox, } from "@mui/icons-material";
import dayjs from 'dayjs';
import { DocumentMask } from "../../components/masks/InputMask";
import { Avatar } from "@files-ui/react";
import { getStudentAvatarId } from "../../services/avatar.service";
import { PageLoad } from "../../components/animations/PageLoad";

export const StudentBasic = () => {
    const initial = {
        fullname: '',
        allergy: '',
        genere: '',
        document: '',
        indentity_number: '',
        org_exp: '',
        uf_exp: '',
        nationality: '',
        birthday: '',
        avatar: '',
        informations: '',
    }

    let navigate: NavigateFunction = useNavigate();

    const { id } = useParams();
    const [dataForm, setDataForm] = useState(initial);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarError, setSnackbarError] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const historyBack = () => {
        navigate("/students");
    }

    const student = async () => {
        if (id) {
            const std = await getStudentsId(id);
            const initial = initialEditValues(std);
            setDataForm(initial);
        }
        setDataLoaded(true);
    }

    const formatPayload = (form: any) => {
        const formattedDate = new Date(form.birthday).toISOString().split('T')[0];
        const data = {
            fullname: form.fullname,
            allergy: form.allergy,
            genere: form.genere,
            document: form.document,
            indentity_number: form.indentity_number,
            org_exp: form.org_exp,
            uf_exp: form.uf_exp,
            nationality: form.nationality,
            birthday: formattedDate,
            informations: form.informations,
            avatar: form.avatar
        }
        return data;
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: dataForm,
        onSubmit: (values) => {
            const payload = formatPayload(values);
            if (id) {
                updateStudent(id, payload).then((r) => {
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
                postStudent(payload).then((r) => {
                    if (r.id) {
                        setSnackbarError(false)
                        setSnackbarMessage('Cadastro realizado com sucesso!');
                        setSnackbarOpen(true);
                        navigate("/students/" + r.id);
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
            uploadAvatarStudent(id, payload).then((r) => {
                if (r.id) {
                    setSnackbarError(false)
                    setSnackbarMessage('Imagem atualizada com sucesso!');
                    setSnackbarOpen(true);
                    navigate("/students/" + r.id);
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
        return getStudentAvatarId(id);
    }

    const initialEditValues = (values: any) => {
        const initial = {
            fullname: values.fullname,
            genere: values.genere,
            allergy: values.allergy,
            document: values.document,
            indentity_number: values.indentity_number,
            org_exp: values.org_exp,
            uf_exp: values.uf_exp,
            nationality: values.nationality,
            birthday: values.birthday,
            avatar: values.avatar,
            informations: values.informations,
        }
        return initial;
    }

    useEffect(() => {
        student();
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {!dataLoaded ? (
                <PageLoad />
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
                                        <Grid item xl={8} lg={8} md={8} sm={12} xs={12} sx={{ m: 1 }}>
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
                                        <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                                            <FormControl sx={{ m: 3, minWidth: 150 }}>
                                                <InputLabel>Sexo</InputLabel>
                                                <Select
                                                    required
                                                    label="Sexo"
                                                    id="genere"
                                                    name="genere"
                                                    value={formik.values.genere}
                                                    onChange={formik.handleChange}
                                                    size="small"
                                                >
                                                    <MenuItem value={'FEMININO'}>Feminino</MenuItem>
                                                    <MenuItem value={'MASCULINO'}>Masculino</MenuItem>
                                                    <MenuItem value={'OUTRO'}>Outros</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={3} sm={12} xs={12} sx={{ m: 1 }}>
                                            <TextField
                                                id="allergy"
                                                name="allergy"
                                                label="Alergias"
                                                size="small"
                                                value={formik.values.allergy}
                                                onChange={formik.handleChange}
                                                fullWidth
                                                margin="normal"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xl={2} lg={2} md={2} sm={12} xs={12} sx={{ m: 1 }}>
                                            <TextField
                                                id="document"
                                                name="document"
                                                label="Documento"
                                                size="small"
                                                value={formik.values.document}
                                                onChange={formik.handleChange}
                                                autoFocus
                                                fullWidth
                                                InputProps={{ inputComponent: DocumentMask }}
                                            />
                                        </Grid>
                                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} sx={{ m: 1 }}>
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
                                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1} sx={{ m: 1 }}>
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
                                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1} sx={{ m: 1 }}>
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
                                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} sx={{ m: 1 }}>
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
                                                    src={loadAvatar(id)}
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
                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    id="informations"
                                    name="informations"
                                    label="Informações Adicionais"
                                    multiline
                                    size="small"
                                    rows={2}
                                    value={formik.values.informations}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Box sx={{
                            width: 30,
                            height: 40,

                        }}
                        ></Box>
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