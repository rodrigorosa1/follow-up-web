import * as React from "react";
import { useFormik } from "formik";
import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import { ReplyOutlined, Save } from "@mui/icons-material";
import { changeBillingType } from "../../../services/student.service";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    m: 2
};

interface ModalBillingTypeProps {
    contractor_id: string,
    type: string;
    isOpen: boolean;
    onClose: () => void;
    onSnackbarOpen: () => void;
    onSnackbarError: (active: boolean) => void;
    onSnackbarMessage: (message: string) => void;
    startResume: () => void;
}

export const BillingTypeChange: React.FC<ModalBillingTypeProps> = ({ contractor_id, type, isOpen, onClose, onSnackbarOpen, onSnackbarError, onSnackbarMessage, startResume }) => {
    const initial = {
        category: type,
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initial,
        onSubmit: (values) => {
            changeBillingType(contractor_id, values).then((r) => {
                if (r.id) {
                    onSnackbarError(false);
                    onSnackbarOpen();
                    onClose();
                    startResume();
                    return;
                }
                onSnackbarMessage(r.response.data.detail);
                onSnackbarError(true);
                onSnackbarOpen();
                onClose();
            }).catch((e) => {
                console.error(e);
            });
            onSnackbarOpen();
            onClose();
            startResume();
        }
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Tipo de Faturamento
                    </Typography>
                    <Grid item sx={{ mr: 2 }}>
                        <Grid container>
                            <FormControl sx={{ m: 2, minWidth: 450 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    label="Tipo de Faturamento"
                                    id="category"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    required
                                    size="small"
                                >
                                    <MenuItem value={'RESPONSÁVEL'} selected>RESPONSÁVEL</MenuItem>
                                    <MenuItem value={'CONVÊNIO'}>CONVÊNIO</MenuItem>
                                </Select>
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
