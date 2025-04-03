import * as React from "react"
import { useFormik } from "formik";
import { IHealthPlan } from "../../types/healthPlan.type";
import { Box, FormControl, Grid, IconButton, Modal, Stack, TextField, Typography } from "@mui/material";
import { FindReplace, ReplyOutlined, Save } from "@mui/icons-material";
import { CepMask, CompanyMask, PhoneMask } from "../../components/masks/InputMask";
import { findiCep } from "../../services/external.service";
import { postHealthPlan, updateHealthPlan } from "../../services/healhPlan.service";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 650,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ModalHealthPlanProps {
    healthPlan: IHealthPlan | null;
    isOpen: boolean;
    onClose: () => void;
    onSnackbarOpen: () => void;
    studentPlan: () => void;
}

export const ModalStudentHealthPlan: React.FC<ModalHealthPlanProps> = ({ healthPlan, isOpen, onClose, onSnackbarOpen, studentPlan }) => {
    const initial = healthPlan || {
        social_name: '',
        fantasy_name: '',
        document: '',
        phone: '',
        email: '',
        zip_code: '',
        address: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        state: '',
        country: ''
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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initial,
        onSubmit: (values) => {
            if (healthPlan?.id) {
                updateHealthPlan(healthPlan.id, values);
            } else {
                postHealthPlan(values)
            }
            onSnackbarOpen();
            onClose();
            studentPlan();
        },
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ p: 2,}}>
                        Dados do Plano de Saúde
                    </Typography>
                    <Grid item sx={{ mr: 2 }}>
                        <Grid container>
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
                    </Grid>
                    <Grid item>
                        <Grid container>
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
                    <Grid item sx={{ mr: 2, p: 4 }}>
                        <Grid container alignItems="right" justifyContent="right">
                            <Grid item alignContent="center" xl={1} lg={1} md={1} sm={1} xs={1}>
                                <IconButton
                                    title="Voltar"
                                    onClick={onClose}
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
                    </Grid>
                </Box>
            </form>
        </Modal>

    );




}