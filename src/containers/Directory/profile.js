import React, { Component } from "react"
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import ProfilePic from '../../containers/Directory/profilepic';
import styled from 'styled-components';



// const Button = styled.button`
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
    padding: 15px;

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
    width: 100;
    display: flex;
    flexGrow: 1; 
    flexFlow: nowrap;
    alignItems: stretch;
    justifyContent: center;
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




// import React, { useState, useEffect } from 'react';
// function Example() {
//   const [count, setCount] = useState(0);
//   // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
//     // Update the document title using the browser API
//     document.title = `You clicked ${count} times`;
//   });
//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );

 const INITIAL_STATE = {
  
  title: "",
  email: "",
  projects: "",
  language: "",
  mentor: "",
  state: "",
  country: "",
  image: "",
  photo: "",
  remote: "",
  equipment: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  error: null
 
};
const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";
const ERROR_MSG_ACCOUNT_EXISTS = `
 
//   An account with this email address already exists. 
 
//   Please sign in instead. 
 
// `;



class Profile extends Component {
 constructor(props) {
   super(props);
   this.state = { ...INITIAL_STATE };
 }
 onSubmit = event => {
   const { 
    title,
    email,
    projects,
    language,
    mentor,
    state,
    country,
    image,
    photo,
    remote,
    equipment,
    passwordOne,
    passwordTwo,
    isAdmin,
    error
  
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
          title,
          email,
          projects,
          language,
          mentor,
          state,
          country,
          image,
          photo,
          remote,
          equipment,
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
    title,
    email,
    projects,
    language,
    mentor,
    state,
    country,
    image,
    photo,
    remote,
    equipment,
    passwordOne,
    passwordTwo,
    isAdmin,
    error

   } = this.state;
   const isInvalid =
     passwordOne !== passwordTwo ||
     passwordOne === "" ||
     email === "" ||
     title === "";
     
    return(
      <main style=
      {{ minHeight: `100vh`, padding: `3rem 3rem`, }} classNumber="has-dflex-center">
        <section style=
      {{ minHeight: `100vh`, padding: `2rem 0`,  }}>
           <div classNumber="lx-container-70">
              <div classNumber="lx-row">
                <h1 style= {{ fontSize: `45px`, fontWeight: `bold`, }}
                classNumber="title">CTD Profile</h1>
           </div>

           <div style= {{ gridTemplateRows: `auto 1fr auto`, backgroundSize: `contain`,
                          backgroundPosition: `center`, backgroundRepeat: `no-repeat`, }}
                classNumber="lx-row align-stretch">
                <div style= {{ display: `flex`, alignItems: `center`, justifyContent: `flex-end`, maxWidth: `25rem`, float: `left`,
                               width: `45%`, padding: `10px`, }} 
                    classNumber="lx-column column-user-pic">
           
           <div style= {{ width: `50%`, maxWidth: `30rem`, margin: `6rem .05rem`, display: `flex`, flexFlow: `wrap column`, 
                          alignItems: `center`, justifyContent: `center`, borderRadius: `0.25rem`, backgroundColor: `white`, }}
                    classNumber="profile-pic bs-md">
            <ProfilePic />
           <div style= {{ width: `20rem`, height: `20rem`, position: `relative`, overflow: `hidden`, borderRadius: `50%`, }} 
                classNumber="pic bs-md">      
                       
                {/* <img style= {{ width: `100%`, height: `100%`, objectFit: `cover`, objectPosition: `center`, }} 
                    src="https://bit.ly/3jRbrbp" alt="" loading="lazy" /> */}
                    
                    <a style= {{ opacity: `0`, width: `5-0%`, height: `100%`, margin: `25px`, padding: `0`, position: `absolute`,
                        transform: `translate(-50%, -50%)`, top: `50%`, left: `50%`, display: `none`, alignItems: `center`,
                        justifyContent: `center`, textTransform: `none`, fontSize: `1rem`, color: `white`, 
                        backgroundColor: `rgba(0, 0, 0, 0.8)`, }} id="change-avatar" classNumber="lx-btn"></a>
                  
           </div>
        

           </div>
           </div> 
        

          <FormWrapper>
          {/* <form action="get"> */}
          <form onSubmit={this.handleSubmit}>
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
                  <i className="fas fa-language fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input className="col-6 form-control" name="Language" onChange={this.handleChange} type="text" value={this.state.value}
                    placeholder="Language" id="username" autocomplete="username" required></input> 
              </div>
            </div>

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
                  <input className="col-6 form-control" name="State" onChange={this.handleChange} type="text" value={this.state.value}
                    placeholder="State" id="username" autocomplete="username" required></input> 
              </div>
            </div>

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i class="fas fa-globe fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input className="col-6 form-control" name="Country" onChange={this.handleChange} type="text" value={this.state.value}
                    placeholder="Country" id="username" autocomplete="username" required></input> 
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
          
            <hr></hr>

            <Button 
              className="button-tertiary" 
              type="submit" 
              value="Submit">
                Submit
            </Button>
{/* 
            <Link to={'/directory/profile.js'}>
            <Button> Profile Page </Button>
            </Link>
            {error && <p>{error.message}</p>} */}
       
              </form>
            </FormWrapper>
      


            {/* <div className="fieldset">
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
              </div> */}
              
            

        
   
    {/* )
 };
}; */}
{/* 

           <div style= {{ display: `flex`, alignItems: `flex-start`, justifyContent: `flex-end`, }} classNumber="lx-column">
              <form style= {{ gridTemplateColumns: `1fr 300px`, margin: `4rem 2rem`,
                                padding: `10px`, textAlign: `left`, minWidth: `35rem`,
                                maxWidth: `35rem`, marginTop: `30px`, }} action="get">
                <div classNumber="fieldset">
                    <div classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">
                            <i style= {{ color: `black`, padding:` 5px`, }} className="fas fa-network-wired fa-2x"/></span>

                          
                               <input style= {{ flexGrow: `1`, minHeight: `3rem`, padding: `0.375rem 0.75rem`, display: `block`,
                                                    borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderTopRightRadius: `0.25em`,
                                                    borderBottomRightRadius: `0.25em`, border: `0.0625rem solid #ced4da`, borderLeft: 0,
                                                    fontSize: `1rem`, fontWeight: `400`, lineHeight: `1.5`, color:` #495057`, }}
                                        type="text" id="user-name" value="Job Title" autocomplete="username" required></input> 
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
                    {/* <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">
                            {/* <i style= {{ color: `black`, padding:` 5px`, }} className="fas fa-envelope fa-2x"/> */}
                            {/* <a href="mailto:scbonner2015@gmail.com" style= {{ color: `black`, padding: `5px`, }} className="fas fa-envelope fa-2x">
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
                           classNumber="fieldset"> */}
                {/* <label style= {{ width: `100%`, margin: `0 0 1rem 1`, fontSize: `1.2rem`, fontWeight: `700`, }} for="user-name"></label> */}
                    {/* <div style= {{ width: `100%`, display: `flex`, flexFlow: `nowrap`, alignItems: `stetch`, justifyContent: `center`,
                                }} classNumber="input-wrapper"> 
                        <span style= {{ width: `fit-content`, margin: `0`, padding: `1rem 1rem`, display: `flex`, alignItems: `center`,
                                        borderTopLeftRadius: `0.25em`, borderBottomLeftRadius: `0.25em`, borderTopRightRadius: `0`,
                                        borderBottomRightRadius: `0`, border: `0.0625rem solid #ced4da`, fontSize: `1rem`,
                                        fontWeight: `400`, lineHeight: `1.5`, color: `#495057`, textAlign: `center`,
                                        backgroundColor: `e9ecef`, }} classNumber="icon">

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
            </div>  */}
{/* 
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
            </div>  */}
 
                            {/* <Link to={'/directory/'}>
                            <Button> Back to Map  </Button>
                            </Link> */}
                
            
            
            </div>
            </div>        
        </section>
      </main>

    
    )
 };

};
        
      
      
export default Profile;





