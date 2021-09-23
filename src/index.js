import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import TextField from '@material-ui/core/TextField';
import { Formik, Field,  ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Form } from "react-bootstrap";
import Product from "./products";
import User from "./user";

//import Redirect from 'react-router'
//import { fetchlogin, fetchregister,fetchaccountexists ,fetchisloggedin,fetchlogout } from './api/app/app.js';
//"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir="C:\tmp"
import {
  Route,
  NavLink,
  HashRouter,
  Redirect ,
  BrowserRouter,
  Router
} from "react-router-dom";
const green = '#e8f5e9';
const black = '#424242';


class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = { color: green };
    this.changeColor = this.changeColor.bind(this);
    this.Logout = this.Logout.bind(this);
  }
  changeColor(){
    const newColor = this.state.color == green ? black : green;
    this.setState({ color: newColor })
  }
  Logout=()=>{
    fetch('http://localhost/clothesshop/api/api.php?action=adminlogout', 
    {
        method: 'GET',
        credentials: 'include'
    })
    .then((headers) =>{
        if(headers.status != 200) {
            console.log('logout failed Server-Side, but make client login again');
        }
        else{
        localStorage.removeItem('csrf');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('postcode');
        localStorage.removeItem('CustomerID');    
        alert("logout already");}
        
    })
    .catch(function(error) {console.log(error)});
  }
  render() {

    return (
      <div style={{background: this.state.color}}>
      <HashRouter>
      <div class="container">
        <h1 >Freshly Login</h1>
        <ul id="header" class="row">
          <li><NavLink to="/" class="col">Login</NavLink></li>
          <li><NavLink to="/Home" class="col ">Products</NavLink></li>
          <li><NavLink to="/Userpage" class="col ">User</NavLink></li>
          <li><NavLink to="/order" class="col ">Order</NavLink></li>
          <li><NavLink to="/Setting" class="col ">Setting</NavLink></li>
          <li><NavLink to="/" class="col" onClick={this.Logout}>Logout</NavLink></li>
          <li class="col "> <button id="dark" class="btn btn-light" onClick={this.changeColor}>Darkmode</button></li>
        </ul>
        <div id="content">
           <Route exact path="/" component={Login}/>
           <Route exact path="/Home" component={Home}/>
           <Route exact path="/Userpage" component={Userpage}/>
           <Route path="/Sign" component={Sign}/>
           <Route path="/Setting" component={Setting}/>
           <Route path="/password" component={password}/>
        </div>
        </div>
        
        </HashRouter>
        </div>
    );
  }
}
class Login extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      redirect: false
    };
    
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('http://localhost/clothesshop/api/api.php?action=adminlogin', {
      method: 'POST',
      credentials: 'include',
      body: data
      
    }) .then((headers)=> {
      if(headers.status == 401) {
          console.log('login failed');
          localStorage.removeItem('csrf');
          localStorage.removeItem('username');
          localStorage.removeItem('phone');
          localStorage.removeItem('email');
          localStorage.removeItem('postcode');
          localStorage.removeItem('CustomerID');

          alert('Can not login')
          return;
      }
      if(headers.status == 203) {
          console.log('registration required');
          // only need csrf
      }
      if(headers.status == 200) {
        console.log('login successful');
        this.setState({ redirect: true });

        // only need csrf
    }

  
  })
  .catch(function(error) {
      console.log(error)
  });
  }
  render() {
    const { redirect } = this.state;
    // const { redirectToReferrer } = this.state;
     if (redirect) {
       return <Redirect to='/Home'/>
     }
    return (
      <Formik
      initialValues={{
        username: '',
        password: ''
    }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .max(40)
        .required('username is required'),
          password: Yup.string()
          .required('Password is required')
  })}
  render={({ errors, touched }) => (
      <Form onSubmit={this.handleSubmit}>
          <div className="form-group">
              <label htmlFor="username">username</label>
              <Field name="username" id="username"   type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
              <ErrorMessage name="username" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" id="password" type="password"  className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
          <Button type="submit" variant="contained" color="primary"
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }}>login</Button>
            <Button type="submit" variant="contained" color="primary"
        style={{ marginTop: 10,display: 'inline-block' }}>
        <NavLink to="/Sign" id="Signup">Sign Up</NavLink> </Button>
          </div>
      </Form>
  )}
/>
    );
  }
}
class Home extends React.Component {
  constructor() {
     super();
  this.state = {
    redirect: false,
    isnotlogin:false
  };
}
 
  componentDidMount() {
    fetch('http://localhost/clothesshop/api/api.php?action=isloggedin',
    {
            method: 'POST',
            credentials: 'include'
        }
        )    
        .then(headers => {
          if(headers.status == 403) {
              console.log('can not login');
              alert("plz login");
              this.setState({ isnotlogin: true });
              return;
          }
       
          if(headers.status == 203) {
              console.log('isnotlogin');
              this.setState({ isnotlogin: false });
              return;
          }
      })
      .catch(function(error) {console.log(error)});
    }
  render() {
    const { isnotlogin } = this.state; 
    if(!isnotlogin){
    return (<Product/>);
  }else{
  return <Redirect to='/' />}
}
}

class Sign extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: '',
      redirect: false
    };
    
  }
  onChange(evt) {
    this.setState({
      value: evt.target.value.replace(/[^a-zA-Z]/g, '')
    });
 };
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('http://localhost/clothesshop/api/api.php?action=registeradmin', {
      method: 'POST',
      credentials: 'include',
      body: data
      
    })   .then((headers) =>{
      if(headers.status == 418) {
          console.log('user exists');
          //this.setState({ redirectToReferrer: false});
          alert("username exists");
          return;
      }
   
      if(headers.status == 201) {
          console.log('registration updated');
          this.setState({ redirect: true });
          return;
      }
     
  })
  .catch(function(error) {console.log(error)});
  }
  render() {
    const { redirect } = this.state;
   // const { redirectToReferrer } = this.state;
    if (redirect) {
      return <Redirect to='/' />
    }
    return (
      <div>
         <h1>Sign Up</h1>
         <form  onSubmit={this.handleSubmit}>
             <TextField type="text" name="username" onChange={this.onChange.bind(this)} value={this.state.value} id="regusername" variant="filled"
        color="primary"   label="username" maxlength="30" 
        style={{ margin: 10 ,display: 'inline-block' }} required></TextField>
              <TextField type="email" name="email"  id="regemail"   variant="filled" 
        color="primary"  label="email"
        style={{ margin: 10 ,display: 'inline-block' }}required></TextField>
 
              <TextField type="text" name="phone"  id="regphone"  variant="filled" min="4000000000" max="4999999999"
        color="primary" label="phone"
        style={{ margin: 10 ,display: 'inline-block' }} required></TextField>
            
              <TextField type="number" name="postcode"  id="regpostcode" variant="filled" min="0" max="9999"
        color="primary" label="postcode"
        style={{ margin: 10 ,display: 'inline-block' }} required></TextField>
              <TextField type="password" name="password" placeholder="password" id="regpassword"  variant="filled"
        color="primary" label="password"
        style={{ margin: 10 ,display: 'inline-block' }} required></TextField>
              <TextField type="password" name="password2" placeholder="password again" id="regpassword2"  variant="filled"
        color="primary" label="confirm password"
        style={{ margin: 10 ,display: 'inline-block' }} required></TextField>
              <Button type="submit" variant="contained" color="primary"
        style={{ marginTop: 10,marginRight: 300,display: 'inline-block' }}>Register</Button>
       </form>
      </div>
    );
  }
}

class Setting extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: '',
      redirect: false,
      isnotlogin:false
    };
  }
  onChange(evt) {
    this.setState({
      value: evt.target.value.replace(/[^a-zA-Z]/g, '')
    });
 };
 
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.props.history.push('/');
    fetch('http://localhost/clothesshop/api/api.php?action=adminupdate', {
      method: 'POST',
      credentials: 'include',
      body: data
      
    })    .then(function(headers) {
      if(headers.status == 400) {
          console.log('username exists');
          alert('update failed');
          return;
      }
   
      if(headers.status == 201) {
          console.log(' updated');
          alert('update successful');   
          this.setState({ redirect: true });
          return;
      }
     
  })
  .catch(function(error) {console.log(error)});
  }
  componentDidMount() {
    fetch('http://localhost/clothesshop/api/api.php?action=isloggedin',
    {
            method: 'POST',
            credentials: 'include'
        }
        )    
        .then(headers => {
          if(headers.status == 403) {
              console.log('can not login');
              alert("plz login");
              this.setState({ isnotlogin: true });
              return;
          }
       
          if(headers.status == 203) {
              console.log('isnotlogin');
              this.setState({ isnotlogin: false });
              return;
          }
      })
      .catch(function(error) {console.log(error)});}
  render() {
    const { redirect } = this.state;
    const { isnotlogin } = this.state; 
   // const { redirectToReferrer } = this.state;
    if (redirect) {
      return <Redirect to='/' />
    }
    if(!isnotlogin){
    return (
      <div >
         <h1>Edit My profile</h1>
         <div>
      </div>
      <form onSubmit={this.handleSubmit}>
              <TextField type="hidden" name="currentusername"  id="currentusername" required hidden></TextField>
              <h4> username</h4>
              <TextField type="text" name="username"  id="upusername" maxlength="30"  onChange={this.onChange.bind(this)} value={this.state.value} required></TextField>
              <h4> email</h4>
              <TextField type="email" name="email"  id="upemail" required></TextField>
              <h4> phone</h4>
              <TextField type="number" name="phone"  id="upphone" min="4000000000" max="4999999999" required></TextField>
              <h4> postcode</h4>
              <TextField type="number" name="postcode"  id="uppostcode" min="0" max="9999" required></TextField>
              <h4> password</h4>
              <TextField type="password" name="password" placeholder="password" id="uppassword" required></TextField>
              <h4>re-password</h4>
              <TextField type="password" name="password2" placeholder="password again" id="uppassword2"  required></TextField>
             
              <TextField type="submit" name="submit"></TextField>
       </form>
      </div>
    )}
  
      return <Redirect to='/'/>
  ;
  }
}
class password extends React.Component {
  render() {
    return (
      <div>
         <h4>New password</h4>
            <TextField type="password" name="password" placeholder="password"
               id="regpass"  required></TextField>     <br /> 
                <h4>Confirm password</h4>
              
            <TextField type="password" name="Confirm" placeholder="Confirm password"
               id="Confirm"  required></TextField>  <br />   
                <button name="subject" type="submit" id="fat-btn" class="btn btn-success" >Save</button>
        </div>

    );
  }
}


class Userpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hitss: [],
      redirect: false,
      isnotlogin:false,
      order:[]
    };
  }
  
  componentDidMount() {
    fetch('http://localhost/clothesshop/api/api.php?action=isloggedin',
    {
            method: 'POST',
            credentials: 'include'
        }
        )    
        .then(headers => {
          if(headers.status == 403) {
              console.log('can not login');
              alert("plz login");
              this.setState({ isnotlogin: true });
              return;
          }
       
          if(headers.status == 203) {
              console.log('isnotlogin');
              this.setState({ isnotlogin: false });
              return;
          }
      })
      .catch(function(error) {console.log(error)});
   
    }
  render(){
    const { hitss } = this.state; 
    const { isnotlogin } = this.state; 
    if(!isnotlogin){
          return <User/>}
          
            return <Redirect to='/'/>
          ;
  }
}
const root = document.getElementById('root');
ReactDOM.render(<BrowserRouter><Main/></BrowserRouter>,root);
 
export default Main;