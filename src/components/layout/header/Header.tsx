import { AppBar, Button, Toolbar } from "@mui/material";
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const Header = () => {
    let navigate: NavigateFunction = useNavigate();

    const goLogin = () => {
        navigate("/login");
    }

    return (
        <AppBar>
            <Toolbar>
                <Button color="inherit" onClick={goLogin} sx={{ ml: 'auto' }}>Login</Button>
            </Toolbar>
        </AppBar>

    );
}