import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as React from "react"
import IProcedure from "../../types/procedure.type";
import { ReplyOutlined, Save } from "@mui/icons-material";
import { addEventsProcedures } from "../../services/event.service";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 680,
    height: 230,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

interface ModalSelectProps {
    isOpen: boolean;
    schedule_id: string,
    procedures: IProcedure[];
    onClose: () => void;
    onSnackbarOpen: () => void;
    getSkill: () => void;
}

export const ProcedureSelection: React.FC<ModalSelectProps> = ({ isOpen, schedule_id, procedures, onClose, onSnackbarOpen, getSkill }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const initial = {
        procedure_id: ''
    }

    const sender = () => {
        formik.handleSubmit();
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initial,
        onSubmit: (values) => {
            console.log(values);
            onSnackbarOpen();
            addEventsProcedures(schedule_id, values);
            getSkill();
            onClose();
        }
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Selecione o objetivo
                    </Typography>
                    <Grid item sx={{ m: 2 }}>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 590 }}>
                                <InputLabel>Objetivo</InputLabel>
                                <Select
                                    label="Objetivo"
                                    id="procedure_id"
                                    name="procedure_id"
                                    value={formik.values.procedure_id}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    required
                                >
                                    {
                                        procedures.map((procedure) => {
                                            return <MenuItem key={procedure.id} value={procedure.id}>
                                                {procedure.name}
                                            </MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item sx={{ m: 2 }}>
                        <Grid container alignItems="right" justifyContent="right">
                            <Grid item alignContent="center" xl={2} lg={2} md={2} sm={2} xs={2}>
                                <IconButton
                                    title="Voltar"
                                    onClick={onClose}
                                >
                                    <ReplyOutlined />
                                </IconButton>
                            </Grid>
                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1} mr={1}>
                                <IconButton
                                    onClick={handleOpen}
                                    title="Savar"
                                >
                                    <Save />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Confirmação de alteração</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Esta ação adicionará o objetivo de todas as agendas relacionadas do cliente
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancelar
                            </Button>
                            <Button
                                onClick={sender}
                                color="primary"
                            >
                                Sim
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </form>
        </Modal>
    );
}