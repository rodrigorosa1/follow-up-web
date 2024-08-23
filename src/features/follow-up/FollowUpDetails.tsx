import { Avatar, Box, Chip, Grid, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import * as React from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { getFollowUpId } from '../../services/follow-up.service';
import { IEvent } from '../../types/scheduler.type';
import { IStudent } from '../../types/student.type';
import { IProfessional } from '../../types/professional.type';
import ISkill from '../../types/skill.type';
import RadialProcedure from '../../components/charts/RadialProcedure';
import { ReplyOutlined } from '@mui/icons-material';
import { CustomBreadcrumbs } from '../../components/layout/Breadcrumbs';
import { getInstructorAvatarId, getStudentAvatarId } from '../../services/avatar.service';


export const FollowUpDetais = () => {
    const { id } = useParams();
    const [event, setEvent] = React.useState<IEvent>();
    const [skills, setSkills] = React.useState<ISkill[]>();
    const [student, setStudent] = React.useState<IStudent>();
    const [professional, setProfessional] = React.useState<IProfessional>();
    const [dataLoaded, setDataLoaded] = React.useState(false);

    let navigate: NavigateFunction = useNavigate();

    const eventId = async () => {
        const schedules = await getFollowUpId(id);
        setEvent(schedules);
        setSkills(schedules.skills);
        setStudent(schedules.student);
        setProfessional(schedules.instructor);
        setDataLoaded(true);
    }

    const loadStudentAvatar = (id: string) => {
        return getStudentAvatarId(id);
    }

    const loadProfAvatar = (id: string) => {
        return getInstructorAvatarId(id);
    }

    const historyBack = () => {
        navigate("/follow-up");
    }

    React.useEffect(() => {
        eventId();
    }, [])

    return (
        <Grid>
            {dataLoaded === false ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Grid container alignItems="left" justifyContent="left">
                            <CustomBreadcrumbs
                                title1="follow-up"
                                href1="/follow-up"
                                title2=""
                                href2=""
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper elevation={2}>
                            <React.Fragment>
                                <Grid container>
                                    {student && (
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div className='resultDetailsSkill'>
                                                <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                    Cliente
                                                </Typography>
                                                <Grid container justifyContent="left" alignItems={"center"}>
                                                    <Avatar
                                                        alt={student.fullname}
                                                        src={loadStudentAvatar(student.id)}
                                                    />
                                                    <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                        {student.fullname}
                                                    </Typography>
                                                </Grid>
                                            </div>
                                        </Grid>
                                    )}
                                    {professional && (
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div className='resultDetailsSkill'>
                                                <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                    Profissional
                                                </Typography>
                                                <Grid container justifyContent="left" alignItems={"center"}>
                                                    <Avatar
                                                        alt={professional.fullname}
                                                        src={loadProfAvatar(professional.id)}
                                                    />
                                                    <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                        {professional.fullname}
                                                    </Typography>
                                                </Grid>
                                            </div>
                                        </Grid>
                                    )}
                                    {event && (
                                        <><Grid item xs={6} md={2} lg={2}>
                                            <div className='resultDetailsSkill'>
                                                <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                    Status
                                                </Typography>
                                                <Grid container justifyContent="left" alignItems={"left"}>
                                                    <Chip
                                                        label={event.status}
                                                        color={event.status === 'AGENDADO' ? 'default' :
                                                            event.status === 'EM ANDAMENTO' ? 'primary' :
                                                                event.status === 'PAUSADO' ? 'warning' :
                                                                    event.status === 'CONCLUÍDO' ? 'success' :
                                                                        'error'} />
                                                </Grid>
                                            </div>
                                        </Grid><Grid item xs={6} md={2} lg={2}>
                                                <div className='resultDetailsSkill'>
                                                    <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                        Data
                                                    </Typography>
                                                    <Grid container justifyContent="left" alignItems={"left"}>
                                                        <Chip
                                                            label={new Date(event.start).toLocaleDateString('pt-BR')}
                                                            color='default'
                                                        />
                                                        <Chip
                                                            label={event.start_hour}
                                                            color='default'
                                                        />
                                                    </Grid>
                                                </div>
                                            </Grid></>

                                    )}
                                </Grid>
                            </React.Fragment>
                        </Paper>
                    </Grid>
                    {
                        skills && (
                            skills.map((skill: any) => (
                                <><Grid item xs={12} md={12} lg={12}>
                                    <Paper elevation={2} sx={{ marginTop: 5 }}>
                                        <React.Fragment>
                                            <Grid container>
                                                <Grid item xs={9} md={2} lg={2}>
                                                    <div className='resultDetailsSkill'>
                                                        <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                            Habilidade
                                                        </Typography>
                                                        <Grid container justifyContent="left" alignItems={"center"}>
                                                            <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                                {skill.skill_name}
                                                            </Typography>
                                                        </Grid>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>
                                    </Paper>
                                </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        {skill.procedures && (
                                            skill.procedures.map((procedure: any) => (
                                                <Paper elevation={2} sx={{ marginTop: 5 }}>
                                                    <React.Fragment>
                                                        <Grid container>
                                                            <Grid item xs={6} md={3} lg={3} >
                                                                <div className='resultDetailsSkill'>
                                                                    <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                                        Objetivo
                                                                    </Typography>
                                                                    <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                                        {procedure.name}
                                                                    </Typography>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} md={4} lg={4}>
                                                                <div className='resultDetailsSkill'>
                                                                    <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                                        Descrição
                                                                    </Typography>
                                                                    <Typography component="p" variant="body1" color="text.secondary" gutterBottom sx={{ flex: 1 }}>
                                                                        {procedure.objective}
                                                                    </Typography>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} md={1} lg={1}>
                                                                <div className='resultProcedureGrant'>
                                                                    <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                                        Tentativas
                                                                    </Typography>
                                                                    <Grid container justifyContent="center" alignItems={"center"}>
                                                                        <Chip label={procedure.tries} color="default" />
                                                                    </Grid>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} md={1} lg={1}>
                                                                <div className='resultProcedureGrant'>
                                                                    <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                                        Meta
                                                                    </Typography>
                                                                    <Grid container justifyContent="center" alignItems={"center"}>
                                                                        <Chip label={procedure.goal + '%'} color="default" />
                                                                    </Grid>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} md={2} lg={2}>
                                                                <div className='chartDetailSkill'>
                                                                    <Typography color="text.secondary" variant="subtitle2" sx={{ flex: 1 }} gutterBottom>
                                                                        % Independente
                                                                    </Typography>
                                                                    <Grid container justifyContent="center" alignItems={"center"}>
                                                                        <RadialProcedure value={procedure.points} />
                                                                    </Grid>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                        {procedure.executions && (
                                                            <Grid container justifyContent="center" alignItems={"center"}>
                                                                <Grid item xs={12} md={12} lg={12}>
                                                                    <Table size="small">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell>Tentativa</TableCell>
                                                                                <TableCell>Tempo</TableCell>
                                                                                <TableCell>Tipo de ajuda</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {procedure.executions.map((execution: any) => (
                                                                                <TableRow key={execution.id}>
                                                                                    <TableCell> <Chip label={execution.trie} color="default" /></TableCell>
                                                                                    <TableCell><Chip label={execution.time} color="default" /></TableCell>

                                                                                    <TableCell>{execution.help_type === 'INDEPENDENTE' ? (
                                                                                        <Chip label={execution.help_type} color="success" />
                                                                                    ) : (
                                                                                        <Chip label={execution.help_type} color="warning" />
                                                                                    )}</TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </Grid>
                                                            </Grid>
                                                        )}
                                                    </React.Fragment>
                                                </Paper>

                                            ))
                                        )}
                                    </Grid></>
                            ))
                        )
                    }
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container justifyContent="right" alignItems={"right"}>
                            <IconButton
                                title="Voltar"
                                onClick={historyBack}

                            >
                                <ReplyOutlined />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>

    );

}