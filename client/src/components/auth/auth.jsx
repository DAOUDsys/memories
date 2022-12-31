import React from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import useStyles from "./auth.style.js";
import Icon from "./icon.js";
import Input from "./input.jsx";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import { signIn, signUp } from "../../actions/auth.action.js";
import { authActionTypes } from "../../constants/action_types.js";


function Auth() {
  const styles = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emptyForm = {firstName: '',lastName: '',email: '', password: '', confirmPassword: '', image: ''};
  const [formData, setFormData] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);

  const googleSuccess = async (res) => {
    try {
      const decodedHeader = jwt_decode(res.credential);
      const token = res.credential;
      const { name, sub, picture, email } = decodedHeader;
      
      const result = {
        _id: sub,
        name: name,
        email: email,
        image: picture,
      };
      dispatch({ type: authActionTypes.AUTH, data: {result, token} });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log("Google sign in has an error");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignUp) {
      if(formData.password === formData.confirmPassword)
      dispatch(signUp(formData, navigate));
      else 
      console.log("passwords doesn't match");
    } else {
      dispatch(signIn(formData, navigate));
      
    }
    
  };
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
  };
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleForget = () => { }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={styles.paper} elevation={3}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                  autoFocus
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                type={showPassword ? 'text' : 'password'}
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <div className={styles.googleButton}>
            <GoogleLogin
              render={(renderProps) => (
                <Button
                  className={styles.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onError={googleFailure}
              cookiePolicy={"single_host_origin"}
              shape="pill"
              theme="filled_blue"
              width="280px"
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid type="item">
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have account? Sign In"
                  : "Don't have account? Sign Up"}
              </Button>
              <Button onClick={handleForget}>
                {!isSignUp
                  && "Forget Password"
                  }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
