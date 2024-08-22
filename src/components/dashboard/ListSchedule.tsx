import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, IconButton, Typography } from '@mui/material';
import { HiOutlineCalendar } from 'react-icons/hi2';
import moment from 'moment';
import { getInstructorAvatarId, getStudentAvatarId } from '../../services/avatar.service';


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export const ListSchedule: React.FC<any> = ({ events }) => {

  const loadStudentAvatar = (id: string) => {
    return getStudentAvatarId(id).toString();
  }

  const loadProfAvatar = (id: string) => {
    return getInstructorAvatarId(id).toString();
  }

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Proximas
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Horário</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Profissional</TableCell>
            <TableCell align="right">Abrir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>
                {moment(row.start).format('HH:mm')}
              </TableCell>
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
                      src={loadProfAvatar(row.instructor.id)}
                    />
                  )}
                  {row.instructor.fullname}
                </div>
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <HiOutlineCalendar
                    size={20}
                    color='grey'
                  // onClick={() => goDetails(params.row.id)}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );

}