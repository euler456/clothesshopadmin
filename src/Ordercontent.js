
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


function Ordercontent () {
    const [hitss, setHitss] = useState([]);

    function handleUpdate(event){
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost/clothesshop/api/api.php?action=updateuser', {
          method: 'POST',
          credentials: 'include',
          body: data

        }).then((headers) =>{
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
        
                    return;
                }
               
            })
            .catch(function(error) {console.log(error)});
            
          });
     
          return (
            <body>
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

     

        </body>

          )
          
  }
 
export default Ordercontent;