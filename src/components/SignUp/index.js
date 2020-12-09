import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";


const SignUpPage = () => (
  <div style={{ marginTop: "7em", marginBottom: '7em', fontWeight: 'bold' }}>
   <div className="signup">
    <h3 style= {{marginBottom: '1.5em' }}
    className="signin">Profile Information</h3>
   <SignUpForm />
   </div>
  </div>
);
const INITIAL_STATE = {
  username: "name",
   title: "",
   email: "",
   projects: "",
  photoUrl: "https://ya-webdesign.com/images250_/placeholder-image-png-1.png",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  error: null,
  education:"",
  interest:"",
  aboutyourself:""
};
const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";
const ERROR_MSG_ACCOUNT_EXISTS = `
  

  An account with this email address already exists. 
  
  Please sign in instead. 
  
`;
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { username, email, title, dev, github, projects, passwordOne, isAdmin,interest,education,aboutyourself} = this.state;
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
                title,
                dev,
                github,
                email,
                projects,
                roles,
                education,
                interest,
                aboutyourself
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
      title,
      projects,
      github,
      dev,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
     
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      title === "";
      

      return (
        <div className="view-container-signup">
          <form  className="form" onSubmit={this.onSubmit} >
           
         <input
          name="title"
          value={title}
          onChange={this.onChange}
          type="text"
          placeholder="Title"
        />
        <input
          name="projects"
          value={projects}
          onChange={this.onChange}
          type="text"
          placeholder="Projects"
        />
        <input
          name="dev"
          value={dev}
          onChange={this.onChange}
          type="text"
          placeholder="Dev"
        />
        <input
          name="github"
          value={github}
          onChange={this.onChange}
          type="text"
          placeholder="Github"
        />
        
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email"
        />

        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button className="button-tertiary" disabled={isInvalid} type="submit">
          Submit
        </button>
              {error && <p>{error.message}</p>}
            
        </form>
    </div>
    );
  }
}
const SignUpLink = () => (
  <p>
    Don't have an account? <Link className="linkstyle" to={ROUTES.SIGNUP}>Sign Up</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink }