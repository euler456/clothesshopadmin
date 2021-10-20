
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

//"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir="C:\tmp"


function Signup () {
    const [open, setOpen] = useState(false);
    const [pddelete, setDelete] = useState(false);
    const [add, setAdd] = useState(false); 
    const [ueex, setUeex] = useState(false);

      function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost/clothesshop/api/api.php?action=registeradmin', {
          method: 'POST',
          credentials: 'include',
          body: data
          
        })   .then((headers) =>{
          if(headers.status == 403) {
              console.log('register failed');
              localStorage.setItem('rgfl', '0');
              return;
          }
          if(headers.status == 201) {
              console.log('register successful');
              localStorage.setItem('rgsc', '0');
              window.location.reload();
              return;
          }
          if(headers.status == 418) {
            console.log('username exist');
            localStorage.setItem('ueex', '0');
            window.location.reload();
            return;
        }
      })
      .catch(function(error) {console.log(error)});
      }
   
 
         useEffect(() => {
          let rgfl=localStorage.getItem('rgfl');
          if(rgfl){
            setDelete(true);
          localStorage.removeItem("rgfl");
          }
          let rgsc=localStorage.getItem('rgsc');
          if(rgsc){
            setAdd(true);
          localStorage.removeItem("rgsc");
          }
          let ueex=localStorage.getItem('ueex');
          if(ueex){
            setUeex(true);
          localStorage.removeItem("ueex");
          }
     
          });
          return (
            <body>
            <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
              <Alert severity="warning"
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
              Register failed
              </Alert>
            </Collapse>
            <Collapse in={ueex}>
              <Alert severity="warning"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setUeex(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
              Username already exist
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
               Register successfull
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
           
     

<Formik
      initialValues={{
        username:'',
        password:''
    }}
   
      validationSchema={Yup.object().shape({
        username: Yup.string()
        .max(10)
        .matches( /^[A-Za-z ]*$/, 'Please enter valid username')
        .required('username is required'),
        password: Yup.string()
        .max(30)
        .required('password is required')
      
  })}
  render={({ errors, touched }) => (
      <Form onSubmit={handleSubmit} id="updateuser">
          <h2>Admin Register</h2>
          <div className="form-group">
              <label htmlFor="">username</label>
              <Field name="username" id="username" type="text" min="0" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
              <ErrorMessage name="username" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="password">password</label>
              <Field  name="password" id="password" type="text"  className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>
         
          <div className="form-group">
          <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>Register</Button>   
          </div>
      </Form>
  )}
/>
       
        </body>

          )
          
  }
 
export default Signup;