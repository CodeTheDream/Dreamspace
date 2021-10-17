
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import firebase from 'firebase';
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  background: rgb 52, 58, 235;
  font-size: 16px;
  border-radius: 5px;
  color: white;
  margin-left: 12px;
  margin-right: 20px; 
  padding: .75em .50em;
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
`;
const i = styled.div`
  color: black;
  padding: 5px;

  }
`;


const SignUpPage = () => (

<div style={{ marginTop: "4.8em" }}>
   <div className="signup">
    <h3 className="signin">SignUp</h3>
    <SignUpForm />
    </div>
 </div>
);

const INITIAL_STATE = {
  username: 'name',
  email: '',
  firstName: '',
  lastName: '',
  title: '',
  projects: '',
  language: '',
  mentor: '',
  state: '',
  country: '',
  remote: '',
  equipment: '',
  developer: '',
  github: '',
  introduction: '',
  quote: '',
  hobbies: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  // onSubmit = (event, authUser) => {
    onSubmit = event => {
      const { username, firstName, lastName, developer, github, title, projects, language, introduction, quote, hobbies, mentor, state, country,
      remote, equipment, email, passwordOne, passwordTwo, isAdmin } = this.state;
    // console.log('email', email);
      const roles = {};
  
    if (isAdmin) {
       roles[ROLES.ADMIN] = ROLES.ADMIN;
     }
 
  // console.log('roles: ', roles);
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        
        // Create a user in your Firebase realtime database
        //github has line 134 noted as .set versus .add
        return this.props.firebase.user(authUser.user.uid).set(
          {
            username,
            email,
            firstName,
            lastName,
            title,
            projects,
            introduction,
            quote,
            hobbies,
            language,
            mentor,
            state,
            country,
            remote,
            equipment, 
            developer,
            github,
            passwordOne,
            passwordTwo,
            isAdmin
          
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

 //rendering of initial state properties
  render() { 
    const {
      username,
      firstName,
      lastName,
      title,
      projects,
      language,
      mentor,
      introduction,
      quote,
      hobbies,
      state,
      country,
      remote,
      equipment,
      developer,
      github,   
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,

     } = this.state; 
    
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

//form setup for initial signup information, name, email, password      
    return (
      <FormWrapper>
        <form onSubmit={this.onSubmit} autocomplete="!off">
          <div className="fieldset">
            <div className="input-wrapper"> 
              <span className="icon"> 
                <i className="fas fa-portrait fa-1x"/></span>
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                <input className="col-6 form-control" 
                  name="firstName" 
                  onChange={this.onChange} 
                  type="text" 
                  value={this.state.value} 
                  placeholder="First Name" 
                  autocomplete="chrome-off"
                  required>
                </input>            
              </div>
            </div>

          <div className="fieldset">
            <div className="input-wrapper"> 
              <span className="icon"> 
                <i className="fas fa-portrait fa-1x"/></span>
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                <input className="col-6 form-control" 
                  name="lastName" 
                  onChange={this.onChange} 
                  type="text" 
                  value={this.state.value} 
                  placeholder="Last Name" 
                  required
                  autocomplete="chrome-off">
                </input>            
              </div>
            </div>
          
            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i className="fab fa-dev fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                    <input className="col-6 form-control" 
                      name="developer" 
                      onChange={this.onChange} 
                      type="text" 
                      value={this.state.value} 
                      placeholder="Developer Type" 
                      autocomplete="chrome-off"
                      required>
                    </input>  
                </div>
              </div>   

              <div className="fieldset">
                <div className="input-wrapper"> 
                  <span  className="icon"> 
                    <i className="fas fa-network-wired fa-1x"/></span>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                     <input list="title" 
                        // id="title-choice" 
                        name="title" 
                        type="text" 
                        onChange={this.onChange} {...title} 
                        placeholder='Title' 
                        autocomplete="chrome-off"
                        required>
                      </input>
                </div>  
              </div>  
        
              <div className="fieldset">
                <div className="input-wrapper"> 
                  <span className="icon"> 
                    <i className="fab fa-buffer fa-1x"/></span>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                      <input className="col-6 form-control" 
                        name="projects" 
                        onChange={this.onChange} 
                        type="text" 
                        value={this.state.value}
                        placeholder="Projects" 
                        autocomplete="chrome-off"
                        required>
                      </input>  
                </div>
              </div>  

              <div className="fieldset">
                <div className="input-wrapper"> 
                  <span className="icon"> 
                    <i className="fas fa-language fa-1x"/></span>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    <input className="col-6 form-control" 
                      name="language"
                      onChange={this.onChange} 
                      type="text" 
                      value={this.state.value} 
                      placeholder="Language" 
                      autocomplete="chrome-off"
                      required>
                      </input> 
                </div>
              </div>

              <div className="fieldset">
                <div className="input-wrapper"> 
                  <span className="icon"> 
                    <i className="fas fa-chalkboard-teacher fa-1x"/></span>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    <input list="mentor" 
                      id="mentor-choice" 
                      name="mentor" 
                      type="text" 
                      onChange={this.onChange} {...mentor} 
                      autocomplete="chrome-off"
                      placeholder='Mentor' 
                      required>
                    </input>
                </div>
              </div> 

              <div className="fieldset">
                <div className="input-wrapper"> 
                  <span className="icon"> 
                    <i className="fas fa-landmark fa-1x"/></span>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    <input className="col-6 form-control" 
                      name="State" 
                      onChange={this.onChange} 
                      type="text" 
                      value={this.state.value}
                      placeholder="State" 
                      required
                      autocomplete="chrome-off">
                    </input> 
                </div>
              </div>

              <div className="fieldset">
                <div className="input-wrapper"> 
                  <span className="icon"> 
                    <i className="fas fa-globe fa-1x"/></span>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    <input className="col-6 form-control" 
                      name="Country" 
                      onChange={this.onChange} 
                      type="text" 
                      autocomplete="chrome-off"
                      value={this.state.value}
                      placeholder="Country"  
                      required>
                    </input> 
                </div>
              </div> 

              <div className="fieldset">
                <div className="input-wrapper"> 
                  <span className="icon"> 
                    <i className="fas fa-podcast fa-1x"/></span>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    <input list="remote" id="remote-choice" 
                      name="remote"
                      type="text"  
                      onChange={this.onChange} {...remote} 
                      placeholder='Remote' 
                      required 
                      autocomplete="chrome-off">
                    </input>
                </div>
              </div> 
              
              <div className="fieldset">
                <div className="input-wrapper"> 
                  <span className="icon"> 
                    <i className="fas fa-laptop-code fa-1x"/></span>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    <input list="equipment" 
                      id="equipment-choice" 
                      name="equipment"
                      type="text"  
                      onChange={this.onChange} {...equipment} 
                      placeholder='Equipment'
                      required
                      autocomplete="chrome-off">
                    </input>
                </div>
              </div>

              <div className="fieldset">
                <div className="input-wrapper"> 
                  <span className="icon"> 
                    <i className="fab fa-github-square fa-1x"/></span>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    <input className="col-6 form-control" 
                      name="github" 
                      onChange={this.onChange} 
                      type="text" 
                      value={this.state.value}
                      placeholder="Github"
                      autocomplete="chrome-off" 
                      required>
                    </input> 
                </div>
             </div>

        <div className="fieldset">
          <div className="input-wrapper"> 
            <span className="icon"> 
              <i className="fa-solid fa-message-smile"/></span>
              &nbsp;&nbsp;
              &nbsp;&nbsp;
                <input className="quote" 
                  name="Quote" 
                  onChange={this.onChange} 
                  type="text" 
                  value={this.state.value}
                   placeholder="Quote" 
                   required></input>  
          </div>
        </div>  

        <div className="fieldset">
          <div className="input-wrapper"> 
            <span className="icon"> 
            <i class="fa-solid fa-icons"/></span>
              &nbsp;&nbsp;
              &nbsp;&nbsp;
                <input className="hobbies" 
                  name="Hobbies" 
                  onChange={this.onChange} 
                  type="text" 
                  value={this.state.value}
                   placeholder="Hobbies" 
                   required></input>  
          </div>
        </div>  

        <div className="fieldset">
          <div className="input-wrapper"> 
            <span className="icon"> 
            <FontAwesomeIcon icon="fa-solid fa-icons" /></span>
              &nbsp;&nbsp;
              &nbsp;&nbsp;
                <textarea className="introduction" 
                  name="Introduction" 
                  onChange={this.onChange} 
                  type="text" 
                  value={this.state.value}
                   placeholder="Introduction" 
                   required></textarea>  
          </div>
        </div>  
            <hr />

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i className="fas fa-envelope fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                    <input className="col-6 form-control" 
                      name="email" 
                      onChange={this.onChange} 
                      type="text" 
                      value={this.state.value} 
                      placeholder="Email"
                      autocomplete="chrome-off"
                      required>
                    </input> 
                </div>
              </div>

              <div className="fieldset">
                <div className="input-wrapper"> 
                  <span className="icon"> 
                    <i className="fas fa-unlock-alt fa-1x"/></span>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                      <input className="col-6 form-control" 
                        name="passwordOne" 
                        onChange={this.onChange} 
                        type="password" 
                        value={this.state.value}
                        placeholder="Password" 
                        autocomplete="chrome-off"
                        required>
                      </input> 
                </div>
              </div>

              <div className="fieldset">
                <div className="input-wrapper"> 
                  <span className="icon"> 
                    <i className="fas fa-lock-alt fa-1x"/></span>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    <input className="col-6 form-control" 
                        name={passwordTwo} 
                        onChange={this.onChange} 
                        type="password" 
                        value={this.state.value}
                        placeholder="Confirm Password" 
                        autocomplete="chrome-off"
                        required>
                    </input> 
                </div>
              </div>

          
        <Button className="button-tertiary" 
        disable={isInvalid} type="submit">
          Sign Up
        </Button> 
        {error && <p>{error.message}</p>}
      </form>
    </FormWrapper>
    
    );

}};
;


const SignUpLink = () => (
  <p>
    Don't have an account? 
    <Link className="linkstyle" to=
    {ROUTES.SIGNUP}>Sign Up</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };




