import * as React from "react";
import { Box, Typography, FormControl, Grid, IconButton, TextField, Modal } from "@mui/material";
import { useFormik } from "formik";
import { ReplyOutlined, Save } from "@mui/icons-material";
import ISpecialty from "../../types/specialty.type";
import { postSpecialty, updateSpecialty } from "../../services/specialty.service";
import { formatCurrency, parseCurrencyToFloat } from "../../helpers/currency";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ModalSpecialtyProps {
    specialty?: ISpecialty | null;
    isOpen: boolean;
    onClose: () => void;
    onSnackbarOpen: () => void;
    listSpecialties: () => void;
}

export const ModalSpecialty: React.FC<ModalSpecialtyProps> = ({ specialty, isOpen, onClose, onSnackbarOpen, listSpecialties }) => {
    const initial = {
        name: specialty?.name ?? '',
        description: specialty?.description ?? '',
        value_hour: formatCurrency(specialty?.value_hour),
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initial,
        onSubmit: (values) => {
            const formattedValues = {
                ...values,
                value_hour: parseCurrencyToFloat(values.value_hour),
            };
            if (specialty?.id) {
                updateSpecialty(specialty.id, formattedValues);
            } else {
                postSpecialty(formattedValues);
            }
            onSnackbarOpen();
            onClose();
            listSpecialties();
        }
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {specialty ? 'Edição da especialidade' : 'Nome da nova especialidade'}
                    </Typography>
                    <Grid item>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 450 }}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Especialidade"
                                    size="small"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    required
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ mr: 2 }}>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 450 }}>
                                <TextField
                                    id="description"
                                    name="description"
                                    label="Descrição"
                                    size="small"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ mr: 2 }}>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 450 }}>
                                <TextField
                                    id="value_hour"
                                    name="value_hour"
                                    label="Valor Hora (R$)"
                                    size="small"
                                    value={formik.values.value_hour}
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