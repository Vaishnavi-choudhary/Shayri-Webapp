import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import Icon from './icon';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';
import Input from './Input';

import { signin, signup } from '../../actions/auth';



const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };


const Auth = () => {
    const [formData, setFormData] = useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword,setShowPassword] = useState(false);
    const [isSignup,setInSignUp] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword)=>!prevShowPassword)
    const handleSubmit = (e) =>{
        e.preventDefault();
        // if (isSignup) {
        //     dispatch(signup(form, history));
        // } else {
        //     dispatch(signin(form, history));
        //   }
    };
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})

    }
    const switchMode = () => {
        setInSignUp((prevIsSignUp)=>!prevIsSignUp);
        handleShowPassword(false);
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj; // ?. => represents cant get error even error exists or object doesnot exists
        const token = res?.tokenId;
    
        try {
          dispatch({ type: 'AUTH', data: { result, token } });
          history.push('/');
        } catch (error) {
          console.log(error);
        }
    }
    const googleError = () =>{
        console.log("Google SignIn Error. try again later")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={4}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>                 
                    <GoogleLogin
                        clientId="291942121953-m1gd1d6jrr0nv5qap3uk6pbp0k68asb0.apps.googleusercontent.com"
                        render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                            Google Sign In
                        </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
            </form>
        </Paper>
    </Container>
    );
};

export default Auth
