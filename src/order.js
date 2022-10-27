
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


function Order () {
    const [hitss, setHitss] = useState([]);
    const [uppdata, setUppdata] = useState([]);
    const [open, setOpen] = useState(false);
    const [pddelete, setDelete] = useState(false);
    const [add, setAdd] = useState(false);
    const [odup, setOdup] = useState(false);
    
    function handleUpdate(event){
      event.preventDefault();
      const data = new FormData(event.target);
      fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=updateorder', {
        method: 'POST',
        credentials: 'include',
        body: data
        
      })   .then((headers) =>{
        if(headers.status == 403) {
            console.log('updateorder failed');
            localStorage.setItem('odup', '0');
 window.location.reload();
            return;
        }
        if(headers.status == 201) {
         
            console.log('updateorder successful');
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
        fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=addorder', {
          method: 'POST',
          credentials: 'include',
          body: data
          
        })  .then((headers) =>{
          if(headers.status == 403) {
              console.log('addorder failed');
              return;
          }
          if(headers.status == 201) {
              console.log('addorder successful');
              localStorage.setItem('adpd', '0');
              window.location.reload();
              return;
          }

      })
      .catch(function(error) {console.log(error)});
      }
      $(document).on('click', '.update', function(event) {
        let fdid=document.getElementById("orderID");
        if (!fdid) {
        var orderID = $(this).closest('.orderform').find('.orderID').html();
        var dd = new FormData();
        dd.append('orderID',orderID );
        fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=displaysingleorder',
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
          var orderID = $(this).closest('.orderform').find('.orderID').html();
          localStorage.setItem('orderID', orderID);
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
          if(odup){
            setOdup(true);
          localStorage.removeItem("odup");
          }
          let uplocal=localStorage.getItem('orderID');
          if(uplocal){
            var dd = new FormData();
          dd.append('orderID',uplocal );
          fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=displaysingleorder',
          {
            method: 'POST',
            body: dd,
            credentials: 'include'
              }
              )   .then(response => response.json())
              .then(data =>setUppdata(data))
              .catch(function(error) {console.log(error)});
          }
        
            fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=displayorder',
            {
                    method: 'POST',
                    credentials: 'include'
                }
                )   .then(response => response.json())
                .then(data =>setHitss(data ));
          },[]);
          $(document).on('click', '.delete', function(event) {
        
            var orderID = $(this).closest('.orderform').find('.orderID').html();
            var fd = new FormData();
            fd.append('orderID',orderID );
            fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=deleteOrder', 
            {
                method: 'POST',
                body: fd,
                credentials: 'include'
            })
            .then(function(headers) {
              if(headers.status == 400) {
                  console.log('can not delete');
                  return;
              }
           
              if(headers.status == 201) {
                  console.log('delete succussful');
                  localStorage.setItem('deop', '0');
                  window.location.reload();
                  return;
              }
             
          })
          .catch(function(error) {console.log(error)});
            
          });
     
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
              <Alert 
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
              delete successful
              </Alert>
            </Collapse>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Collapse in={odup}>
              <Alert severity="warning"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOdup(false);
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
                <th>orderID</th>
                <th>orderstatus</th>
                <th>ordertime</th>
                <th>CustomerID</th>
                <th>totalprice</th>
            </thead>
            <tbody >
                  {hitss.map(hit =>(
            <tr class="orderform">
            <td class='orderID'>{hit.orderID}</td>
            <td class='fd-orderstatus'>{hit.orderstatus}</td>
            <td class='fd-ordertime'>{hit.ordertime}</td>
            <td class='fd-CustomerID'>{hit.CustomerID}</td>
            <td class='fd-totalprice'>{hit.totalprice}</td>
            <td><Button variant="contained" color="primary"
        style={{ display: 'inline-block' }} class="delete"   name="delete" value="delete" >Delete</Button></td>
           <td><Button variant="contained" color="primary"
        style={{ display: 'inline-block' }} class="update"   name="update" defaultValue="update"  >update</Button></td>
            </tr> ) )}
            </tbody>
        </table>
        </form>
        <Formik
      initialValues={{
        orderstatus:'',
        CustomerID:'',
        orderID:'',
        totalprice: '',
    }}
   
      validationSchema={Yup.object().shape({
        orderID: Yup.string()
        .max(10)
        .matches( /^[A-Za-z ]*$/, 'Please enter valid CustomerID')
        .required('CustomerID is required'),
      
        orderstatus: Yup.string()
        .max(10)
        .matches( /^[A-Za-z ]*$/, 'Please enter valid orderstatus')
        .required('orderstatus is required'),
        CustomerID: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid CustomerID')
        .required('CustomerID is required'),
        totalprice: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid totalprice')
        .required('totalprice is required'),
     
        
  })}
  render={({ errors, touched }) => (
      <form onSubmit={handleUpdate}  id="updateproduct">
         <h2>Orderstatus update</h2>
          <div className="form-group">
          {uppdata.map(uppdat =>(
                <div>
                <div>
               <label htmlFor="">orderID</label>
              <input name="orderID" class="updateinput" id="orderID" type="number" min="0" defaultValue={uppdat.orderID}   className={'form-control' + (errors.orderID && touched.orderID ? ' is-invalid' : '')} ></input>
              <ErrorMessage name="orderID" component="div" className="invalid-feedback" />
              </div>
             <label htmlFor="orderstatus">orderstatus</label>
             <input name="orderstatus"class="updateinput" id="orderstatus"   type="text" defaultValue={uppdat.orderstatus} 
             className={'form-control' + (errors.orderstatus && touched.orderstatus ? ' is-invalid' : '')}  />
             <ErrorMessage name="orderstatus" component="div" className="invalid-feedback" />
            
             <label htmlFor="">CustomerID</label>
              <input name="CustomerID" class="updateinput" id="CustomerID" type="number" min="0" defaultValue={uppdat.CustomerID}   className={'form-control' + (errors.CustomerID && touched.CustomerID ? ' is-invalid' : '')} ></input>
              <ErrorMessage name="CustomerID" component="div" className="invalid-feedback" />
             
              <label htmlFor="totalprice">totalprice</label>
              <input name="totalprice" id="totalprice" class="updateinput" type="text" defaultValue={uppdat.totalprice}  className={'form-control' + (errors.totalprice && touched.totalprice ? ' is-invalid' : '')} />
              <ErrorMessage name="types" component="div" className="invalid-feedback" />
  
             
              <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>Update order</Button>
             </div>
            ) )}
          </div> 
      </form>
     
  )}
/>

<Formik
      initialValues={{
        orderstatus:'',
        CustomerID:'',
        orderID:'',
        totalprice: '',
    }}
   
      validationSchema={Yup.object().shape({
      
        orderstatus: Yup.string()
        .max(10)
        .matches( /^[A-Za-z ]*$/, 'Please enter valid orderstatus')
        .required('orderstatus is required'),
        totalprice: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid totalprice')
        .required('totalprice is required'),
        CustomerID: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid CustomerID')
        .required('CustomerID is required')
        , 
        orderID: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid orderID')
        .required('orderID is required')
       
      
        
  })}
  render={({ errors, touched }) => (
      <Form onSubmit={handleSubmit} id="order">
          <h2>Add order</h2>
          <div className="form-group">
             <label htmlFor="orderstatus">orderstatus</label>
             <Field name="orderstatus"class="updateinput" id="orderstatus"   type="text" 
             className={'form-control' + (errors.orderstatus && touched.orderstatus ? ' is-invalid' : '')}  />
             <ErrorMessage name="orderstatus" component="div" className="invalid-feedback" />
          </div>
             <div className="form-group">
             <label htmlFor="">CustomerID</label>
              <Field name="CustomerID" class="updateinput" id="CustomerID" type="number" min="0"   className={'form-control' + (errors.CustomerID && touched.CustomerID ? ' is-invalid' : '')} />
              <ErrorMessage name="CustomerID" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
             
              <label htmlFor="totalprice">totalprice</label>
              <Field name="totalprice" id="totalprice" class="updateinput"type="text"  className={'form-control' + (errors.totalprice && touched.totalprice ? ' is-invalid' : '')} />
              <ErrorMessage name="types" component="div" className="invalid-feedback" />
              </div>
         
          <div className="form-group">
          <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>add order</Button>
          </div>
      </Form>
  )}
/>
     

        </body>

          )
          
  }
 
export default Order;