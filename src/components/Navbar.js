import * as React from 'react';
import '../App.css'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import { makeStyles } from '@mui/styles';
import { ClassNames } from '@emotion/react';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const drawerWidth = 300;
const useStyles = makeStyles({
    drawer:{
        width: drawerWidth,
    },
    drawerPaper: {
        "&&": {
            width: drawerWidth,
            backgroundColor: '#233446',
            color: '#ffffff'
        }
    },
    divider:{
        margin: '0 auto',
        width: '90%',
        background: '#607d9c',
    }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 'fit-content',
    bgcolor: 'background.paper',
    // border: '; 2px solid #000',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

export default function ClippedDrawer() {
    const classes = useStyles();
    const user = useSelector(selectUser)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ userModalOpen, setUserModalOpen ] = React.useState(false);
    const [ agreementModalOpen, setAgreementModalOpen ] = React.useState(false);
    const handleClose = () => {
        setUserModalOpen(false);
        setAgreementModalOpen(false);
    }

    const [ addUser, setAddUser ] = React.useState({
        name : "",
        mobileNumber : "",
        email : "",
        orgCode : "",
        username : "",
        password : ""
    });

    const [ addAgreement, setAddAgreement ] = React.useState({
        agreementText: "",
        agreementCode: "",
        orgCode: "",
    })

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setAddUser({...addUser, [name]:value});
    } 

    const handleAgreementInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setAddAgreement({...addUser, [name]:value});
    }

    const goToHome = (e) => {
        user.role === 'admin' ? navigate('/admin') : navigate('/user');
    }

    const goToAgreement = (e) => {
        navigate("/agreements");
    }

    const goToCreateUser = (e) => {
        setUserModalOpen(true);
    }

    const goToCreateAgreement = (e) => {
        setAgreementModalOpen(true);
        console.log("Create Agreement")
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/');
    }

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <Drawer
            className = { ClassNames.drawer }
            anchor = 'left'
            classes = {{ paper: classes.drawerPaper, root: classes.drawerRoot }}
            variant="permanent"
            sx = {{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
            >
            <Toolbar />
            <Box sx={{ overflow: 'auto'}}>
                <List>
                    <ListItem>
                        <ListItemIcon/>
                        <ListItemText/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon/>
                        <ListItemText/>
                    </ListItem><ListItem>
                        <ListItemIcon/>
                        <ListItemText/>
                    </ListItem>
                </List>
                <Divider classes = {{ root: classes.divider }} />
                <List>
                    <ListItem button onClick = { goToHome }>
                        <ListItemIcon>
                            <HomeSharpIcon style = {{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary = "Home"/>
                    </ListItem>
                    { 
                        user.role === 'admin' ?
                            <ListItem button onClick = { goToHome }>
                                <ListItemIcon>
                                    <PeopleAltIcon style = {{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary = "Users"/>
                            </ListItem>
                        :
                        null
                    }
                    <ListItem button onClick = { goToAgreement }>
                        <ListItemIcon>
                            <HistoryEduIcon style = {{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary = "Agreement"/>
                    </ListItem>
                </List>
                <Divider classes = {{ root: classes.divider }} />
                { 
                user.role === 'admin' ?
                <List>
                    <ListItem button onClick = { goToCreateUser }>
                        <ListItemIcon>
                            <PersonAddAltIcon style = {{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary = "Add User"/>
                    </ListItem>
                    <ListItem button onClick = { goToCreateAgreement }>
                        <ListItemIcon>
                            <AddCircleIcon style = {{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary = "Add Agreement"/>
                    </ListItem>
                </List>
                :
                null
                }
                <Divider classes = {{ root: classes.divider }} />
                <List>
                    <ListItem button onClick = { handleClick }>
                        <ListItemIcon>
                            <LogoutIcon style = {{ color: 'white' }} />
                        </ListItemIcon>
                    <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={userModalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={userModalOpen}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h4" component="h2" style = {{ padding: '20px 0' }}>
                    Add user
                    </Typography>
                    <form>
                        <div className="wrap-input100 validate-input" >
                            <span>Name: </span>
                            <OutlinedInput type = 'text' name = 'name' placeholder = 'Enter name' autoComplete='off' fullWidth = 'true' value = { addUser.name } onChange = { handleInputs }
                                startAdornment = {
                                    <InputAdornment position='start'>
                                    </InputAdornment>
                                }
                            ></OutlinedInput>
                        </div>
                        <div className="wrap-input100 validate-input" >
                            <span>Mobile no.: </span>
                            <OutlinedInput type = 'number' name = 'mobileNumber' placeholder = 'Enter mobile number' autoComplete='off' fullWidth = 'true'  value = { addUser.mobileNumber } onChange = { handleInputs }
                                startAdornment = {
                                    <InputAdornment position='start'>
                                    </InputAdornment>
                                }
                            ></OutlinedInput>
                        </div>
                        <div className="wrap-input100 validate-input" >
                        <span>Email: </span>
                            <OutlinedInput type = 'email' name = 'email' placeholder = 'Enter e-mail' autoComplete='off' fullWidth = 'true' value = { addUser.email } onChange = { handleInputs }
                                startAdornment = {
                                    <InputAdornment position='start'>
                                    </InputAdornment>
                                }
                            ></OutlinedInput>
                        </div>
                        <div className="wrap-input100 validate-input" >
                        <span>Organisation Code: </span>
                            <OutlinedInput type = 'text' name = 'orgCode' placeholder = 'Enter Organisation Code' autoComplete='off' fullWidth = 'true' value = { addUser.orgCode } onChange = { handleInputs }
                                startAdornment = {
                                    <InputAdornment position='start'>
                                    </InputAdornment>
                                }
                            ></OutlinedInput>
                        </div>
                        <div className="wrap-input100 validate-input" >
                        <span>Username: </span>
                            <OutlinedInput type = 'text' name = 'username' placeholder = 'Enter username' autoComplete='off' fullWidth = 'true' value = { addUser.username } onChange = { handleInputs }
                                startAdornment = {
                                    <InputAdornment position='start'>
                                    </InputAdornment>
                                }
                            ></OutlinedInput>
                        </div>
                        <div className="wrap-input100 validate-input" >
                            <span>Password: </span>
                            <OutlinedInput type = 'text' name = 'password' placeholder = 'Enter password' autoComplete = 'off' fullWidth = 'true' value = { addUser.password } onChange = { handleInputs }
                                startAdornment = {
                                    <InputAdornment position='start'>
                                    </InputAdornment>
                                }
                            ></OutlinedInput>
                        </div>
                        <div className="container-login100-form-btn">
                            <LoadingButton className = "login100-form-btn" variant = 'contained' type = 'submit' color = 'success' > Create User </LoadingButton>
                        </div>
                    </form>
                </Box>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={agreementModalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={agreementModalOpen}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h4" component="h2" style = {{ padding: '20px 0' }}>
                    Add Agreement
                    </Typography>
                    <form>
                        <div className="wrap-input100 validate-input" >
                            <span>Agreement text: </span>
                            <OutlinedInput type = 'text' name = 'agreementText' placeholder = 'Enter Agreement Text' autoComplete='off' fullWidth = 'true' value = { addAgreement.agreementText } onChange = { handleAgreementInputs }
                                startAdornment = {
                                    <InputAdornment position='start'>
                                    </InputAdornment>
                                }
                            ></OutlinedInput>
                        </div>
                        <div className="wrap-input100 validate-input" >
                            <span>Agreement Code: </span>
                            <OutlinedInput type = 'number' name = 'agreementCode' placeholder = 'Enter Agreement Code' autoComplete='off' fullWidth = 'true' value = { addAgreement.agreementCode } onChange = { handleAgreementInputs }
                                startAdornment = {
                                    <InputAdornment position='start'>
                                    </InputAdornment>
                                }
                            ></OutlinedInput>
                        </div>
                        <div className="wrap-input100 validate-input" >
                        <span>Organisation Code: </span>
                            <OutlinedInput type = 'text' name = 'orgCode' placeholder = 'Enter Organisation Code' autoComplete='off' fullWidth = 'true' value = { addAgreement.orgCode } onChange = { handleAgreementInputs }
                                startAdornment = {
                                    <InputAdornment position='start'>
                                    </InputAdornment>
                                }
                            ></OutlinedInput>
                        </div>
                        <div className="container-login100-form-btn">
                            <LoadingButton className = "login100-form-btn" variant = 'contained' type = 'submit' color = 'success' > Create Agreement </LoadingButton>
                        </div>
                    </form>
                </Box>
                </Fade>
            </Modal>
        </Box>
    );
}