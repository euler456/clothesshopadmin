
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


function Product () {
    const [hits, setHits] = useState([]);
    const [uppdata, setUppdata] = useState([]);
    const [open, setOpen] = useState(false);
    const [pddelete, setDelete] = useState(false);
    const [add, setAdd] = useState(false);
    function handleupdate(event){
        event.preventDefault();
       
        const data = new FormData(event.target);
        fetch('http://localhost/clothesshop/api/api.php?action=updateproduct', {
          method: 'POST',
          credentials: 'include',
          body: data
          
        })   .then((headers) =>{
          if(headers.status == 403) {
              console.log('updatefood failed');
              alert('You are not loggin');
              return;
          }
          if(headers.status == 201) {
              console.log('updatefood successful');
              localStorage.setItem('upop', '0');
              window.location.reload();
              return;
          }
      })
      .catch(function(error) {console.log(error)});
      }
     
      $(document).on('click', '.update', function(event) {
        let pdid=document.getElementById("productID2");
        if (!pdid) {
        var productID = $(this).closest('.chartcontainer').find('.pdID').html();
        var dd = new FormData();
        dd.append('productID',productID );
        fetch('http://localhost/clothesshop/api/api.php?action=displaysingleproduct',
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
          var productID = $(this).closest('.chartcontainer').find('.pdID').html();
          localStorage.setItem('productID', productID);
          window.location.reload();
        }
        
      })
        
  
    
     
    
      function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost/clothesshop/api/api.php?action=addproduct', {
          method: 'POST',
          credentials: 'include',
          body: data
          
        })   .then((headers) =>{
          if(headers.status == 400) {
              console.log('addfood failed');
              alert('You are not loggin');
              return;
          }
          if(headers.status == 201) {
              console.log('addfood successful');
              localStorage.setItem('adpd', '0');
              window.location.reload();
              return;
          }
      })
      .catch(function(error) {console.log(error)});
      }
    
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
          
          let uplocal=localStorage.getItem('productID');
          if(uplocal){
            var dd = new FormData();
          dd.append('productID',uplocal );
          fetch('http://localhost/clothesshop/api/api.php?action=displaysingleproduct',
          {
            method: 'POST',
            body: dd,
            credentials: 'include'
              }
              )   .then(response => response.json())
              .then(data =>setUppdata(data))
              .catch(function(error) {console.log(error)});
          }
            fetch('http://localhost/clothesshop/api/api.php?action=displayproduct',
            {
                    method: 'POST',
                    credentials: 'include'
                }
                )   .then(response => response.json())
                .then(data =>setHits(data));
          },[]);
          $(document).on('click', '.delete', function(event) {
        
            var productID = $(this).closest('.chartcontainer').find('.pdID').html();
            var fd = new FormData();
            fd.append('productID',productID );
            fetch('http://localhost/clothesshop/api/api.php?action=deleteProduct', 
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
            
          }) 
         
        
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
         delete successfull
        </Alert>
      </Collapse>
    </Box>
            <form>

            <table id="adminproductform">
            <thead>
            <th>ID</th>
          
                <th>Name</th>
                <th>image</th>
                <th>Price</th>
                <th>types</th>
            </thead>
            <tbody >
                  {hits.map(hit =>(
                <tr class="chartcontainer">
                  <td class='pdID'>{hit.productID}</td>
            <td class='fd-name'>{hit.productname}</td>
            <td >{hit.image}</td>
            <td class='price'>{hit.price}</td>
            <td>{hit.types}</td>
            <td><Button variant="contained" color="primary"
        style={{ display: 'inline-block' }} class="delete"   name="delete" defaultValue="delete" >Delete</Button></td>
         <td><Button variant="contained" color="primary"
        style={{ display: 'inline-block' }} class="update"   name="update" defaultValue="update"  >update</Button></td>
            </tr> ) )}
            </tbody>
        </table>
        </form>

        <Formik
      initialdeValues={{
        productID:'',
        productname: '',
        price: '',
        types:'',
        image:''
    }}
   
      validationSchema={Yup.object().shape({
        productname: Yup.string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid productname')
        .max(40)
        .required('productname is required'),
        productID: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid foodID')
        .required('foodID is required'),
        price: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid price')
        .required('price is required'),
        types: Yup.string()
        .max(10)
        .matches( /^[A-Za-z ]*$/, 'Please enter valid types')
        .required('types is required')
        ,  image: Yup.string()
        .max(20)
        .required('image is required')
  })}
  render={({ errors, touched }) => (
      <form onSubmit={handleupdate} id="updateproduct">
          <h2>Product update</h2>
          
          <div className="form-group">
          {uppdata.map(uppdat =>(
                <div>
               <label htmlFor="">productID</label>
              <input name="productID" class="updateinput" id="productID2" type="number" min="0" defaultValue={uppdat.productID}   className={'form-control' + (errors.productID && touched.productID ? ' is-invalid' : '')} ></input>
              <ErrorMessage name="productID" component="div" className="invalid-feedback" />
             <label htmlFor="productname">productname</label>
             <input name="productname"class="updateinput" id="productname"   type="text" defaultValue={uppdat.productname} 
             className={'form-control' + (errors.productname && touched.productname ? ' is-invalid' : '')}  />
             <ErrorMessage name="productname" component="div" className="invalid-feedback" />
             <label htmlFor="price">price</label>
              <input name="price" id="price2"class="updateinput" type="number" min="0" defaultValue= {uppdat.price}  
              className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
              <ErrorMessage name="price" component="div" className="invalid-feedback" />
              <label htmlFor="types">types</label>
              <input name="types" id="types2" class="updateinput"type="text" defaultValue={uppdat.types}  className={'form-control' + (errors.types && touched.types ? ' is-invalid' : '')} />
              <ErrorMessage name="types" component="div" className="invalid-feedback" />
              <label htmlFor="image">image</label>
              <input  name="image" id="image2"class="updateinput" type="text" defaultValue={uppdat.image}   className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} />
              <ErrorMessage name="image" component="div" className="invalid-feedback" />
              <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>Update products</Button>
             </div>
            ) )}
              
          </div> 
      </form>
  )}
/>
       <Formik
      initialValues={{
        productname: '',
        price: '',
        types:'',
        image:''
    }}
   
      validationSchema={Yup.object().shape({
        productname: Yup.string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid productname')
        .max(40)
        .required('productname is required'),
        price: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid price')
        .required('price is required'),
        types: Yup.string()
        .max(10)
        .matches( /^[A-Za-z ]*$/, 'Please enter valid types')
        .required('types is required')
        ,  image: Yup.string()
        .max(20)
        .required('image is required')
  })}
  render={({ errors, touched }) => (
      <form onSubmit={handleSubmit} id="addproductform">
          <h2>Add product</h2>
          <div className="form-group">
              <label htmlFor="productname">productname</label>
              <Field name="productname" id="productname"   type="text" className={'form-control' + (errors.productname && touched.productname ? ' is-invalid' : '')} />
              <ErrorMessage name="productname" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="price">price</label>
              <Field name="price" id="price" type="number" min="0" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
              <ErrorMessage name="price" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="types">types</label>
              <Field name="types" id="types" type="text"  className={'form-control' + (errors.types && touched.types ? ' is-invalid' : '')} />
              <ErrorMessage name="types" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="image">image</label>
              <Field name="image" defaultValue="Tshirt" id="image" type="text"  className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} />
              <ErrorMessage name="image" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
          <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>Add</Button>
          </div>
      </form>
  )}
/>


     
        </body>
          )
          
  }
 
export default Product;