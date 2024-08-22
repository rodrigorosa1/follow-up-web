import { Box, Container } from "@mui/system";
import React from "react";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export function Layout({ children }: { children: React.ReactNode }) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box sx={{

        }}>
            <Container
                maxWidth={matches ? 'lg' : 'sm'}
                sx={{
                    mt: 4,
                    mb: 4,
                    backgroundColor: "#0000"
                }}
            >{children}</Container>
        </Box>
    );
}