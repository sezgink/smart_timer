import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Grid } from '@mui/material';

import './Login.css';
import { ClassNames } from '@emotion/react';

const signupUrl = "https://smart-timer-api.onrender.com/login"
const SignupForm = () => {
  return (
  <div style={{display:'flex',alignItems:'center',justifyContent:'center'}} className="Login">
    <header className='Login-header'>
    <Grid container spacing={2} style={{alignItems:'center',justifyContent:'center',direction:'column'}}>
        <Grid item xs={12}>
    <h1 style={{justifyContent:'center'}}>Sign Up</h1>
        </Grid>
    
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
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
      }}
    >
      {({ isSubmitting }) => (
        <Grid item xs={12}>
        <Form >
          <Field type="email" name="email"  />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          {/* <button type="submit" disabled={isSubmitting}> */}
          <button type="submit">
            Submit
          </button>
        </Form>
        </Grid>
      )}
    </Formik>

    </Grid>
    </header>
  </div>);
};

export default SignupForm;