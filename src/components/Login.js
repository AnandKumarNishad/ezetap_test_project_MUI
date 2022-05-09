import React, { useState } from 'react';
import axios from 'axios';
import sideImage from '../images/img-01.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import '../css/main.css'
import '../css/util.css'
import { LoadingButton } from '@mui/lab';
import { TextField} from '@mui/material';


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

    const buttonStyle = {
        marginTop : '15px',
        borderRadius : '10px',
        padding: '10px 25px',
    }

    const inputStyle = {
        marginLeft: '10%',
        width: '90%',
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
                            <TextField type = 'email' label = 'Email' name = 'email' placeholder = 'Enter e-mail' value = {user.email} onChange = {handleInputs} required autoComplete='off' error = {emailErrors} helperText = { emailText } style = { inputStyle } ></TextField>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                            <TextField type = 'password' label = 'Password' name = 'password' placeholder = 'Enter password' value = {user.password} onChange = {handleInputs} fullwidth = "true" required error = {passwordErrors} helperText = { passwordText } style = { inputStyle } ></TextField>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
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