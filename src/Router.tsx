
import * as React from "react"
import { Grid } from "@mui/material";
import { getCurrentUser, verifyToken } from "./services/auth.service"
import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import IUser from "./types/user.type";
import { AppHeader } from "./components/layout/header/AppHeader";

export const Router = () => {
    let navigate: NavigateFunction = useNavigate();
    const [currentUser, setCurrentUser] = React.useState<IUser | null>(null);

    React.useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser().catch(() => {
                navigate('/login')
            });
            if (!user) {
                navigate('/login')
            }
            setCurrentUser(user);
        };
        fetchUser();
    }, []);

    return (
        <Grid container direction="column" width="100%" flexWrap="nowrap">
            {currentUser && (
                <AppHeader iUser={currentUser} />
            )}
            <Grid container direction="row" flexWrap="nowrap">
                <Outlet />
            </Grid>
        </Grid>
    );
}