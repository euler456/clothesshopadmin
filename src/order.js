
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


function Order () {
    const [hitss, setHitss] = useState([]);
  

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
            fetch('http://localhost/clothesshop/api/api.php?action=displayorder',
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
            fetch('http://localhost/clothesshop/api/api.php?action=deleteOrder', 
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
            </tr> ) )}
            </tbody>
        </table>
        </form>

     

        </body>

          )
          
  }
 
export default Order;