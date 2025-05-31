import { Box, CircularProgress } from "@mui/material"

export const PageLoad = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '30vh',
            }}
        >
            <CircularProgress />
        </Box>
    );
}