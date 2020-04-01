import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";
import Logo from "../../assets/images/ctd-logo.png";
import SignOutButton from "../SignOut";
import {Redirect} from "react-router-dom"
import { AuthUserContext } from "../Session";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser} /> :
      <div>
        <NavigationNonAuth />
         <Redirect to="/about"/>
      {/*} <Redirect to="/signIn"/>*/}
      </div> 
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <header className="header">
    <img src={Logo} className="logo-wrapper" />
    <input className="menu-btn" type="checkbox" id="menu-btn" />
    <label className="menu-icon" for="menu-btn">
      <span className="nav-icon"></span>
    </label>
    <ul className="menu">
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.PROJECT}>Projects</Link>
      </li>
      <li>
        {" "}
        <Link to={ROUTES.ACCOUNT}>Account</Link>

      </li>
      <li>
        <SignOutButton />
        {/*<Link to={ROUTES.HOME}>SignOut</Link>*/}
        
        
      </li>
      
    </ul>
  </header>
);

const NavigationNonAuth = () => (
  <header className="header">
    <img src={Logo} className="logo-wrapper" />
    <input className="menu-btn" type="checkbox" id="menu-btn" />
    <label className="menu-icon" for="menu-btn">
      <span className="nav-icon"></span>
    </label>

    <ul className="menu">
      <li>
{/* <Link to={ROUTES.ABOUT}>About</Link>*/}
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
