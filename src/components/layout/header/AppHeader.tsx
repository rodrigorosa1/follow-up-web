import * as React from 'react';
import { TextField, List, ListItem, ListItemText, alpha, styled, Menu, MenuItem, Box, CssBaseline, Toolbar, IconButton, Typography, Avatar, Drawer, Divider, Badge } from '@mui/material';
import IUser from '../../../types/user.type';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import * as AuthService from "../../../services/auth.service";
import { getUserAvatarId } from '../../../services/user.service';
import { MenuOutlined, NotificationAddOutlined } from '@mui/icons-material';
import follow_up_logo_green from '../../../assets/img/follow_up.png'
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Sidebar } from '../Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ChatComponent } from '../Chat';
import { Notifications } from '../Notitications';

interface Props {
    iUser: IUser
}

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const AppBarStyled = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Search = styled('div')(({ theme }) => ({
    position: 'absolute',
    height: 40,
    maxWidth: 450,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.info.light, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.info.light, 0.25),
    },
    color: 'GrayText',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    marginLeft: 380,
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'GrayText',
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
    color: 'info',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '50ch',
        },
    },
}));


export const AppHeader = (props: Props) => {
    // paramenters
    const [currentUser] = React.useState<IUser>(props.iUser);
    const [open, setOpen] = React.useState(false);

    //anchor
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    // search
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<any[] | null>([]);
    const [isInputEmpty, setIsInputEmpty] = React.useState(true);


    //drawers
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    //navigate
    let navigate: NavigateFunction = useNavigate();

    const goProfile = () => {
        navigate("/profile");
    }

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };


    //menu achor
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const loadAvatar = (id: any) => {
        return getUserAvatarId(id);
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={goProfile}>Perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const style = {
        background: '#ffff',

    };

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const data = [
        { id: 1, title: 'Dashboard', href: '/home' },
        { id: 2, title: 'Follow-up', href: '/home' },
        { id: 3, title: 'Agenda', href: '/scheduler' },
        { id: 4, title: 'Clientes', href: '/students' },
        { id: 5, title: 'Profissionais', href: '/professionals' },
        { id: 6, title: 'Habilidades', href: '/skills' },
        { id: 7, title: 'Configurações', href: '/configurations' },
    ];

    const handleSearch = (e: any) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setIsInputEmpty(term === '');

        if (term === '') {
            setSearchResults([]);
        } else {
            const results = data.filter(item => item.title.toLowerCase().includes(term));
            setSearchResults(results);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarStyled position="fixed" style={style} >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="info"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleDrawerOpen}
                    >
                        <MenuOutlined />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="info"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    // onClick={handleDrawerOpen}
                    >
                        <Box>
                            <img
                                src={follow_up_logo_green}
                                srcSet=''
                                alt=''
                                height={'35px'}
                            />
                        </Box>
                    </IconButton>
                    <Box sx={{ width: 400 }}>
                        <div className="search-container">
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    size='small'
                                    placeholder="Buscar..."
                                    onChange={handleSearch}
                                    value={searchTerm}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                aria-label="clear"
                                                onClick={() => {
                                                    setSearchTerm('');
                                                    setIsInputEmpty(true);
                                                    setSearchResults([]);
                                                }}
                                                edge="end"
                                            >
                                                {isInputEmpty ? null : <ClearIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                                <List>
                                    {searchResults && (searchResults.map((item, index) => (
                                        <ListItem key={index} button component="a" href={item.href}>
                                            <ListItemText primary={item.title} />
                                        </ListItem>
                                    )))}
                                </List>
                            </Search>
                        </div>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0.2, display: { xs: 'none', md: 'flex' } }}>
                        <ChatComponent />
                        <Notifications />
                    </Box>
                    <Box>
                        <Typography
                            fontSize={14}
                            className="text-blue pad-8 items-center"
                        >
                            {currentUser.fullname}
                        </Typography>
                        <Typography
                            fontSize={10}
                            className="text-gray-medium pad-8 .text-right"
                        >
                            {currentUser.position}
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="info"
                        >
                            <Avatar
                                alt={currentUser.fullname}
                                src={loadAvatar(currentUser.id)}
                            />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="info"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBarStyled>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton
                        size="large"
                        edge="start"
                        color="info"
                        aria-label="open drawer"
                        sx={{ mr: 0 }}>
                        <Box>
                            <img
                                src={follow_up_logo_green}
                                srcSet=''
                                alt=''
                                height={'35px'}
                            />
                        </Box>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="info"
                        aria-label="menu"
                        sx={{ mr: 1 }}
                        onClick={handleDrawerClose}
                    >
                        <MenuOutlinedIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Sidebar
                    handleDrawerClose={handleDrawerClose}
                    currentUser={currentUser}
                />
            </Drawer>
            {renderMenu}

            <Main
                open={open}
                sx={{
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <DrawerHeader />
            </Main>
        </Box>
    );
}

