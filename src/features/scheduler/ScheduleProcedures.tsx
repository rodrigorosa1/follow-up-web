import * as React from "react"
import IProcedure from "../../types/procedure.type";
import { HiPencilSquare, HiXCircle } from "react-icons/hi2";
import { Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, Grid, IconButton, InputLabel, LinearProgress, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { getEventProcedureStudent, getEventslId, removeEventProcedures } from "../../services/event.service";
import { ProcedureDetails } from "./ProcedureDetails";
import ISkill from "../../types/skill.type";
import { ReplyOutlined } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { ProcedureSelection } from "./ProcedureSelection";
import { getProcedures, getSkills } from "../../services/skill.service";
import { SkillSelection } from "./SkillSelection";

export const ScheduleProcedures = () => {
    let navigate: NavigateFunction = useNavigate();
    const { id } = useParams();
    const [skills, setSkills] = React.useState<any[]>([]);
    const [allSkills, setAllSkills] = React.useState<ISkill[]>([]);
    const [selectedSkill, setSelectedSkill] = React.useState<ISkill | null>(null);
    const [procedures, setProcedures] = React.useState<IProcedure[]>([]);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarError] = React.useState(false);
    const [selectedProcedure, setSelectedProcedure] = React.useState<IProcedure | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isPrcModal, setIsPrcModal] = React.useState(false);
    const [isSkillModal, setIsSkillModal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
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

    const historyBack = () => {
        navigate("/scheduler");
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const openAddPrc = () => {
        setIsPrcModal(true);
    }

    const openAddSkill = () => {
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
        setRemove(procedure);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleRemoveProcedure = () => {
        if (remove?.id) {
            removeEventProcedures(remove.id);
            getAllSkills();
            getSkill();
            handleClose();
            setSnackbarMessage('Objetivo removido da agendas')
            handleSnackbarOpen();
        }
    }

    const dataPage = () => {
        getAllSkills();
        getSkill();
    }

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
                            getSkill={getSkill}
                        />
                    )}
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
                                    return <MenuItem key={skill.id} value={skill}>
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
                        <Grid item xl={10} lg={10} md={10} sm={12} xs={12} sx={{ m: 2 }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 400 }} aria-label="responsáveis" size='small'>
                                    <TableHead
                                        sx={{
                                            backgroundColor: '#edf5f3',
                                        }}>
                                        <TableRow>
                                            <TableCell>Objetivo</TableCell>
                                            <TableCell>Descrição</TableCell>
                                            <TableCell>Habilidade</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {procedures.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.objective}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <div>
                                                        <Chip
                                                            label={row.skill_name}
                                                            color='default'
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton>
                                                        <HiPencilSquare
                                                            size={18}
                                                            color='grey'
                                                            onClick={() => handlePrcdClick(row)}
                                                        />
                                                    </IconButton>
                                                    <IconButton>
                                                        <HiXCircle
                                                            size={18}
                                                            color='grey'
                                                            onClick={() => handleOpen(row)}
                                                        />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container alignItems="right" justifyContent="right">
                        <Grid item alignContent="center" xl={1} lg={1} md={1} sm={1} xs={1}>
                            <IconButton
                                title="Voltar"
                                onClick={historyBack}
                            >
                                <ReplyOutlined />
                            </IconButton>
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