import { Link, Typography } from "@mui/material";

export function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.grupointegrar.com/">
                Grupo Integrar
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}