
import $ from "jquery"
import "./index.css";
import React, { useState,useEffect, Fragment } from "react";
import { Formik, Field,  ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import {   Form } from "react-bootstrap";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@material-ui/icons/Close';
//import Redirect from 'react-router'
//import { fetchlogin, fetchregister,fetchaccountexists ,fetchadminisloggedin,fetchlogout } from './api/app/app.js';
//"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir="C:\tmp"


function Signup () {
    const [hitss, setHitss] = useState([]);
    const [uppdata, setUppdata] = useState([]);
    const [open, setOpen] = useState(false);
    const [pddelete, setDelete] = useState(false);
    const [add, setAdd] = useState(false);

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
          if(headers.status == 403) {
              console.log('updateuser failed');
              localStorage.setItem('deop', '0');
   window.location.reload();
              return;
          }
          if(headers.status == 201) {
          
              console.log('updateuser successful');
              localStorage.setItem('upop', '0');
  window.location.reload();
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
              return;
          }
          if(headers.status == 201) {
              console.log('adduser successful');
              localStorage.setItem('adpd', '0');
              window.location.reload();
              return;
          }
          if(headers.status == 418) {
            console.log('username exist');
            return;
        }
      })
      .catch(function(error) {console.log(error)});
      }
       $(document).on('click', '.update', function(event) {
        let fdid=document.getElementById("CustomerID");
        if (!fdid) {
        var CustomerID = $(this).closest('.userform').find('.userid').html();
        var dd = new FormData();
        dd.append('CustomerID',CustomerID );
        fetch('http://localhost/clothesshop/api/api.php?action=displaysingleuser',
        {
          method: 'POST',
          body: dd,
          credentials: 'include'
            }
            )   .then(response => response.json())
            .then(data =>setUppdata(data))
            .catch(function(error) {console.log(error)});
          }
        
        else{
          var CustomerID = $(this).closest('.userform').find('.userid').html();
          localStorage.setItem('CustomerID', CustomerID);
          window.location.reload();
        }
        
      })
 
         useEffect(() => {
          let upop=localStorage.getItem('upop');
          if(upop){
          setOpen(true);
          localStorage.removeItem("upop");
          }
          let deop=localStorage.getItem('deop');
          if(deop){
            setDelete(true);
          localStorage.removeItem("deop");
          }
          let adpd=localStorage.getItem('adpd');
          if(adpd){
            setAdd(true);
          localStorage.removeItem("adpd");
          }
          
          let uplocal=localStorage.getItem('CustomerID');
          if(uplocal){
            var dd = new FormData();
          dd.append('CustomerID',uplocal );
          fetch('http://localhost/clothesshop/api/api.php?action=displaysingleuser',
          {
            method: 'POST',
            body: dd,
            credentials: 'include'
              }
              )   .then(response => response.json())
              .then(data =>setUppdata(data))
              .catch(function(error) {console.log(error)});
          }
        
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
            <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
               Update successfull
              </Alert>
            </Collapse>
            <Collapse in={add}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAdd(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
               added successfull
              </Alert>
            </Collapse>
         
          </Box>
          <Box sx={{ width: '100%' }}>
            <Collapse in={pddelete}>
              <Alert severity="warning"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setDelete(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
              update failed
              </Alert>
            </Collapse>
          </Box>
           
            <form>
            <table>
            <thead>
                <th>CustomerID</th>
                <th>name</th>
                <th>email</th>
                <th>phone</th>
                <th>postcode</th>
            </thead>
            <tbody >
                  {hitss.map(hit =>(
            <tr class="userform">
            <td class='userid'>{hit.CustomerID}</td>
            <td class='fd-name'>{hit.username}</td>
            <td class='fd-email'>{hit.email}</td>
            <td class='fd-phone'>{hit.phone}</td>
            <td class='fd-postcode'>{hit.postcode}</td>
            <td class='fd-usertype'>{hit.usertype}</td>
            <td><Button variant="contained" color="primary"
        style={{ display: 'inline-block' }} class="update"   name="update" defaultValue="update"  >update</Button></td>
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
         <h2>User update</h2>
          <div className="form-group">
          {uppdata.map(uppdat =>(
                <div>
                  <div>
               <label htmlFor="">CustomerID</label>
              <input name="CustomerID" class="updateinput" id="CustomerID" type="number" min="0" defaultValue={uppdat.CustomerID}   className={'form-control' + (errors.CustomerID && touched.CustomerID ? ' is-invalid' : '')} ></input>
              <ErrorMessage name="CustomerID" component="div" className="invalid-feedback" />
              </div>
             <label htmlFor="username">username</label>
             <input name="username"class="updateinput" id="username"   type="text" defaultValue={uppdat.username} 
             className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}  />
             <ErrorMessage name="username" component="div" className="invalid-feedback" />
             <label htmlFor="email">email</label>
              <input name="email" id="email"class="updateinput" type="text" min="0" defaultValue= {uppdat.email}  
              className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
              <label htmlFor="phone">phone</label>
              <input name="phone" id="phone" class="updateinput"type="text" defaultValue={uppdat.phone}  className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
              <ErrorMessage name="types" component="div" className="invalid-feedback" />
              <label htmlFor="postcode">postcode</label>
              <input  name="postcode" id="postcode"class="updateinput" type="text" defaultValue={uppdat.postcode}   className={'form-control' + (errors.postcode && touched.postcode ? ' is-invalid' : '')} />
              <ErrorMessage name="postcode" component="div" className="invalid-feedback" />
              <label htmlFor="password">password</label>
              <input  name="password" id="password"class="updateinput" type="text"    className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
             
              <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>Update user</Button>
             </div>
            ) )}
          </div> 
      </form>
     
  )}
/>

<Formik
      initialValues={{
        username:'',
        email: '',
        phone: '',
        postcode:'',
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
          <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>add user</Button>
          </div>
      </Form>
  )}
/>
       
        </body>

          )
          
  }
 
export default Signup;