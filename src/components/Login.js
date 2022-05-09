import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { AccountCircle, PasswordOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { LoadingButton } from '@mui/lab';

const Login = () => {
    let data;
    let navigate = useNavigate()
    const dispatch = useDispatch();
    const [ disabledBtn, setDisabledBtn ] = useState(true)
    const [ user, setUser ] = useState({
        email : "", password : ""
    });

    const [ emailErrors, setEmailErrors ] = useState(false);
    const [ passwordErrors, setPasswordErrors ] = useState(false);

    const [ emailText, setEmailText ] = useState("");
    const [ passwordText, setPasswordText ] = useState("");

    const [loading, setLoading] = useState(false);


    let name, value;
    const handleInputs =(e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
        
        if(user.email !== '' && user.password !== '') {
            setDisabledBtn(false);
        }
        setEmailErrors(false);
        setPasswordErrors(false);
        setEmailText("");
        setPasswordText("");
        setLoading(false);
    }; 

    const validation = (e) => {
        if ((/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(user.email)) {
            setEmailErrors(false);
        } else {
            setEmailErrors(true)
            setEmailText("Enter a valid email")
            setLoading(false);
        }

        if (user.password.length < 5) {
            setPasswordErrors(true);
            setPasswordText("password should be 5 character or more ")
            setLoading(false);
        }
    }

    const goToAdminConsole = () => {
        navigate('/admin');
    }

    const goToUserConsole = () => {
        navigate('/user');
    }


    const getData = async () => {
        let emailCount = 0;
        let passwordCount = 0;
        let roleCount = 0;

        const res = await axios.get("https://ezetap-test-apis.herokuapp.com/users")
        .catch((error) => {
            console.log(error.message);
        });
        data = res.data;

        for(let index = 0; index<data.length; index++){
            const { email, password, role } = data[index];
            if ( email === user.email ) {
                setEmailErrors(false)
                setEmailText("")
                emailCount = 1;
                if( password === user.password ) {
                    setPasswordErrors(false);
                    setPasswordText("");
                    passwordCount = 1;
                    dispatch(login({...data[index]}));
                    if( role === "admin") {
                        roleCount = 1;
                    }
                    else if( role === "normal" ) {
                        roleCount = 2;
                    }
                    break;
                }
                else {
                    setPasswordErrors(true);
                    setPasswordText("Wrong password");
                    setLoading(false);
                }
                break;
            }
            else {
                setEmailErrors(true);
                setEmailText("Invalid email");
                setLoading(false);
            }
        }

        if(emailCount === 1 && passwordCount === 1 && roleCount === 1) {
            goToAdminConsole();
        } else  if (emailCount === 1 && passwordCount === 1 && roleCount === 2) {
            goToUserConsole();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validation();
        if(user.email !== "" && user.password !== "")
        {
            setLoading(true);
            getData();
        }
        
    };

    const gridStyle = {
        margin: 0,
        padding: 0,
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #acb6e5, #86fde8)'
    }

    const paperStyle = {
        padding : 20,
        height : '460px',
        width : '400px',
        borderRadius : '10px',
        backgroundColor : "#FCF6F6",
    }

    const avatarStyle = {
        backgroundColor : 'blue',
        width : '4em',
        height: '4em',
    }

    const buttonStyle = {
        marginTop : '15px',
        borderRadius : '10px',
        padding: '10px 25px',
    }

    return (
        <Grid style = { gridStyle }>
            <Paper elevation = { 10 } style = { paperStyle }>
                <Grid align = 'center' style = { {marginTop : '40px' }}>
                    <Avatar style = { avatarStyle }><LockOutlinedIcon style={{ width : '2em', height : '2em' }}/></Avatar>
                    <h1>Log In</h1>
                </Grid>
                <form noValidate onSubmit = { handleSubmit } >
                    <Grid style={{ display : 'flex', alignItems : 'flex-end', margin : '10px 50px' }}>
                        <AccountCircle sx = {{ mr: 1, my: 1 }} style = {{ height: '40px', width: '40px' }}/>
                        <TextField type = 'email' label = 'Email' name = 'email' placeholder = 'Enter e-mail' value = {user.email} onChange = {handleInputs} fullwidth = "true" required autoComplete='off' error = {emailErrors} helperText = { emailText } ></TextField>
                    </Grid>
                    
                    <Grid style={{ display : 'flex', alignItems : 'flex-end', margin : '10px 50px' }}>
                        <PasswordOutlined sx = {{ mr: 1, my: 1.8 }} style = {{ height: '40px', width: '40px' }}/>
                        <TextField type = 'password' label = 'Password' name = 'password' placeholder = 'Enter password' value = {user.password} onChange = {handleInputs} fullwidth = "true" required error = {passwordErrors} helperText = { passwordText } ></TextField>
                    </Grid>
                    <LoadingButton variant = 'contained' type = 'submit' color = 'secondary' style = { buttonStyle } disabled = {disabledBtn} loading={loading}  > LOG IN </LoadingButton>
                </form>
                <Grid style={{ display : 'flex', flexDirection : 'column', justifyContent : 'center', margin : '20px'}}>
                    <Typography>
                        <Link href = '#' fullwidth = "true" >Forgot Password</Link>
                    </Typography>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Login;