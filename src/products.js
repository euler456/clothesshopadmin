

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
    const [hits, order] = useState([]);
    const [redirect, isnotlogin] = useState(false);
    function handleupdate(event){
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost/clothesshop/api/api.php?action=updatefood', {
          method: 'POST',
          credentials: 'include',
          body: data
          
        })   .then((headers) =>{
          if(headers.status == 400) {
              console.log('updatefood failed');
              alert('You are not loggin');
              return;
          }
          if(headers.status == 201) {
              console.log('updatefood successful');
              window.location.reload();
              return;
          }
      })
      .catch(function(error) {console.log(error)});
      }
      function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost/clothesshop/api/api.php?action=addfood', {
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

      function fetchfooddelete(dd){
        console.log(dd);
        const fd = new FormData();
        fd.append('F_ID', dd);
        console.log(fd);
       fetch('http://localhost/clothesshop/api/api.php?action=deleteFOOD', 
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
               window.location.reload();
               return;
           }
       })
       .catch(function(error) {console.log(error)});
         }

    if(isnotlogin){
          return (
            <body>
            <form>
            <table>
            <thead>
                <th>Name</th>
                <th>image</th>
                <th>Price</th>
                <th>Quantity</th>
            </thead>
            <tbody id="orderform">
                  {hits.map(hit =>(
            <tr>
            <td class='fd-id'>{hit.F_ID}</td>
            <td class='fd-name'>{hit.foodname}</td>
            <td ><img src={require(`./pic/${hit.image}.jpg`).default}></img></td>
            <td class='price'>{hit.price}</td>
            <td>{hit.options}</td>
            <td><Button variant="contained" color="primary"
        style={{ display: 'inline-block' }} type="submit" name="delete" value="delete"  onClick={fetchfooddelete(`${hit.F_ID}`)}>Delete</Button></td>
            </tr> ) )}
            </tbody>
        </table>
        </form>
      
       <Formik
      initialValues={{
        foodname: '',
        price: '',
        description:'',
        options:'',
        image:''
    }}
   
      validationSchema={Yup.object().shape({
        foodname: Yup.string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid foodname')
        .max(40)
        .required('foodname is required'),
        price: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid price')
        .required('price is required'),
        description: Yup.string()
        .max(10)
        .matches(/^[A-Za-z ]*$/, 'Please enter valid description')
        .required('description is required'),
        options: Yup.string()
        .max(10)
        .matches( /^[A-Za-z ]*$/, 'Please enter valid options')
        .required('options is required')
        ,  image: Yup.string()
        .max(20)
        .required('image is required')
  })}
  render={({ errors, touched }) => (
      <Form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="foodname">foodname</label>
              <Field name="foodname" id="foodname"   type="text" className={'form-control' + (errors.foodname && touched.foodname ? ' is-invalid' : '')} />
              <ErrorMessage name="foodname" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="price">price</label>
              <Field name="price" id="price" type="number" min="0" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
              <ErrorMessage name="price" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="description">description</label>
              <Field name="description" id="description" type="text"  className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
              <ErrorMessage name="description" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="options">options</label>
              <Field name="options" id="options" type="text"  className={'form-control' + (errors.options && touched.options ? ' is-invalid' : '')} />
              <ErrorMessage name="options" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="image">image</label>
              <Field name="image" value="gruel" id="image" type="text"  className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} />
              <ErrorMessage name="image" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
          <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>Add food</Button>
          </div>
      </Form>
  )}
/>

<Formik
      initialValues={{
        F_ID:'',
        foodname: '',
        price: '',
        description:'',
        options:'',
        image:''
    }}
   
      validationSchema={Yup.object().shape({
        foodname: Yup.string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid foodname')
        .max(40)
        .required('foodname is required'),
        F_ID: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid foodID')
        .required('foodID is required'),
        price: Yup.string()
        .max(10)
        .matches( /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, 'Please enter valid price')
        .required('price is required'),
        description: Yup.string()
        .max(10)
        .matches(/^[A-Za-z ]*$/, 'Please enter valid description')
        .required('description is required'),
        options: Yup.string()
        .max(10)
        .matches( /^[A-Za-z ]*$/, 'Please enter valid options')
        .required('options is required')
        ,  image: Yup.string()
        .max(20)
        .required('image is required')
  })}
  render={({ errors, touched }) => (
      <Form onSubmit={handleupdate}>
          <div className="form-group">
              <label htmlFor="">F_ID</label>
              <Field name="F_ID" id="F_ID2" type="number" min="0" className={'form-control' + (errors.F_ID && touched.F_ID ? ' is-invalid' : '')} />
              <ErrorMessage name="F_ID" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="foodname">foodname</label>
              <Field name="foodname" id="foodname2"   type="text" className={'form-control' + (errors.foodname && touched.foodname ? ' is-invalid' : '')} />
              <ErrorMessage name="foodname" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="price">price</label>
              <Field name="price" id="price2" type="number" min="0" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
              <ErrorMessage name="price" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="description">description</label>
              <Field name="description" id="description2" type="text"  className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
              <ErrorMessage name="description" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="options">options</label>
              <Field name="options" id="options2" type="text"  className={'form-control' + (errors.options && touched.options ? ' is-invalid' : '')} />
              <ErrorMessage name="options" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="image">image</label>
              <Field value="gruel" name="image" id="image2" type="text"  className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} />
              <ErrorMessage name="image" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
          <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>Update food</Button>
          </div>
      </Form>
  )}
/>
     
        </body>
          )
          
  }
}
export default Product;