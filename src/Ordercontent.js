
import $ from "jquery"
import "./index.css";
import React, { useEffect, useState } from "react";
import { Formik, Field,  ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import {   Form } from "react-bootstrap";
import Select from 'react-select'

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@material-ui/icons/Close';
//import Redirect from 'react-router'
//import { fetchlogin, fetchregister,fetchaccountexists ,fetchadminisloggedin,fetchlogout } from './api/app/app.js';
//"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir="C:\tmp"


function Ordercontent () {
    const [hitss, setHitss] = useState([]);
    const [uppdata, setUppdata] = useState([]);
    const [open, setOpen] = useState(false);
    const [deop, setDelete] = useState(false);
    const [add, setAdd] = useState(false);
    const [addfail, setAddfail] = useState(false);
    const options = [
      { value: 'S', label: 'S' },
      { value: 'M', label: 'M' },
      { value: 'L', label: 'L' }
    ]
   
      function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost/clothesshop/api/api.php?action=addorderitem', {
          method: 'POST',
          credentials: 'include',
          body: data
          
        })   .then((headers) =>{
          if(headers.status == 403) {
              console.log('add orderitem failed');
              localStorage.setItem('addfail', '0');
              window.location.reload();
              return;
          }
          if(headers.status == 201) {
              console.log('add orderitem successful');
              localStorage.setItem('adpd', '0');
              window.location.reload();
              return;
          }
        
      })
      .catch(function(error) {console.log(error)});
      }
 
         useEffect(() => {
          let addfail=localStorage.getItem('addfail');
          if(addfail){
            setDelete(true);
          localStorage.removeItem("addfail");
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
            fetch('http://localhost/clothesshop/api/api.php?action=displayordercontent',
            {
                    method: 'POST',
                    credentials: 'include'
                }
                )   .then(response => response.json())
                .then(data =>setHitss(data ));
          },[]);
          $(document).on('click', '.delete', function(event) {
        
            var orderitem_ID = $(this).closest('.itemform').find('.orderitem_ID').html();
            var fd = new FormData();
            fd.append('orderitem_ID',orderitem_ID );
            fetch('http://localhost/clothesshop/api/api.php?action=orderdelete', 
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
            <Collapse in={deop}>
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
               Delete successfull
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
               Added successfull
              </Alert>
            </Collapse>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Collapse in={addfail}>
              <Alert severity="warning"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAddfail(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
              added failed
              </Alert>
            </Collapse>
          </Box>
            <form>
            <table>
            <thead>
                <th>orderitem_ID</th>
                <th>productID</th>
                <th>productname</th>
                <th>price</th>
                <th>size</th>
                <th>orderID</th>
            </thead>
            <tbody >
                  {hitss.map(hit =>(
            <tr class="itemform">
            <td class="orderitem_ID">{hit.orderitem_ID}</td>
            <td class='productID'>{hit.productID}</td>
            <td >{hit.productname}</td>
            <td >{hit.price}</td>
            <td>{hit.size}</td>
            <td>{hit.orderID}</td>
            <td><Button variant="contained" color="primary"
        style={{ display: 'inline-block' }} class="delete"   name="delete" value="delete" >Delete</Button></td>
        
            </tr> ) )}
            </tbody>
        </table>
        </form>

     
        <Formik
      initialValues={{
        orderID:'',
        ProductID:'',
        orderID:'',
        totalprice: '',
    }}
   
      validationSchema={Yup.object().shape({
      
        orderID: Yup.string()
        .max(10)
        .matches( /^[A-Za-z ]*$/, 'Please enter valid orderID')
        .required('orderID is required'),
        totalprice: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid totalprice')
        .required('totalprice is required'),
        ProductID: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid ProductID')
        .required('ProductID is required')
        , 
        orderID: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid orderID')
        .required('orderID is required')
       
      
        
  })}
  render={({ errors, touched }) => (
      <Form onSubmit={handleSubmit} id="orderitem">
          <h2>Add order</h2>
     
              <div className="form-group">
             <label htmlFor="orderID">orderID</label>
             <Field name="orderID"class="updateinput" id="orderID"   type="text" 
             className={'form-control' + (errors.orderID && touched.orderID ? ' is-invalid' : '')}  />
             <ErrorMessage name="orderID" component="div" className="invalid-feedback" />
             </div>
             <div className="form-group">
             <label htmlFor="">ProductID</label>
              <Field name="ProductID" class="updateinput" id="ProductID" type="number" min="0"   className={'form-control' + (errors.ProductID && touched.ProductID ? ' is-invalid' : '')} />
              <ErrorMessage name="ProductID" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
          
              <Field as="select" name="Size">
             <option value="S">S</option>
             <option value="M">M</option>
             <option value="L">L</option>
           </Field>
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
 
export default Ordercontent;