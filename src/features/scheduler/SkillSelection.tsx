import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as React from "react"
import { ReplyOutlined, Save } from "@mui/icons-material";
import { addEventsSkill } from "../../services/event.service";
import ISkill from "../../types/skill.type";

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
    skills: ISkill[];
    onClose: () => void;
    onSnackbarOpen: () => void;
    onSnackbarMessage: (message: string) => void;
    getSkill: () => void;
}

export const SkillSelection: React.FC<ModalSelectProps> = ({ isOpen, schedule_id, skills, onClose, onSnackbarOpen, onSnackbarMessage, getSkill }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const initial = {
        skill_id: ''
    }

    const sender = () => {
        formik.handleSubmit();
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initial,
        onSubmit: (values) => {
            onSnackbarMessage('Habilidade adicionada');
            onSnackbarOpen();
            addEventsSkill(schedule_id, values);
            getSkill();
            onClose();
            handleClose();
        }
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Selecione a Habilidade
                    </Typography>
                    <Grid item sx={{ m: 2 }}>
                        <Grid container>
                            <FormControl sx={{ m: 1, minWidth: 590 }}>
                                <InputLabel>Habilidade</InputLabel>
                                <Select
                                    label="Habilidade"
                                    id="skill_id"
                                    name="skill_id"
                                    value={formik.values.skill_id}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    required
                                >
                                    {
                                        skills.map((skill) => {
                                            return <MenuItem key={skill.id} value={skill.id}>
                                                {skill.name}
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
                                Esta ação adicionará a habilidade em todas as agendas relacionadas do cliente
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