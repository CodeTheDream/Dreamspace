import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import styled from 'styled-components';


const SignUpPage = () => (
  <div style={{ marginTop: "7em", marginBottom: '7em', fontWeight: 'bold' }}>
   <div className="signup">
    <h3 style= {{marginBottom: '1.5em' }}
    className="signin">Enter Profile Information</h3>
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
  
//   An account with this email address already exists. 
  
//   Please sign in instead. 
  
// `;

const Button = styled.button`
  cursor: pointer;
  background: black;
  font-size: 16px;
  border-radius: 25px;
  color: white;
  ${'' /* border: 2px solid black; */}
  margin: 1em 1em;
  margin-left: 10px;
  margin-right: 20px;
  padding: 1em 1em;
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


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { username, name, email, title, dev, github, equipment, quote, projects, state, country, passwordOne, isAdmin,interest,education,aboutyourself} = this.state;
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
                name,
                title,
                dev,
                equipment,
                github,
                email,
                projects,
                quote,
                state,
                country,
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
      name,
      quote,
      title,
      projects,
      github,
      dev,
      state,
      country,
      imageOfHome,
      upload,
      equipment,
      email,
      passwordOne,
      passwordTwo,
      error,
     
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      title === "";
      

      return (
        <FormWrapper>
          <form action="get">
            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i className="fas fa-portrait fa-1x"/></span>
                  {/* adding non-breaking spaces to separate icon and input line */}
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input className="col-6 form-control" name="Name" onSubmit={this.onSubmit} type="text" value={name}
                    placeholder="Name" id="username" autocomplete="username" required></input>            
              </div>
            </div>
                      
             <div className="fieldset">
              <div className="input-wrapper"> 
                <span  className="icon"> 
                  <i className="fas fa-network-wired fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input list="title" id="title-choice" name="title-choice" placeholder="Title" />
                    <datalist id="title">
                        <option value="Staff" />
                        <option value="Intern" />
                        <option value="Volunteer" />
                     </datalist>
              </div>
            </div> 

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span  className="icon"> 
                  <i className="fab fa-dev fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                <input list="dev" id="dev-choice" name="dev-choice" placeholder='Dev' />
                    <datalist id="dev">
                        <option value="Frontend" />
                        <option value="Backend" />
                        <option value="Full Stack" />
                     </datalist>
              </div>
            </div> 

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i className="fab fa-buffer fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input list="projects" id="projects-choice" placeholder="Projects" name="projects-choice" />
                      <datalist id="projects">
                          <option value="AACT" />
                          <option value="Clinwiki" />
                          <option value="DreamSpace" />
                          <option value="NC Fair Chance" />
                          <option value="Vamos" />
                          <option value="Mural AR" />
                          <option value="Upstate" />
                          <option value="NCMA" />
                      </datalist>
              </div>
            </div>

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i className="fas fa-envelope fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input className="col-6 form-control" name="Email" onSubmit={this.onSubmit} type="text" value={name}
                    placeholder="Email" id="username" autocomplete="username" required></input> 
              </div>
            </div>

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i className="fab fa-github-square fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input className="col-6 form-control" name="Github" onSubmit={this.onSubmit} type="text" value={name}
                    placeholder="Github" id="username" autocomplete="username" required></input> 
              </div>
            </div>

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i class="fas fa-rss-square fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input className="col-6 form-control" name="languages" onSubmit={this.onSubmit} type="text" value={name}
                    placeholder="Languages" id="username" autocomplete="username" required></input> 
              </div>
            </div>
            <hr></hr>

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i class="fas fa-chalkboard-teacher fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input list="mentor" id="mentor-choice" placeholder="Mentor" name="equipment" />
                    <datalist id="mentor">
                      <option value="Yes" />
                      <option value="No" />
                    </datalist>
              </div>
            </div> 

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i class="fas fa-landmark fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input className="col-6 form-control" name="State" onSubmit={this.onSubmit} type="text" value={name}
                    placeholder="State" id="username" autocomplete="username" required></input> 
              </div>
            </div>

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i class="fas fa-globe fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input className="col-6 form-control" name="Country" onSubmit={this.onSubmit} type="text" value={name}
                    placeholder="Country" id="username" autocomplete="username" required></input> 
              </div>
            </div> 

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i class="fas fa-map fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input className="col-6 form-control" name="image" onSubmit={this.onSubmit} type="text" value={name}
                    placeholder="ImageOfHome" id="username" autocomplete="username" required></input> 
              </div>
            </div>  

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i class="fas fa-camera fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input className="col-6 form-control" name="Upload" onSubmit={this.onSubmit} type="text" value={name}
                    placeholder="Upload" id="username" autocomplete="username" required></input> 
              </div>
            </div> 

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i class="fas fa-podcast fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input list="remote" id="remote-choie" placeholder="Remote" name="remote-choice" />
                   <datalist id="remote">
                      <option value="Yes" />
                      <option value="No" />
                    </datalist>
              </div>
            </div> 
            <hr></hr>

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i class="fas fa-laptop-code fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input list="equipment" id="equipment-choice" placeholder="Equipment" name="equipment-choice" />
                    <datalist id="equipment">
                      <option value="Yes" />
                      <option value="No" />
                    </datalist>
              </div>
            </div> 

            <Link to={'/directory/profile.js'}>
            <Button> Profile Page </Button>
            </Link>
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
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink }