import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, Chip, IconButton, Typography } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getFollowUp } from '../../services/follow-up.service';
import { HiEye } from 'react-icons/hi2';
import { getInstructorAvatarId, getStudentAvatarId } from '../../services/avatar.service';

export const ListFollowUp = () => {
  let navigate: NavigateFunction = useNavigate();
  const [events, setEvents] = React.useState<any[]>([]);

  const goDetails = (id: string) => {
    navigate('/follow-up/' + id);
  };

  const goListAll = () => {
    navigate('/follow-up');
  };

  const listEvents = async () => {
    const list = await getFollowUp();
    setEvents(list.slice(0, 5));
  }

  const loadStudentAvatar = (id: string) => {
    return getStudentAvatarId(id).toString();
  }

  const loadProfessionalAvatar = (id: string) => {
    return getInstructorAvatarId(id).toString();
  }

  React.useEffect(() => {
    listEvents();
}, []);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Ulitmos Resultados
      </Typography>
      <Table size="small">
        <TableHead className="tableHeader">
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Profissional</TableCell>
            {/* <TableCell>Habilidade</TableCell> */}
            <TableCell>Status</TableCell>
            <TableCell>Ver</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tableBody">
          {events.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  textIndent: 5
                }}>
                  {row.student && (
                    <Avatar
                      alt={row.student.fullname}
                      src={loadStudentAvatar(row.student.id)}
                    />

                  )}
                  {row.student.fullname}
                </div>
              </TableCell>
              <TableCell>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  textIndent: 5
                }}>
                  {row.instructor && (
                    <Avatar
                      alt={row.instructor.fullname}
                      src={loadProfessionalAvatar(row.instructor.id)}
                    />
                  )}
                  {row.instructor.fullname}
                </div>
              </TableCell>
              {/* <TableCell>{row.skill.name}</TableCell> */}
              <TableCell>
                <Chip
                  label={row.status}
                  color={
                    row.status === 'AGENDADO' ? 'default' :
                      row.status === 'EM ANDAMENTO' ? 'primary' :
                        row.status === 'PAUSADO' ? 'warning' :
                          row.status === 'CONCLUÍDO' ? 'success' :
                            'error'
                  }
                /></TableCell>
              <TableCell align="left">
                <IconButton>
                  <HiEye
                    size={20}
                    color='grey'
                    onClick={() => goDetails(row.id)}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={goListAll} sx={{ mt: 3 }}>
        Ver mais resultados
      </Link>
    </React.Fragment>
  );


}