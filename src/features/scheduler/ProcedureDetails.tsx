import * as React from "react"
import { Box, Typography, FormControl, Grid, IconButton, TextField, Modal } from "@mui/material";
import { useFormik } from "formik";
import { ReplyOutlined, Save, } from "@mui/icons-material";
import IProcedure from "../../types/procedure.type";
import { updateEventProcedures } from "../../services/event.service";
import * as Yup from 'yup';

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

interface ModalProcedureProps {
    procedure: IProcedure | null;
    isOpen: boolean;
    id: any;
    onClose: () => void;
    onSnackbarOpen: () => void;
    getSkill: () => void;
}

export const ProcedureDetails: React.FC<ModalProcedureProps> = ({ procedure, isOpen, onClose, id, onSnackbarOpen, getSkill }) => {
    const initial: IProcedure = procedure || {
        tries: '',
        skill_id: '',
        time: '',
        goal: '',
        period: '',
        name: '',
        objective: '',
        stimulus: '',
        answer: '',
        consequence: '',
        materials: '',
        help: '',
        student_id: '',
    }

    const validationSchema = Yup.object().shape({
        tries: Yup.number().positive('Deve ser um número positivo').required('Campo obrigatório').min(1, 'Deve ser maior que zero'),
        goal: Yup.number().positive('Deve ser um número positivo').required('Campo obrigatório').min(1, 'Deve ser maior que zero'),
        period: Yup.number().positive('Deve ser um número positivo').required('Campo obrigatório').min(1, 'Deve ser maior que zero')
    });


    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: initial,
        onSubmit: (values) => {
            if (procedure?.id) {
                updateEventProcedures(procedure.id, values);
            }
            onSnackbarOpen();
            onClose();
            getSkill();
        }
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Dados do Objetivo
                    </Typography>
                    <Grid item>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <TextField
                                    id="tries"
                                    name="tries"
                                    label="Tentativas"
                                    size="small"
                                    type="number"
                                    value={formik.values.tries}
                                    onChange={formik.handleChange}
                                    required
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <TextField
                                    id="goal"
                                    name="goal"
                                    label="Meta %"
                                    size="small"
                                    type="number"
                                    value={formik.values.goal}
                                    onChange={formik.handleChange}
                                    required
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <TextField
                                    id="period"
                                    name="period"
                                    label="Blocos Consecultivos"
                                    size="small"
                                    type="number"
                                    value={formik.values.period}
                                    onChange={formik.handleChange}
                                    required
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 850 }}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Objetivo"
                                    size="small"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    required
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 850 }}>
                                <TextField
                                    id="objective"
                                    name="objective"
                                    label="Descrição"
                                    required
                                    multiline
                                    size="small"
                                    rows={2}
                                    value={formik.values.objective}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />

                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 850 }}>
                                <TextField
                                    id="stimulus"
                                    name="stimulus"
                                    label="Estimulo"
                                    required
                                    multiline
                                    size="small"
                                    rows={2}
                                    value={formik.values.stimulus}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 420 }}>
                                <TextField
                                    id="answer"
                                    name="answer"
                                    label="Respostas"
                                    multiline
                                    size="small"
                                    rows={2}
                                    value={formik.values.answer}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 420 }}>
                                <TextField
                                    id="consequence"
                                    name="consequence"
                                    label="Consequenica"
                                    multiline
                                    size="small"
                                    rows={2}
                                    value={formik.values.consequence}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 420 }}>
                                <TextField
                                    id="materials"
                                    name="materials"
                                    label="Materiais"
                                    multiline
                                    size="small"
                                    rows={2}
                                    value={formik.values.materials}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />

                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 420 }}>
                                <TextField
                                    id="help"
                                    name="help"
                                    label="Tipo de ajuda"
                                    multiline
                                    size="small"
                                    rows={2}
                                    value={formik.values.help}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />

                            </FormControl>
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
        </Modal>

    );

}