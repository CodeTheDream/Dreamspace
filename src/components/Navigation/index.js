import React from 'react'
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";
import Logo from '../../assets/images/ctd-logo.png'


const Navigation = () => (
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
            <Link to={ROUTES.ABOUT}>About</Link>
          </li>
        </ul>
      </div>
  </nav>
)

export default Navigation