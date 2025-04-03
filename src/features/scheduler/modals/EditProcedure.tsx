import * as React from "react";
import { TextField, Grid, FormControl, IconButton, Modal, Box, Typography } from "@mui/material";
import IProcedure from "../../../types/procedure.type";
import { ReplyOutlined, Save } from "@mui/icons-material";

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

interface EditProcedureProps {
    open: boolean;
    onClose: () => void;
    procedure: IProcedure | null;
    onSave: (updatedProcedure: IProcedure) => void;
    onSnackbarOpen: () => void;
}


export const EditProcedure: React.FC<EditProcedureProps> = ({ open, onClose, procedure, onSave, onSnackbarOpen }) => {
    const [formData, setFormData] = React.useState<IProcedure | null>(procedure);

    React.useEffect(() => {
        setFormData(procedure);
    }, [procedure]);

    if (!formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
        onSnackbarOpen();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Dados do Objetivo
                </Typography>
                <Grid item sx={{
                    marginTop: 5
                }}>
                    <Grid container>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <TextField
                                id="tries"
                                name="tries"
                                label="Tentativas"
                                size="small"
                                type="number"
                                value={formData.tries}
                                onChange={handleChange}
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
                                value={formData.goal}
                                onChange={handleChange}
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
                                value={formData.period}
                                onChange={handleChange}
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
                                value={formData.name}
                                onChange={handleChange}
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
                                value={formData.objective}
                                onChange={handleChange}
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
                                value={formData.stimulus}
                                onChange={handleChange}
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
                                value={formData.answer}
                                onChange={handleChange}
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
                                value={formData.consequence}
                                onChange={handleChange}
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
                                value={formData.materials}
                                onChange={handleChange}
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
                                value={formData.help}
                                onChange={handleChange}
                                fullWidth
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid item
                    sx={{
                        marginTop: 5
                    }}
                >
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
                                onClick={handleSave}
                            >
                                <Save />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};
