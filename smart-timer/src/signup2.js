import React from 'react';
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

const signupUrl = "http://localhost:9443/signup";

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

const SignupForm2 = () => {
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values, { setSubmitting }) => {
        const fetchOptions = {
          headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(values, null, 2)
        }
        // console.log(JSON.stringify(values, null, 2));
        fetch(signupUrl,fetchOptions).then((res)=>{
          console.log("Response came");
          // console.log(res.json());
          res.json().then((jres)=>{
            console.log(jres);
          }).catch((err)=>{
            console.log(err);
          });

          console.log(res);
        }).catch((err)=>{
          console.log(err);
        });
      }},
    );
  
    return (
    //   <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:100 ,backgroundColor:'#fafafa'}}>
      // <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:100 ,backgroundColor:'#282c34'}}>
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:100}}>
        <h2>Sign Up</h2>
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
            Register
          </Button>
          {/* </ThemeProvider> */}
        </form>
      </div>
    );
  };

  export default SignupForm2;