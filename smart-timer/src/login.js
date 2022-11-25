import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import Button from '@material-ui/core/Button';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
// import TextField from '@material-ui/core/TextField';
import SignupForm from './signup';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { color } from '@mui/system';
import { Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate } from 'react-router-dom';

const loginUrl = "http://localhost:9443/user/login";

const loginTheme = createTheme({
    palette: {
        primary:{
            main:"#FFFFFF",
            darker:"#FEFEFE"
        },
        secondary:{
            main:"#FEFEFEFE",
            darker:"#EEEEEE"
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
          }
      
    }
  });

const validationSchema = yup.object({
  email: yup
    // .string('Enter your email')
    .string()
    // .email('Enter a valid email')
    .max(255)
    .required('Email is required')
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Enter a valid e-mail ")
    ,

  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const LoginForm = (props) => {

    let [submitting,setSubmitting]=useState(false);
    let [errorMessage,setErrorMessage]=useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      // onSubmit: (values, { setSubmitting }) => {
      onSubmit: (values) => {
        const fetchOptions = {
          headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(values, null, 2)
        }
        setSubmitting(true);
        // console.log(JSON.stringify(values, null, 2));
        fetch(loginUrl,fetchOptions).then((res)=>{
          console.log("Response came");
          // console.log(res.json());
          res.json().then((jres)=>{
            console.log(jres);
            
            if(res.status===400){
              console.log("Wrong email or password");
              setErrorMessage(true);
              // alert("Wrong email or password!");
            }

            if(jres.token != null && jres.user != null){
              console.log(jres.user._id);
              props.setUserState({isSigned:true,token:jres.token,user:jres.user});
              navigate("/");
              localStorage.setItem("token",jres.token);
              localStorage.setItem("user",JSON.stringify(jres.user));
              // props.setUserState({isSigned:true,token:jres.token});
            }
            
          }).catch((err)=>{
            console.log(err);
          });

          setSubmitting(false);

          console.log(res);
        }).catch((err)=>{
          console.log(err);
          setSubmitting(false);
        });
      }},
    );
  
    return (
    //   <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:100 ,backgroundColor:'#fafafa'}}>
      // <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:100 ,backgroundColor:'#282c34'}}>
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:100}}>
        <h2>Sign In</h2>
        {submitting?<CircularProgress />:null}
        {errorMessage?<p style={{color:"#be4d25"}}>Wrong email or password!</p> : null}
        
        <form onSubmit={formik.handleSubmit}>
            {/* <ThemeProvider theme={loginTheme}> */}

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            color='primary'
            
            variant='outlined'
            
            
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            style={{marginTop:20}}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            variant="outlined"
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            style={{marginTop:20, color:'#ffffff'}}
            
          />
          <Button color="primary" variant="contained" fullWidth type="submit" style={{marginTop:20}}>
            Login
          </Button>
          {/* </ThemeProvider> */}
        </form>

        <h3>Don't you have an account? <Link href="/signup">Register here</Link></h3>
      </div>
    );
  };

  export default LoginForm;