
import $ from "jquery"
import "./index.css";
import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import { Formik, Field,  ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import {   Form } from "react-bootstrap";
//import Redirect from 'react-router'
//import { fetchlogin, fetchregister,fetchaccountexists ,fetchisloggedin,fetchlogout } from './api/app/app.js';
//"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir="C:\tmp"


function User () {
    const [hitss, setHitss] = useState([]);
  
    function onChange(evt) {
        this.setState({
          value: evt.target.value.replace(/[^a-zA-Z]/g, '')
        });
     };
     function handleUpdate(event){
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost/clothesshop/api/api.php?action=updateuser', {
          method: 'POST',
          credentials: 'include',
          body: data
          
        })   .then((headers) =>{
          if(headers.status == 400) {
              console.log('updateuser failed');
              alert('You are not loggin');
              return;
          }
          if(headers.status == 201) {
              console.log('updateuser successful');
    
              return;
          }
      })
      .catch(function(error) {console.log(error)});
      }
      function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost/clothesshop/api/api.php?action=adminadduser', {
          method: 'POST',
          credentials: 'include',
          body: data
          
        })   .then((headers) =>{
          if(headers.status == 403) {
              console.log('adduser failed');
              alert('You are not loggin');
              return;
          }
          if(headers.status == 201) {
              console.log('adduser successful');
             
              return;
          }
          if(headers.status == 418) {
            console.log('username exist');
            return;
        }
      })
      .catch(function(error) {console.log(error)});
      }
    
 
         useEffect(() => {
            fetch('http://localhost/clothesshop/api/api.php?action=displayuser',
            {
                    method: 'POST',
                    credentials: 'include'
                }
                )   .then(response => response.json())
                .then(data =>setHitss(data ));
          },[]);
          return (
            <body>
            <form>
            <table>
            <thead>
                <th>CustomerID</th>
                <th>name</th>
                <th>email</th>
                <th>phone</th>
                <th>postcode</th>
            </thead>
            <tbody id="orderform">
                  {hitss.map(hit =>(
            <tr>
            <td class='fd-id'>{hit.CustomerID}</td>
            <td class='fd-name'>{hit.username}</td>
            <td class='fd-email'>{hit.email}</td>
            <td class='fd-phone'>{hit.phone}</td>
            <td class='fd-postcode'>{hit.postcode}</td>
            <td class='fd-usertype'>{hit.usertype}</td>
            </tr> ) )}
            </tbody>
        </table>
        </form>

        <Formik
      initialValues={{
        username:'',
        email: '',
        CustomerID:'',
        phone: '',
        types:'',
        password:'',
        usertypes:''
    }}
   
      validationSchema={Yup.object().shape({
        email: Yup.string()
        .matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter valid email')
        .max(40)
        .required('email is required'),
        username: Yup.string()
        .max(10)
        .matches( /^[A-Za-z ]*$/, 'Please enter valid username')
        .required('username is required'),
        CustomerID: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid CustomerID')
        .required('CustomerID is required'),
        phone: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid phone')
        .required('phone is required'),
        postcode: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid phone')
        .required('phone is required')
        , 
        password: Yup.string()
        .max(20)
        .required('password is required'),
        usertypes: Yup.string()
        .max(10)
        .matches( /^[A-Za-z ]*$/, 'Please enter valid types')
        .required('types is required')
        
  })}
  render={({ errors, touched }) => (
      <form onSubmit={handleUpdate} id="updateuser">
          <h2>Update user</h2>
          <div className="form-group">
              <label htmlFor="">CustomerID</label>
              <Field name="CustomerID" id="CustomerID" type="text" min="0" className={'form-control' + (errors.CustomerID && touched.CustomerID ? ' is-invalid' : '')} />
              <ErrorMessage name="CustomerID" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="">username</label>
              <Field name="username" id="regusername" type="text" min="0" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
              <ErrorMessage name="username" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="email">email</label>
              <Field name="email" id="regemail"   type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="phone">phone</label>
              <Field name="phone" id="regphone" type="number"  min="400000000" max="499999999" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
              <ErrorMessage name="phone" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="postcode">postcode</label>
              <Field name="postcode" id="regpostcode" type="text"  className={'form-control' + (errors.postcode && touched.postcode ? ' is-invalid' : '')} />
              <ErrorMessage name="postcode" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="password">password</label>
              <Field  name="password" id="password" type="text"  className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="usertypes">usertypes</label>
              <Field  name="usertypes" id="usertypes" type="text"  className={'form-control' + (errors.usertypes && touched.usertypes ? ' is-invalid' : '')} />
              <ErrorMessage name="usertypes" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
          <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>update</Button>
          </div>
      </form>
  )}
/>

<Formik
      initialValues={{
        username:'',
        email: '',
        phone: '',
        types:'',
        password:''
    }}
   
      validationSchema={Yup.object().shape({
        email: Yup.string()
        .matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter valid email')
        .max(40)
        .required('email is required'),
        username: Yup.string()
        .max(10)
        .matches( /^[A-Za-z ]*$/, 'Please enter valid username')
        .required('username is required'),
        phone: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid phone')
        .required('phone is required'),
        postcode: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid phone')
        .required('phone is required')
        , 
        password: Yup.string()
        .max(20)
        .required('password is required'),
        usertypes: Yup.string()
        .max(10)
        .matches( /^[A-Za-z ]*$/, 'Please enter valid types')
        .required('types is required')
        
  })}
  render={({ errors, touched }) => (
      <Form onSubmit={handleSubmit} id="updateuser">
          <h2>Add user</h2>
          <div className="form-group">
              <label htmlFor="">username</label>
              <Field name="username" id="username" type="text" min="0" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
              <ErrorMessage name="username" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="email">email</label>
              <Field name="email" id="email"   type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="phone">phone</label>
              <Field name="phone" id="phone" type="number"  min="400000000" max="499999999" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
              <ErrorMessage name="phone" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="postcode">postcode</label>
              <Field name="postcode" id="postcode" type="text"  className={'form-control' + (errors.postcode && touched.postcode ? ' is-invalid' : '')} />
              <ErrorMessage name="postcode" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="password">password</label>
              <Field  name="password" id="password" type="text"  className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="usertypes">usertypes</label>
              <Field  name="usertypes" id="usertypes" type="text"  className={'form-control' + (errors.usertypes && touched.usertypes ? ' is-invalid' : '')} />
              <ErrorMessage name="usertypes" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
          <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>add user</Button>
          </div>
      </Form>
  )}
/>
       
        </body>

          )
          
  }
 
export default User;