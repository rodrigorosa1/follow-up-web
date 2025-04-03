import * as React from "react";
import IProcedure from "../../../types/procedure.type";
import { Box, Button, Card, CardHeader, Checkbox, Divider, Grid, List, ListItemIcon, ListItemText, Modal, Stack, TextField, Alert, ListItem, IconButton } from "@mui/material";
import { EditProcedure } from "./EditProcedure";
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

interface ModalProcedureScheduleProps {
    isOpen: boolean;
    allProcedures: IProcedure[];
    selectedProcedures: IProcedure[]
    selectedSlot: any;
    onClose: () => void;
    onSaveProcedures: (slotIndex: number, procedures: IProcedure[], skillId: string) => void;
    onSnackbarOpen: () => void;
}

export const ProcedureSchedule: React.FC<ModalProcedureScheduleProps> = ({ isOpen, onClose, allProcedures, selectedProcedures, selectedSlot, onSaveProcedures, onSnackbarOpen }) => {
    const [procedures, setProcedures] = React.useState<readonly IProcedure[]>([]);
    const [proceduresSelected, setProceduresSelected] = React.useState<IProcedure[]>([]);
    const [checked, setChecked] = React.useState<readonly IProcedure[]>([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [selectedProcedure, setSelectedProcedure] = React.useState<IProcedure | null>(null);

    React.useEffect(() => {
        if (isOpen) {
            setProceduresSelected(selectedProcedures);
            setProcedures(allProcedures.filter(
                (procedure) => !selectedProcedures.some((p) => p.id === procedure.id)
            ));
        }
    }, [isOpen, allProcedures, selectedProcedures]);

    const handleToggle = (value: IProcedure) => () => {
        const currentIndex = checked.findIndex((item) => item.id === value.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleCheckedRight = () => {
        const newSelected = checked.filter((item) => procedures.some((p) => p.id === item.id));
        setProceduresSelected([...proceduresSelected, ...newSelected]);
        setProcedures(procedures.filter((p) => !newSelected.some((item) => item.id === p.id)));
        setChecked([]);
    };

    const handleCheckedLeft = () => {
        const newAvailable = checked.filter((item) => proceduresSelected.some((p) => p.id === item.id));
        setProcedures([...procedures, ...newAvailable]);
        setProceduresSelected(proceduresSelected.filter((p) => !newAvailable.some((item) => item.id === p.id)));
        setChecked([]);
    };

    const handleOpenEditModal = (procedure: IProcedure) => {
        setSelectedProcedure(procedure);
        setOpenEditModal(true);
    };

    const handleSaveAndClose = () => {
        onSaveProcedures(selectedSlot.index, proceduresSelected, selectedSlot.skillId);
        onSnackbarOpen();
        onClose();
    };

    const renderProcedureList = (title: string, items: readonly IProcedure[], isSelectedList = false) => {
        const filteredItems = items.filter(
            (item) =>
                item.objective.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.skill?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <Card>
                <CardHeader
                    sx={{ px: 2, py: 1 }}
                    avatar={
                        <Checkbox
                            checked={checked.length > 0 && checked.every((item) => items.some((p) => p.id === item.id))}
                            indeterminate={checked.length > 0 && checked.some((item) => items.some((p) => p.id === item.id))}
                            onClick={() => setChecked(checked.length === items.length ? [] : items)}
                        />
                    }
                    title={title}
                    subheader={`${checked.length}/${items.length} selecionados`}
                />
                <Divider />
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ px: 2, py: 1 }}
                />
                <List
                    sx={{
                        width: 350,
                        height: 350,
                        bgcolor: "background.paper",
                        overflow: "auto",
                    }}
                    dense
                    component="div"
                    role="list"
                >
                    {filteredItems.map((value) => (
                        <ListItem key={value.id} role="listitem">
                            <ListItemIcon>
                                <Checkbox checked={checked.some((item) => item.id === value.id)} onClick={handleToggle(value)} />
                            </ListItemIcon>
                            <ListItemText primary={value.objective} secondary={value.skill?.name} />
                            {isSelectedList && (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleOpenEditModal(value)}
                                    sx={{ ml: 2 }}
                                >
                                    Editar
                                </Button>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Card>
        );
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="info">
                                Selecione os objetivos.
                            </Alert>
                        </Stack>
                    </Grid>
                    <Grid item sx={{ marginTop: 2 }}>
                        <Stack sx={{ width: "100%" }} spacing={2}>
                            <Grid container spacing={2} justifyContent="center" alignItems="center">
                                <Grid item>{renderProcedureList("Objetivos", procedures)}</Grid>
                                <Grid item>
                                    <Grid container direction="column" alignItems="center">
                                        <Button
                                            sx={{ my: 0.5 }}
                                            variant="outlined"
                                            size="small"
                                            onClick={handleCheckedRight}
                                            disabled={checked.every((item) => !procedures.some((p) => p.id === item.id))}
                                            aria-label="mover para direita"
                                        >
                                            &gt;
                                        </Button>
                                        <Button
                                            sx={{ my: 0.5 }}
                                            variant="outlined"
                                            size="small"
                                            onClick={handleCheckedLeft}
                                            disabled={checked.every((item) => !proceduresSelected.some((p) => p.id === item.id))}
                                            aria-label="mover para esquerda"
                                        >
                                            &lt;
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>{renderProcedureList("Selecionados", proceduresSelected, true)}</Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                    <Grid>
                        <EditProcedure
                            open={openEditModal}
                            onClose={() => setOpenEditModal(false)}
                            procedure={selectedProcedure}
                            onSave={(updatedProcedure) => {
                                setProceduresSelected((prev) =>
                                    prev.map((p) => (p.id === updatedProcedure.id ? updatedProcedure : p))
                                );
                            }}
                            onSnackbarOpen={onSnackbarOpen}
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="right" justifyContent="right" sx={{ marginTop: 2 }}>
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
                            onClick={handleSaveAndClose}
                        >
                            <Save />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Modal>

    );
};
