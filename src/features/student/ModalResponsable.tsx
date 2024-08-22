import { Box, Typography, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputLabel, TextField, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import Modal from '@mui/material/Modal';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ReplyOutlined, Save, } from "@mui/icons-material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from '@mui/material/Select';
import { DocumentMask, PhoneMask } from "../../components/masks/InputMask";
import { postStudentsResponsable, upStudentsResponsable } from "../../services/student.service";
import { IResponsable } from "../../types/student.type";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ModalUserProps {
    responsable: IResponsable | null;
    isOpen: boolean;
    id: any;
    getResponsables: () => void;
    onClose: () => void;
    onSnackbarOpen: () => void;
}

export const ModalResponsable: React.FC<ModalUserProps> = ({ responsable, isOpen, id, getResponsables, onClose, onSnackbarOpen }) => {
    const initial = responsable || {
        fullname: '',
        bond: '',
        email: '',
        document: '',
        indentity_number: '',
        org_exp: '',
        uf_exp: '',
        nationality: '',
        phone: '',
        main: '',
    }

    const formatPayload = (form: any) => {
        const data = {
            fullname: form.fullname,
            bond: form.bond,
            email: form.email,
            document: form.document,
            indentity_number: form.indentity_number,
            org_exp: form.org_exp,
            uf_exp: form.uf_exp,
            nationality: form.nationality,
            phone: form.phone,
            main: form.avatar,
        }
        return data;
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initial,
        onSubmit: (values) => {
            const payload = formatPayload(values);
            if (responsable?.id) {
                upStudentsResponsable(responsable.id, payload);
            } else {
                postStudentsResponsable(id, payload);
            }
            getResponsables();
            onSnackbarOpen();
            onClose();
        },
    });


    return (
        <Modal open={isOpen} onClose={onClose}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Dados Responsável
                        </Typography>
                        <Grid item>
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
                                <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                                    <FormControl sx={{ m: 3, minWidth: 150 }}>
                                        <InputLabel>Vínculo</InputLabel>
                                        <Select
                                            required
                                            label="Vínculo"
                                            id="bond"
                                            name="bond"
                                            value={formik.values.bond}
                                            onChange={formik.handleChange}
                                            size="small"
                                        >
                                            <MenuItem value={'PAI'}>Pai</MenuItem>
                                            <MenuItem value={'MÃE'}>Mãe</MenuItem>
                                            <MenuItem value={'AVÓS'}>Avós</MenuItem>
                                            <MenuItem value={'TIOS'}>Tios</MenuItem>
                                            <MenuItem value={'OUTROS'}>Outro</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container>
                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{ m: 1 }}>
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
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={12} xs={12} sx={{ m: 1 }}>
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
                        </Grid>
                        <Grid item>
                            <Grid container>
                                <Grid item xl={3} lg={3} md={3} sm={12} xs={12} sx={{ m: 1 }}>
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
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={12} xs={12} sx={{ m: 1 }}>
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
                        </Grid>
                        <Grid item>
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
            </LocalizationProvider>
        </Modal>
    );
}