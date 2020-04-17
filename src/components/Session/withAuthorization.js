import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      console.log("Running with Authorization")
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          console.log(authUser)
          if (!condition(authUser)) {
            console.log("I think not")
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
        console.log("Ohhh yeah!"),
        () => this.props.history.push(ROUTES.SIGN_IN),
      );
    }
    componentWillUnmount() {
      this.listener();
    }
    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};
export default withAuthorization;