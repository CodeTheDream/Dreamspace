
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';



const PasswordForgetLink = () => (


    <p>
        <Link className="linkstyle" to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>

);
export default PasswordForgetLink