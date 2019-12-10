import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";
import Logo from "../../assets/images/ctd-logo.png";
import SignOutButton from '../SignOut';

import { AuthUserContext } from '../Session';


const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <nav className="navigation">
    <div className="nav-content">
      <div className="logo-wrapper">
        <img src={Logo} />
      </div>
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
        
        {/*
            <li>
            <Link to={ROUTES.CREATEARTICLE}>Create_article</Link>
          </li>
         <li>
            <Link to={ROUTES.SIGNUP}>Sign Up</Link>
          </li>
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          </li> */}
      </ul>
    </div>
  </nav>
);


const NavigationNonAuth = () => (
  <nav className="navigation">
    <div className="nav-content">
      <div className="logo-wrapper">
        <img src={Logo} />
      </div>
      <ul>

        <li>
          <Link to={ROUTES.ABOUT}>ABOUT</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGNUP}>Sign Up</Link>
          </li>
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          </li>
      </ul>
    </div>
  </nav>
);
export default Navigation;
