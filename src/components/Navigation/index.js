import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";
import Logo from "../../assets/images/ctd-logo.png";
import SignOutButton from "../SignOut";
import {Redirect} from "react-router-dom";
import  Userprofile  from "../Userprofile";
import { AuthUserContext } from "../Session";


const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
            authUser ? <NavigationAuth authUser={authUser} /> :
                <div>
                    
                    <NavigationNonAuth />
                <Redirect to ="/signin"/>
                    </div>
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <header className="header">
        <Link to={ROUTES.HOME}><img src={Logo} className="logo-wrapper" /></Link>
    <input className="menu-btn" type="checkbox" id="menu-btn" />
    <label className="menu-icon" for="menu-btn">
      <span className="nav-icon"></span>
    </label>
    <ul className="menu">
             <li>
        <Link to={ROUTES.ARTICLES}>Articles</Link>
      </li>
             <li>
        <Link to={ROUTES.PROJECT}>project</Link>
      </li>
                {/* <li>
      
                <Link to={ROUTES.ACCOUNT}>Account</Link> 
                
      </li>*/}
                < li >
                <Userprofile />
               
                {/* <i className="fa fa-user fa-xs" />{" "}<i className="fa fa-caret-down">  */}
                    
          
      </li>
      <li> </li>
    </ul>
  </header>
);

const NavigationNonAuth = () => (
  <header className="header">
  <button className="mylogo"> <img src={Logo} className="logo-wrapper" /></button> 
    <input className="menu-btn" type="checkbox" id="menu-btn" />
    <label className="menu-icon" for="menu-btn">
      <span className="nav-icon"></span>
    </label>

    <ul className="menu">
      <li>
        <Link to={ROUTES.ABOUT}>About</Link>
      </li>
      <li>
        {" "}
        <Link to={ROUTES.SIGNUP}>Sign Up</Link>
      </li>
      <li>
        {" "}
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
          
    </ul>
  </header>
);

export default Navigation;
