import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../../components/SignUp';
import { PasswordForgetLink } from '../../components/PasswordForget';
import { withFirebase } from '../../components/Firebase';
import * as ROUTES from '../../constants/routes';
import Post from '../../components/Post';



class IndividualView extends Component {






render(){
    return(
        <div>Individual view Here
        <Post/>
        </div>
    )
}
}

export default IndividualView;

