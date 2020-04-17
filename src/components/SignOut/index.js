import React,{Component} from 'react';
import {Redirect} from "react-router-dom"
import { withFirebase } from '../Firebase';


{/*class SignOutButton extends Component {
constructor(){
  super()
  this.state = {
    navigate:false,
    user:null
  }
}
  
  logOut = () => {
    localStorage.clear("token");
    this.setState({navigate:true});
  };
  render(){
    
    const{navigate}=this.state
    if(navigate) {
      return <Redirect to="/about" push="true"/>

      
    }
    return <button onClick={this.logOut}>Sign Out</button>
  }
}export default SignOutButton;*/}

const SignOutButton = ({ firebase }) => (
  <a  onClick={firebase.doSignOut}>
    Sign Out
  </a>
);

export default withFirebase(SignOutButton);
