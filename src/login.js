import "./index.css";
import React, { useEffect, useState } from "react";
import { Formik, Field,  ErrorMessage } from 'formik';
import { Route, Redirect } from 'react-router'
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import {   Form } from "react-bootstrap";
//import Redirect from 'react-router'
//import { fetchlogin, fetchregister,fetchaccountexists ,fetchisloggedin,fetchlogout } from './api/app/app.js';
//"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir="C:\tmp"


const Login = props=> {
    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost/clothesshop/api/api.php?action=adminlogin', {
          method: 'POST',
          credentials: 'include',
          body: data
          
        }) .then((headers)=> {
          if(headers.status == 401) {
              console.log('login failed');
              localStorage.removeItem('csrf');
              localStorage.removeItem('username');
              localStorage.removeItem('phone');
              localStorage.removeItem('email');
              localStorage.removeItem('postcode');
              localStorage.removeItem('CustomerID');
              alert('Can not login')
              return;
          }
          if(headers.status == 203) {
              console.log('registration required');
              // only need csrf
          }
          if(headers.status == 200) {
            console.log('login successful');
            window.location.reload();
            // only need csrf
        }
      })
      .catch(function(error) {
          console.log(error)
      });
      }
        return (
          <Formik
          initialValues={{
            username: '',
            password: ''
        }}
          validationSchema={Yup.object().shape({
            username: Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
            .max(40)
            .required('username is required'),
              password: Yup.string()
              .required('Password is required')
      })}
      render={({ errors, touched }) => (
          <Form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor="username">username</label>
                  <Field name="username" id="username"   type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                  <ErrorMessage name="username" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field name="password" id="password" type="password"  className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
              <Button type="submit" variant="contained" color="primary"
            style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>login</Button>
              
              </div>
          </Form>
      )}
    />  );
      
}
 
export default Login;