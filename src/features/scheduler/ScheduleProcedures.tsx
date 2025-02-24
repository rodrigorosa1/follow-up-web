import * as React from "react"
import IProcedure from "../../types/procedure.type";
import { HiPencilSquare, HiXCircle } from "react-icons/hi2";
import { Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, Grid, IconButton, InputLabel, LinearProgress, MenuItem, Paper, Select, Snackbar } from "@mui/material";
import { useParams } from 'react-router-dom';
import { getEventProcedureStudent, getEventslId, removeEventProcedures, removeEventSkill } from "../../services/event.service";
import { ProcedureDetails } from "./ProcedureDetails";
import ISkill from "../../types/skill.type";
import AddIcon from '@mui/icons-material/Add';
import { ProcedureSelection } from "./ProcedureSelection";
import { getProcedures, getSkills } from "../../services/skill.service";
import { SkillSelection } from "./SkillSelection";
import { GridColDef } from "@mui/x-data-grid";
import { CustomDataGrid } from "../../components/data-grid/custom";

export const ScheduleProcedures = () => {
    const { id } = useParams();
    const [skills, setSkills] = React.useState<any[]>([]);
    const [allSkills, setAllSkills] = React.useState<ISkill[]>([]);
    const [selectedSkill, setSelectedSkill] = React.useState<ISkill | null>(null);
    const [procedures, setProcedures] = React.useState<IProcedure[]>([]);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [selectedProcedure, setSelectedProcedure] = React.useState<IProcedure | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isPrcModal, setIsPrcModal] = React.useState(false);
    const [isSkillModal, setIsSkillModal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openSkillRemove, setOpenSkillRemove] = React.useState(false);
    const [removeSkill, setRemoveSkill] = React.useState<any>();
    const [snackbarError, setSnackbarError] = React.useState(false);
    const [remove, setRemove] = React.useState<IProcedure>();
    const [allProcedures, setAllProcedures] = React.useState<IProcedure[]>([]);

    const handlePrcdClick = (procedure: IProcedure) => {
        setSelectedProcedure(procedure);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        getSkill();
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const getProceduresSchedule = async (event_id: string, skill_id: string) => {
        const procedures = await getEventProcedureStudent(event_id, skill_id);
        setProcedures(procedures);
    }

    const getSkill = async () => {
        if (id) {
            const event = await getEventslId(id);
            if (Array.isArray(event.skills) && event.skills.length > 0) {
                setSkills(event.skills);
                setSelectedSkill(event.skills[0]);
                getProceduresSchedule(event.id, event.skills[0].skill_id);
                getProceduresAll(event.skills[0].skill_id);
            }
            setDataLoaded(true);
        };
    }

    const getAllSkills = async () => {
        const all = await getSkills();
        setAllSkills(all);
    }

    const handleSkillSelected = (event: any) => {
        const skill = event.target.value;
        setProcedures([]);
        setSelectedSkill(skill);
        getProceduresSchedule(skill.schedule_id, skill.skill_id);
        getProceduresAll(skill.skill_id);
    }

    const getProceduresAll = async (skill_id: string) => {
        const allProcedures = await getProcedures(skill_id);
        setAllProcedures(allProcedures);
    }

    const onSnackbarMessage = (message: string) => {
        setSnackbarMessage(message);
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const openAddPrc = () => {
        setSnackbarError(false);
        setIsPrcModal(true);
    }

    const openAddSkill = () => {
        setSnackbarError(false);
        setIsSkillModal(true);
    }

    const handleCloseSkillModal = () => {
        setIsSkillModal(false);
        getSkill();
    };

    const handleClosePrcModal = () => {
        setIsPrcModal(false);
        getSkill();
    };

    const handleOpen = (procedure: IProcedure) => {
        setSnackbarError(false);
        setRemove(procedure);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }


    const handleOpenSkill = (skill: any) => {
        setRemoveSkill(skill);
        setOpenSkillRemove(true);
    };

    const handleCloseSkill = () => {
        setOpenSkillRemove(false);
    }

    const handleRemoveProcedure = () => {
        if (remove?.id) {
            setSnackbarError(false);
            removeEventProcedures(remove.id);
            getAllSkills();
            getSkill();
            handleClose();
            setSnackbarMessage('Objetivo removido das agendas')
            handleSnackbarOpen();
        }
    }

    const handleRemoveSkill = () => {
        if (removeSkill?.id) {
            removeEventSkill(removeSkill.id).then((r) => {
                if (r === true) {
                    setSnackbarError(false);
                    setSnackbarMessage('Habilidade removida das agendas')
                    handleSnackbarOpen();
                    getAllSkills();
                    getSkill();
                    handleCloseSkill();
                } else {
                    setSnackbarError(true);
                    setSnackbarMessage(r.response.data.detail);
                    handleSnackbarOpen();
                    handleCloseSkill();
                }
            }).catch((e) => {
                console.error(e);
            });
        }
    }

    const dataPage = () => {
        getAllSkills();
        getSkill();
    }

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Nome',
            width: 320,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'objective',
            headerName: 'Obejtivo',
            width: 600,
            headerClassName: 'header-datagrid-prof',
        },
        {
            field: 'id',
            headerName: '...',
            width: 150,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton>
                        <HiPencilSquare
                            size={18}
                            color='grey'
                            onClick={() => handlePrcdClick(params.row)}
                        />
                    </IconButton>
                    <IconButton>
                        <HiXCircle
                            size={18}
                            color='grey'
                            onClick={() => handleOpen(params.row)}
                        />
                    </IconButton>
                </div>
            ),
            headerClassName: 'header-datagrid-prof',
        },
    ];

    React.useEffect(() => {
        dataPage();
    }, []);

    return (
        dataLoaded === false ? (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        ) : (
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Grid item>
                    {id && (
                        <SkillSelection
                            skills={allSkills}
                            isOpen={isSkillModal}
                            schedule_id={id}
                            onClose={handleCloseSkillModal}
                            onSnackbarOpen={handleSnackbarOpen}
                            onSnackbarMessage={onSnackbarMessage}
                            getSkill={getSkill}
                        />
                    )}
                    <ProcedureDetails
                        procedure={selectedProcedure}
                        isOpen={isModalOpen}
                        id={id}
                        onClose={handleCloseModal}
                        onSnackbarOpen={handleSnackbarOpen}
                        getSkill={getSkill}
                    />
                    {selectedSkill?.id && id && (
                        <ProcedureSelection
                            isOpen={isPrcModal}
                            schedule_id={id}
                            procedures={allProcedures}
                            onClose={handleClosePrcModal}
                            onSnackbarOpen={handleSnackbarOpen}
                            onSnackbarMessage={onSnackbarMessage}
                            getSkill={getSkill}
                        />
                    )}
                </Grid>
                <Grid item>
                    <Paper variant="outlined" sx={{ px: 2, py: 1, mx: 2, my: 1 }}>
                        <Box sx={{ px: 2, py: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {skills.map((tag, index) => (
                                <Chip key={index} label={tag.skill_name} onDelete={() => handleOpenSkill(tag)} />
                            ))}
                        </Box>
                    </Paper>

                </Grid>
                <Grid item>
                    <Grid container alignItems="left" justifyContent="left">
                        <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            aria-label="add"
                            onClick={openAddSkill}>
                            <AddIcon sx={{ mr: 1 }} />
                            Adicionar habilidade
                        </Fab>
                    </Grid>
                </Grid>
                <Grid item sx={{ m: 2 }}>
                    <FormControl sx={{ m: 1, minWidth: 720 }}>
                        <InputLabel>Habilidade</InputLabel>
                        <Select
                            label="Habilidade"
                            id="skill_id"
                            name="skill"
                            value={selectedSkill}
                            onChange={handleSkillSelected}
                            fullWidth
                            required
                        >
                            {
                                skills.map((skill) => {
                                    return <MenuItem key={skill.skill_id} value={skill}>
                                        {skill.skill_name}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Grid container alignItems="right" justifyContent="right">
                        <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            aria-label="add"
                            onClick={openAddPrc}>
                            <AddIcon sx={{ mr: 1 }} />
                            Vincular objetivo
                        </Fab>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                            <Box
                                sx={{
                                    height: 400,
                                    width: '100%',
                                }}
                            >
                                <CustomDataGrid
                                    columns={columns}
                                    rows={procedures}
                                    pagination={5}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Confirmação de alteração</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Esta ação removerá o objetivo de todas as agendas relacionadas do cliente.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => handleRemoveProcedure()}
                            color="primary"
                            autoFocus
                        >
                            Sim
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openSkillRemove} onClose={handleCloseSkill}>
                    <DialogTitle>Confirmação de alteração</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Esta ação removerá a habilidade de todas as agendas relacionadas do cliente.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSkill} color="primary">
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => handleRemoveSkill()}
                            color="primary"
                            autoFocus
                        >
                            Sim
                        </Button>
                    </DialogActions>
                </Dialog>




                <Box>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={5000}
                        onClose={handleSnackbarClose}
                        message={snackbarMessage}
                    >
                        {snackbarError ? (
                            <Alert severity="error" sx={{ width: '100%' }}>
                                {snackbarMessage}
                            </Alert>

                        ) : (
                            <Alert severity="success" sx={{ width: '100%' }}>
                                {snackbarMessage}
                            </Alert>
                        )}
                    </Snackbar>
                </Box>
            </Box>

        )
    );



}