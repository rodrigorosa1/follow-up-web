import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { NavigateFunction, useNavigate } from 'react-router-dom';
// import moment from 'moment-timezone';
import moment from 'moment'
import 'moment/locale/pt-br';
import { Chip } from '@mui/material';

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export const CardSchedule: React.FC<any> = ({ total }) => {
    const dataNow = moment().locale('pt-br'); // Define o idioma da data
    const dtExtension = dataNow.format('D [de] MMMM [de] YYYY')

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Para hoje
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {dtExtension}
            </Typography>
            <div className='homeCardSchedule'>
                <Typography component="p" variant="h3">
                    {total}
                </Typography>
            </div>
            <Typography color="text.secondary" sx={{
                flex: 1,
                alignContent: 'left',
                textAlign: 'left',
                marginLeft: '50px'
            }}>
                agendas
            </Typography>
            <div className='homeCardScheduleLink'>
                <Chip label="Abrir" onClick={preventDefault} />

                {/* <Link color="primary" href="#" onClick={preventDefault}>

                </Link> */}
            </div>
        </React.Fragment>
    );

}