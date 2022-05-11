import React, { useState } from 'react';
import axios from 'axios';
import sideImage from '../images/img-01.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import '../css/main.css';
import '../css/util.css';
import '../App.css';
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

    const [ loading, setLoading] = useState(false);
    const [ visiblePassword, setVisiblePassword ] = useState(false);

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

    const handleClickShowPassword = () => {
          setVisiblePassword(!visiblePassword) 
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const buttonStyle = {
        marginTop : '15px',
        borderRadius : '30px',
        padding: '10px 25px',
    }

    const inputStyle = {
        width: '100%',
    }

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src = { sideImage } alt = "side"></img>
                    </div>

                    <form className="login100-form validate-form" onSubmit = { handleSubmit } noValidate>
                        <span className="login100-form-title">
                            Login
                        </span>

                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <OutlinedInput type = 'email' name = 'email' placeholder = 'Enter e-mail' value = {user.email} onChange = {handleInputs} autoComplete='off' error = {emailErrors} helpertext = { emailText } style = { inputStyle } 
                                startAdornment = {
                                    <InputAdornment position='start'>
                                        <EmailIcon />
                                    </InputAdornment>
                                }
                            ></OutlinedInput>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                            <OutlinedInput type = { visiblePassword ? 'text' : 'password' } name = 'password' placeholder = 'Enter password' value = {user.password} onChange = {handleInputs} fullwidth = "true" error = {passwordErrors} helpertext = { passwordText } style = { inputStyle } 
                                startAdornment = {
                                    <InputAdornment position='start'>
                                        <LockRoundedIcon />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {visiblePassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                }
                            >
                            </OutlinedInput>
                        </div>
                        
                        <div className="container-login100-form-btn">
                            <LoadingButton className = "login100-form-btn" variant = 'contained' type = 'submit' style = { buttonStyle } loading={loading} disabled = {disabledBtn} color = 'success' > LOG IN </LoadingButton>
                        </div>

                        <div className="text-center p-t-12">
                            <span className="txt1">
                                Forgot: 
                            </span>
                            <a className="txt2" href="/">
                                Username / Password?
                            </a>
                        </div>

                        <div className="text-center p-t-136">
                        </div>
                    </form>
                </div>
            </div>
	    </div>
    );
};

export default Login;