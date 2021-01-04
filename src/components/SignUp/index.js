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

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { username, email, title, dev, github, quote, projects, passwordOne, isAdmin,interest,education,aboutyourself} = this.state;
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
                quote,
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
      quote,
      title,
      projects,
      github,
      dev,
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
              name="quote"
              value={quote}
              onChange={this.onChange}
              type="text"
              placeholder="Quote"
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
        </form>

             <div style= {{ display: `flex`, alignItems: `flex-start`, justifyContent: `flex-end`, }} classNumber="lx-column">
             
              <form className="form" onSubmit={this.onSubmit} style= {{ gridTemplateColumns: `1fr 300px`, margin: `4rem 2rem`, padding: `10px`, textAlign: `left`, minWidth: `35rem`,
                            maxWidth: `35rem`, marginTop: `30px`, }} action="get" required>
                <div classNumber="fieldset" style= {{ width: `100%`, position: `relative`, display: `flex`,
                           flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} >    
                    <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef` }} classNumber="icon">
                            <i style= {{ color: `black`, padding: `0`,  borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`, borderBottomRightRadius: `0`, lineHeight: `1.5` }} className="fas fa-network-wired fa-1x"/></span>
                                <input name="title" value={title} onChange={this.onChange} type="text" placeholder="Title" required
                                  style= {{ flexGrow: `.5`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                    borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                    borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                    fontSize: `1rem`, fontWeight: `400`, color:` #495057`, }}></input>
           </div>
           </div>
          
                        
           <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                          flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
           
                <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                            }} classNumber="input-wrapper"> 
                    <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                    borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                    borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                    fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                    backgroundColor: `e9ecef`, }} classNumber="icon">
                        <i style= {{ color: `black`, padding:` 5px`, }} className="fab fa-buffer fa-2x"/></span>
                            <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                    type="text" id="user-name" value="Projects" autocomplete="username" required></input>
            </div>
            </div>

           <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                           flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
                
                    <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">
                            <i style= {{ color: `black`, padding:` 5px`, }} className="fab fa-dev fa-2x"/></span>
                                <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                    borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                    borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                    fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                        type="text" id="user-name" value="React or Rails" autocomplete="username" required></input>
            </div>
            </div>
                    

             <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                           flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
                {/* <label style= {{ width: `100%`, margin: `0 0 1rem 1`, fontSize: `1.2rem`, fontWeight: `700`, }} for="user-name"> Email:
                </label> */}
                    <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">
                            {/* <a href="mailto:scbonner2015@gmail.com" style= {{ color: `black`, padding: `5px`, }} className="fas fa-envelope fa-2x">
                            </a> */}
                            </span>
                            <input name="email" value={email} onChange={this.onChange}  type="text" placeholder="Email"
                                style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                    borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                    borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                    fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                        type="text" id="user-name" value="Internal use" autocomplete="username" required></input>
            </div>
            </div>

            <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                           flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
                <label style= {{ width: `100%`, margin: `0 0 1rem 1`, fontSize: `1.2rem`, fontWeight: `700`, }} for="user-name"></label>
                    <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">
                            {/* <i style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x"/> */}
                            <a href="https://github.com/scbonner" style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x">
                            </a>
                            </span>
                                <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                    borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                    borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                    fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                        type="text" id="user-name" value="Link to Portfolio" autocomplete="username" required></input>
                    </div>
                    </div>
                        
           <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                          flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
           
                <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                            }} classNumber="input-wrapper"> 
                    <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                    borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                    borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                    fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                    backgroundColor: `e9ecef`, }} classNumber="icon">
                        <i style= {{ color: `black`, padding:` 5px`, }} className="fab fa-buffer fa-2x"/></span>
                            <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                    type="text" id="user-name" value="Projects" autocomplete="username" required></input>
            </div>
            </div>

           <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                           flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
                
                    <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">
                            <i style= {{ color: `black`, padding:` 5px`, }} className="fab fa-dev fa-2x"/></span>
                                <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                    borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                    borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                    fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                        type="text" id="user-name" value="React or Rails" autocomplete="username" required></input>
            </div>
            </div>
                    

             <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                           flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
                {/* <label style= {{ width: `100%`, margin: `0 0 1rem 1`, fontSize: `1.2rem`, fontWeight: `700`, }} for="user-name"> Email:
                </label> */}
                    <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">
                            {/* <i style= {{ color: `black`, padding:` 5px`, }} className="fas fa-envelope fa-2x"/> */}
                            <a href="mailto:scbonner2015@gmail.com" style= {{ color: `black`, padding: `5px`, }} className="fas fa-envelope fa-2x">
                            </a>
                            </span>
                                <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                    borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                    borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                    fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                        type="text" id="user-name" value="Internal use" autocomplete="username" required></input>
            </div>
            </div>

            <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                           flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
                <label style= {{ width: `100%`, margin: `0 0 1rem 1`, fontSize: `1.2rem`, fontWeight: `700`, }} for="user-name"></label>
                    <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">
                            {/* <i style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x"/> */}
                            <a href="https://github.com/scbonner" style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x">
                            </a>
                            </span>
                                <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                    borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                    borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                    fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                        type="text" id="user-name" value="Link to Portfolio" autocomplete="username" required></input>

                                        
            </div>
            </div>
            <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                           flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
                <label style= {{ width: `100%`, margin: `0 0 1rem 1`, fontSize: `1.2rem`, fontWeight: `700`, }} for="user-name"></label>
                    <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">
                            {/* <i style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x"/> */}
                            <a href="https://github.com/scbonner" style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x">
                            </a>
                            </span>
                                <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                    borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                    borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                    fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                        type="text" id="user-name" value="Link to Portfolio" autocomplete="username" required></input>

                                        
            </div>
            </div>
            <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                           flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
                <label style= {{ width: `100%`, margin: `0 0 1rem 1`, fontSize: `1.2rem`, fontWeight: `700`, }} for="user-name"></label>
                    <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">
                            {/* <i style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x"/> */}
                            <a href="https://github.com/scbonner" style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x">
                            </a>
                            </span>
                                <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                    borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                    borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                    fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                        type="text" id="user-name" value="Link to Portfolio" autocomplete="username" required></input>

                                        
            </div>
            </div>
            <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                           flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
                <label style= {{ width: `100%`, margin: `0 0 1rem 1`, fontSize: `1.2rem`, fontWeight: `700`, }} for="user-name"></label>
                    <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">
                            {/* <i style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x"/> */}
                            <a href="https://github.com/scbonner" style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x">
                            </a>
                            </span>
                                <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                    borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                    borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                    fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                        type="text" id="user-name" value="Link to Portfolio" autocomplete="username" required></input>

                                        
            </div>
            </div>
            <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                           flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
                <label style= {{ width: `100%`, margin: `0 0 1rem 1`, fontSize: `1.2rem`, fontWeight: `700`, }} for="user-name"></label>
                    <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">
                            {/* <i style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x"/> */}
                            <a href="https://github.com/scbonner" style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x">
                            </a>
                            </span>
                                <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                    borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                    borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                    fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                        type="text" id="user-name" value="Link to Portfolio" autocomplete="username" required></input>

                                        
            </div>
            </div>
            <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                           flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
                <label style= {{ width: `100%`, margin: `0 0 1rem 1`, fontSize: `1.2rem`, fontWeight: `700`, }} for="user-name"></label>
                    <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">
                            {/* <i style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x"/> */}
                            <a href="https://github.com/scbonner" style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-2x">
                            </a>
                            </span>
                                <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                    borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                    borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                    fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                        type="text" id="user-name" value="Link to Portfolio" autocomplete="username" required></input>

                                        
            </div>
            </div>
            <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                          flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
           
                <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                            }} classNumber="input-wrapper"> 
                    <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                    borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                    borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                    fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                    backgroundColor: `e9ecef`, }} classNumber="icon">
                        <i style= {{ color: `black`, padding:` 5px`, }} className="fab fa-buffer fa-2x"/></span>
                            <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                    type="text" id="user-name" value="Projects" autocomplete="username" required></input>
            </div>
            </div>
            <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                          flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
           
                <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                            }} classNumber="input-wrapper"> 
                    <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                    borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                    borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                    fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                    backgroundColor: `e9ecef`, }} classNumber="icon">
                        <i style= {{ color: `black`, padding:` 5px`, }} className="fab fa-buffer fa-2x"/></span>
                            <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                    type="text" id="user-name" value="Projects" autocomplete="username" required></input>
            </div>
            </div>
            <div style= {{ width: `100%`, margin: `2rem 0`, position: `relative`, display: `flex`,
                          flexWrap: `wrap`, alignItems: `center`, justifyContent: `flex-start`, }} 
                           classNumber="fieldset">
           
                <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                            }} classNumber="input-wrapper"> 
                    <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                    borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                    borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                    fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                    backgroundColor: `e9ecef`, }} classNumber="icon">
                        <i style= {{ color: `black`, padding:` 5px`, }} className="fab fa-buffer fa-2x"/></span>
                            <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                    type="text" id="user-name" value="Projects" autocomplete="username" required></input>
            </div>
            </div>



            <Button className="button-tertiary" disabled={isInvalid} type="submit">
              Submit
            </Button>
                  {error && <p>{error.message}</p>}
          
                </form>
            </div>
            </div>
    
            

    
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