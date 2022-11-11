import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Grid } from '@mui/material';

const signupUrl = "http://localhost:9443/login"
const SignupForm = () => (
  <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
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
        console.log("Submiting");
        const fetchOptions = {
          headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(values, null, 2)
        }
        console.log(JSON.stringify(values, null, 2));
        fetch(signupUrl,fetchOptions).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log(err);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Grid item xs={12}>
        <Form style={{display:'flex',justifyContent:'center'}}>
          <Field type="email" name="email" style={{display:'flex',justifyContent:'center'}}  />
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
  </div>
);

export default SignupForm;