import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Form } from "react-bootstrap";
import Product from "./products";
import User from "./user";
import Order from "./order";
import Ordercontent from "./Ordercontent";
import Login from './login';
import Signup from './Signup';
//import Redirect from 'react-router'
//import { fetchlogin, fetchregister,fetchaccountexists ,fetchadminisloggedin,fetchlogout } from './api/app/app.js';
//"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir="C:\tmp"
import {
  Route,
  NavLink,
  HashRouter,
  Redirect ,
  BrowserRouter,
  Router
} from "react-router-dom";
const green = '#A3A492';
const black = '#424242';

class Loginin extends React.Component {
  constructor() {
    super();
 this.state = {
   redirect: false,
   islogin:false
 };
 this.Logout = this.Logout.bind(this);
 this.Signupredirect = this.Signupredirect.bind(this);
} 
  Signupredirect=()=>{
    this.setState({ redirect: true });
    console.log('ddd');
   
  }
Logout=()=>{
  fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=adminlogout', 
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
      this.setState({ islogin: false });
      alert("logout already");}
      
  })
  .catch(function(error) {console.log(error)});
}
componentDidMount() {
  let rgfl=localStorage.getItem('rgfl');
  let rgsc=localStorage.getItem('rgsc');
  let ueex=localStorage.getItem('ueex');
  if(rgsc || ueex || rgfl){
    this.setState({ redirect: true });
  }
  fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=adminisloggedin',
  {
          method: 'POST',
          credentials: 'include'
      }
      )    
      .then(headers => {
        if(headers.status == 403) {
            this.setState({ islogin: false });
            return;
        }
     
        if(headers.status == 203) {
            console.log('islogin');
            this.setState({ islogin: true });
            return;
        }
    })
    .catch(function(error) {console.log(error)});
  }
 render() {
   const { islogin } = this.state; 
   const { redirect } = this.state; 
   if(islogin){
    return (
      <HashRouter>
      <div class="container">
        <ul id="header" class="row">
          <li><NavLink to="/" class="col  text-center">Products</NavLink></li>
          <li><NavLink to="/Userpage" class="col text-center">User</NavLink></li>
          <li><NavLink to="/order" class="col text-center">Orders</NavLink></li>
          <li><NavLink to="/ordercontent" class="col text-center">Orderitems</NavLink></li>
          <li><NavLink to="/" class="col text-center" onClick={this.Logout}>Logout</NavLink></li>
        </ul>
        <div id="content">
           <Route exact path="/" component={Home}/>
           <Route exact path="/Userpage" component={Userpage}/>
           <Route path="/order" component={order}/>
           <Route path="/ordercontent" component={ordercontent}/>
          
        </div>
        </div>
        </HashRouter>  );
 }
 else if(redirect){
   return(
     <HashRouter>
    <Route path="/Sign" component={Sign}/>
    <Redirect to='/Sign'/>
    </HashRouter>
   
   )
 }
 else{
 return ( 
   <body>
  <Login/>
 <div>
  <Button  variant="contained" color="primary"
  style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }} onClick={this.Signupredirect}>Sign up</Button>
  </div>
  </body>
  )
}
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
    fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=adminisloggedin',
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
  Loginredirect=()=>{
    window.location.reload();   
  }
  render() {
  
    return (
      <body>
    <Signup/>
    <Button type="submit" variant="contained" color="primary" 
        style={{ marginTop: 10,marginRight: 10,display: 'inline-block' }} onClick={this.Loginredirect}>Back</Button>    
    </body>
      );
  }
}

/*class Setting extends React.Component {
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
    fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=adminupdate', {
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
    fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=adminisloggedin',
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
}*/
/*class password extends React.Component {
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
}*/


class Userpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isnotlogin:false,
    };
  }
  
  componentDidMount() {
    fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=adminisloggedin',
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
    const { isnotlogin } = this.state; 
    if(!isnotlogin){
          return <User/>}
          
            return <Redirect to='/'/>
          ;
  }
}

class order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isnotlogin:false,
    };
  }
  
  componentDidMount() {
    fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=adminisloggedin',
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
    const { isnotlogin } = this.state; 
    if(!isnotlogin){
          return <Order/>}
          
            return <Redirect to='/'/>
          ;
  }
}
class ordercontent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isnotlogin:false,
    };
  }
  
  componentDidMount() {
    fetch('https://clotheshopproj2.herokuapp.com/api/api.php?action=adminisloggedin',
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
    const { isnotlogin } = this.state; 
    if(!isnotlogin){
          return <Ordercontent/>}
          
            return <Redirect to='/'/>
          ;
  }
}
const root = document.getElementById('root');
ReactDOM.render(<BrowserRouter><Loginin/></BrowserRouter>,root);
 
export default Loginin;