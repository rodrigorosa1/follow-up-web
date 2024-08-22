import { Box, Typography, FormControl, Grid, IconButton, TextField, Modal } from "@mui/material";
import { useFormik } from "formik";
import { ReplyOutlined, Save } from "@mui/icons-material";
import { postSpecialty, updateSpecialty } from "../../services/configuration.service";
import Ispecialty from "../../types/specialty.type";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ModalSpecialtyProps {
    specialty: Ispecialty | null;
    isOpen: boolean;
    onClose: () => void;
    onSnackbarOpen: () => void;
}

export const ModalSpecialty: React.FC<ModalSpecialtyProps> = ({ specialty, isOpen, onClose, onSnackbarOpen }) => {
    const initial: Ispecialty = specialty || { specialty: '' };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initial,
        onSubmit: (values) => {
            if (specialty?.id) {
                updateSpecialty(specialty.id, values);
            } else {
                postSpecialty(values);
            }
            onSnackbarOpen();
            onClose();
        }
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {specialty ? 'Edição da especialidade' : 'Nome da nova especialidade'}
                    </Typography>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ mr: 2 }}>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <TextField
                                    id="specialty"
                                    name="specialty"
                                    label="Especialidade"
                                    size="small"
                                    value={formik.values.specialty}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    required
                                />
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