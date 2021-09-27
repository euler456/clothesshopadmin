
import $ from "jquery"
import "./index.css";
import React, { useEffect, useState } from "react";

import { Formik, Field,  ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import {   Form } from "react-bootstrap";
//import Redirect from 'react-router'
//import { fetchlogin, fetchregister,fetchaccountexists ,fetchisloggedin,fetchlogout } from './api/app/app.js';
//"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir="C:\tmp"


function Product () {
    const [hits, setHits] = useState([]);
  
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
              return;
          }
      })
      .catch(function(error) {console.log(error)});
      }
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
              window.location.reload();
              return;
          }
      })
      .catch(function(error) {console.log(error)});
      }
 
         useEffect(() => {
            fetch('http://localhost/clothesshop/api/api.php?action=displayproduct',
            {
                    method: 'POST',
                    credentials: 'include'
                }
                )   .then(response => response.json())
                .then(data =>setHits(data ));
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
                    return;
                }
               
            })
            .catch(function(error) {console.log(error)});
            
          });
          return (
            <body>
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
            <td ><img src={require(`./pic/${hit.image}.jpg`).default}></img></td>
            <td class='price'>{hit.price}</td>
            <td>{hit.types}</td>
            <td><Button variant="contained" color="primary"
        style={{ display: 'inline-block' }} class="delete"   name="delete" value="delete" >Delete</Button></td>
            </tr> ) )}
            </tbody>
        </table>
        </form>
        <Formik
      initialValues={{
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
      <Form onSubmit={handleupdate} id="updateproduct">
          <h2>Product update</h2>
          <div className="form-group">
              <label htmlFor="">productID</label>
              <Field name="productID" id="productID2" type="number" min="0" className={'form-control' + (errors.productID && touched.productID ? ' is-invalid' : '')} />
              <ErrorMessage name="productID" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="productname">productname</label>
              <Field name="productname" id="productname2"   type="text" className={'form-control' + (errors.productname && touched.productname ? ' is-invalid' : '')} />
              <ErrorMessage name="productname" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="price">price</label>
              <Field name="price" id="price2" type="number" min="0" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
              <ErrorMessage name="price" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="types">types</label>
              <Field name="types" id="types2" type="text"  className={'form-control' + (errors.types && touched.types ? ' is-invalid' : '')} />
              <ErrorMessage name="types" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="image">image</label>
              <Field  name="image" id="image2" type="text"  className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} />
              <ErrorMessage name="image" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
          <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>Update products</Button>
          </div>
      </Form>
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
      <Form onSubmit={handleSubmit} id="addproductform">
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
              <Field name="image" value="Tshirt" id="image" type="text"  className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} />
              <ErrorMessage name="image" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
          <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>Add</Button>
          </div>
      </Form>
  )}
/>


     
        </body>
          )
          
  }
 
export default Product;