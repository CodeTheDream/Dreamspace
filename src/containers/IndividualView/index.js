import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../../components/SignUp';
import { PasswordForgetLink } from '../../components/PasswordForget';
import { withFirebase } from '../../components/Firebase';
import * as ROUTES from '../../constants/routes';



class IndividualView extends Component {


render(){
    return(
        <div>Individual view Here</div>
    )
}
}

export default IndividualView;

