
import { Box, Grid, IconButton, TextField, Modal, Stack, FormControl, Alert, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import { FindReplace, ReplyOutlined, Save } from "@mui/icons-material";
import { CepMask, CompanyMask, PhoneMask } from "../../components/masks/InputMask";
import { findiCep } from "../../services/external.service";
import { CompanyStatusEnum } from "../../helpers/Enums/company-status.enum";
import { createCompany, updateCompany } from "../../services/company.service";
import ICompany from "../../types/company.type";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 950,
    height: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
};

interface ModalCompanyProps {
    company: ICompany | null;
    isOpen: boolean;
    companiesList: () => void;
    onClose: () => void;
    onSnackbarOpen: () => void;
}

export const ModalCompany: React.FC<ModalCompanyProps> = ({ company, isOpen, companiesList, onClose, onSnackbarOpen }) => {
    const initial: ICompany = company || {
        social_name: '',
        fantasy_name: '',
        document: '',
        municipal_registration: '',
        address: '',
        number_address: null,
        complement: '',
        zip_code: '',
        district: '',
        city: '',
        state: '',
        email: '',
        phone: '',
        city_code: '',
        aliquot: null,
        item_list_service: '',
        municipal_tax_code: '',
        iss_retained: false,
        licences_n: null,
        api_nfes_token: '',
        status: CompanyStatusEnum.ACTIVE
    };

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
            if (company?.id) {
                updateCompany(company.id, values);
            } else {
                createCompany(values);
            }
            onSnackbarOpen();
            companiesList();
            onClose();
        }
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
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
                                    Informações de Licença Follow-up
                                </Alert>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container sx={{ m: 1 }}>
                            <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                                        <TextField
                                            id="licences_n"
                                            name="licences_n"
                                            label="Licenças"
                                            size="small"
                                            value={formik.values.licences_n}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            autoFocus
                                            required
                                        />
                                    </FormControl>
                                </Stack>
                            </Grid>
                            {company && (
                                <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                label="Status"
                                                id="status"
                                                name="status"
                                                value={formik.values.status}
                                                onChange={formik.handleChange}
                                                fullWidth
                                                size="small"
                                            >
                                                <MenuItem value={CompanyStatusEnum.ACTIVE}>ATIVA</MenuItem>
                                                <MenuItem value={CompanyStatusEnum.IN_ANALYSIS}>EM ANÁLISE</MenuItem>
                                                <MenuItem value={CompanyStatusEnum.BLOCKED}>BLOQUEADA</MenuItem>
                                                <MenuItem value={CompanyStatusEnum.INACTIVE}>INATIVA</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="info">
                                    Informações Técnicas para NFS
                                </Alert>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container sx={{ m: 1 }}>
                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                                        <TextField
                                            id="city_code"
                                            name="city_code"
                                            label="Cod. da Cidade"
                                            size="small"
                                            value={formik.values.city_code}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            autoFocus
                                        />
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                                        <TextField
                                            id="municipal_registration"
                                            name="municipal_registration"
                                            label="Insc. Municipal"
                                            size="small"
                                            value={formik.values.municipal_registration}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            autoFocus
                                        />
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                                        <TextField
                                            id="api_nfes_token"
                                            name="api_nfes_token"
                                            label="API Token"
                                            size="small"
                                            value={formik.values.api_nfes_token}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            autoFocus
                                        />
                                    </FormControl>
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
                                        <InputLabel>ISS Retido</InputLabel>
                                        <Select
                                            label="ISS Retido"
                                            id="iss_retained"
                                            name="iss_retained"
                                            value={formik.values.iss_retained}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            size="small"
                                        >
                                            <MenuItem value="false">Não</MenuItem>
                                            <MenuItem value="true">Sim</MenuItem>
                                        </Select>
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