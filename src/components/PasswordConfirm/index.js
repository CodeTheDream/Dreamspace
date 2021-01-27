import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import styled from 'styled-components';


const INITIAL_STATE = {
   username: "",
   email: "",
   passwordOne: "",
   passwordTwo: "",
   isAdmin: false,
   error: null,
};
const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";
const ERROR_MSG_ACCOUNT_EXISTS = `
  
//   An account with this email address already exists. 
  
//   Please sign in instead. 
  
// `;

const Button = styled.button`
  cursor: pointer;
  background: blue;
  font-size: 16px;
  border-radius: 25px;
  color: white;
  margin-left: 12px;
  margin-right: 20px; 
  padding: .75em .75em;
  transition: 0.5s all ease-out;
 
  &:hover {
    background-color: white;
    color: black;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  alignItems: flex-start;
  justify-content: center;

  form {
    margin: 4rem 2rem; 
    padding: 10px;

  }

.fieldset {
    width: 100%; 
    margin: 2rem 0; 
    position: relative; 
    display: flex; 
    flexWrap: wrap; 
    alignItems: center; 
    justifyContent: flex-start; 
} 
`
const span = styled.div`
  width: fit-content;
  margin: 0;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  border-top-left-radius: 0.25em;
  border-bottom-left-radius: 0.25em; 
  border-top-right-radius: 0;
  border-bottom-right-radius: 0; 
  border: 0.0625rem solid #ced4da; 
  font-size: 1rem; 
  font-weight: 400; 
  line-height: 1.5; 
  color: #495057; 
  text-align: center; 
  background-color: e9ecef;
  } 
`
const i = styled.div`
  color: black;
  padding: 5px;
  
  }
`
const inputwrapper = styled.div`
    flexGrow: 1; 
    minHeight: 2rem; 
    padding: 0.375rem 0.75rem;                         
    display: block; 
    border-top-left-radius: .75em; 
    border-bottom-left-radius: 2em;
    border-top-right-radius: 0.25em;
    border-bottom-right-radius: 0.25em; 
    border: 0.0625rem solid #ced4da; 
    border-left: 0, fontSize: 1rem;
    fontWeight: 100; 
    lineHeight: 1.75; 
    color: #495057;
  }
`; 
const hr = styled.div`
  border-color: black;
  }
`;

class PasswordConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };   //refer to lines 19 and 32
  }
  onSubmit = event => {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
        isAdmin,
        
    } = this.state;
   const roles = {};
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }
    // else {
    //   roles[ROLES.NONADMIN] = ROLES.NONADMIN;
    // }
    console.log("roles: ", roles);
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set(
          {
            username,
            email,
            passwordOne,
            passwordTwo,
            isAdmin,
            error,        
          },
          { merge: true }
        );
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
     
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";  
console.log("testing",passwordOne, passwordTwo);
      return (
        <FormWrapper>
          <form onSubmit={this.onSubmit}>
          {/* <form onSubmit={this.handleSubmit}> */}
            <div className="fieldset">
              <div className="input-wrapper"> 
                <input className="col-6 form-control" name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password" required></input> 
              </div>
            </div>

            <div className="fieldset">
            <div className="input-wrapper"> 
                <input className="col-6 form-control" name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm Password" required></input> 
              </div>
            </div>

           {/* <Button type="submit">Submit</Button>  */}
           <Button disabled={isInvalid} type='submit' onSubmit={this.onSubmit}>Submit</Button>
           

            {error && <p>{error.message}</p>}  
        </form>
      </FormWrapper>   
   
    )
 };
};


const SignUpLink = () => (
  <p>
    Don't have an account? 
    <Link className="linkstyle" to=
    {ROUTES.SIGNUP}>Sign Up</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(PasswordConfirm));
export default PasswordConfirm;
export { SignUpForm, SignUpLink }




