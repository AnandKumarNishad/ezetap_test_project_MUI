import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
({ theme, open }) => ({
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
}),
);

const AppBar = styled(MuiAppBar, {
shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

export default function PersistentDrawerLeft() {
    const user = useSelector(selectUser)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const buttonStyle = {
        marginTop : '15px',
        borderRadius : '10px',
        padding: '10px 25px',
        margin: '0 10px',
    }

    const goToHome = (e) => {
        user.role === 'admin' ? navigate('/admin') : navigate('/user');
    }

    const goToAgreement = (e) => {
        navigate("/agreements");
    }

    const goToCreateUser = (e) => {
        console.log("Create User")
    }

    const goToCreateAgreement = (e) => {
        console.log("Create Agreement")
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/');
    }

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
            <Toolbar style = {{ display: 'flex', justifyContent: "space-between" }}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
                Agreements App
            </Typography>
                <Button className='btn' variant='contained' type = 'submit' color = 'secondary' style = { buttonStyle } onClick = { handleClick } >Logout</Button>           
            </Toolbar>
        </AppBar>
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
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem button onClick = { goToHome }>
                    <ListItemIcon>
                        <HomeSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary = "Home"/>
                </ListItem>
                <ListItem button onClick = { goToAgreement }>
                    <ListItemIcon>
                        <HistoryEduIcon />
                    </ListItemIcon>
                    <ListItemText primary = "Agreement"/>
                </ListItem>
            </List>
            <Divider />
            { 
            user.role === 'admin' ?
            <List>
                <ListItem button onClick = { goToCreateUser }>
                    <ListItemIcon>
                        <PersonAddAltIcon />
                    </ListItemIcon>
                    <ListItemText primary = "Add User"/>
                </ListItem>
                <ListItem button onClick = { goToCreateAgreement }>
                    <ListItemIcon>
                        <AddCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary = "Add Agreement"/>
                </ListItem>
            </List>
            :
            null
            }
            <Divider />
            <List>
                <ListItem button onClick = { handleClick }>
                    <ListItemIcon><LogoutIcon/></ListItemIcon>
                <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
        <Main>
            <DrawerHeader />
        </Main>
        </Box>
    );
}
