import React from 'react';
import { SignUpLink } from '../../components/SignUp'
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class AdminAuthSignIn extends React.Component {
  state={
    ...INITIAL_STATE
  };

  onSubmit = (event) => {
    const {
      email, 
      password
    } = this.state;

    this.props.firebase
    .doSignInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({...INITIAL_STATE });
      this.props.history.push(ROUTES.PROJECT);
    });
    .catch(error => {
      this.setState({ error });
    });

    event.preventDefault();
  };

  onChange = (event) => {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
  }
  render() {
    return(
      <AdminSignInPage />
    )
  }
}

const AdminSignInPage = (props) => {
  return(
    <div className = 'admin-signIn-container'>
      <form onSubmit = {this.onSubmit}>
        <label>
          Enter email:
          <input
            name = 'email'
            value = { email }
            onChange = { this.onChange }
            type = 'text'
            placeholder = 'Email Address'
          />
          <input
            name = 'password'
            value = { password }
            onChange = { this.onChange }
            type = 'password'
            placeholder = 'Password'
          />
        </label>
          <input type = 'submit' value = 'Submit'/>
      </form>
    </div>
  )
}

const AdminSignInForm = compose(
  withRouter,
  withFirebase,
)(AdminAuthSignIn);
export default AdminSignInPage;

export { AdminSignInForm }


