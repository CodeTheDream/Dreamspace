import React, { Component } from "react"
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
// import * as ROLES from "../../constants/roles";
import ProfilePic from '../../containers/Directory/profilepic';
import firebase from 'firebase';
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
  padding: 2rem 2rem;
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
    // isAdmin,
    // error
  
  } = this.state;
  const roles = {};
  //  if (isAdmin) {
  //    roles[ROLES.ADMIN] = ROLES.ADMIN;
  //  }
   
   console.log("roles: ", roles);
   this.props.firebase
     .doCreateUserWithEmailAndPassword(email, passwordOne)
     .then(authUser => {
       // Create a user in your Firebase realtime database
       return this.props.firebase.user(authUser.user.uid).set(
         {
          title,
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
          // isAdmin,
          // error,
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
    //  .catch(error => {
    //    if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
    //      error.message = ERROR_MSG_ACCOUNT_EXISTS;
    //    }
    //    this.setState({ error });
    //  });
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
    error

   } = this.state;
   const isInvalid =
     passwordOne !== passwordTwo ||
     passwordOne === "" ||
     email === "" ||
     title === "";
     
    return(
      <main style={{ minHeight: `100vh`, padding: `3rem 3rem`, }} className="has-dflex-center">
        <section style={{ minHeight: `100vh`, padding: `2rem 0`,  }}>
           <div className="lx-container-70">
              <div className="lx-row">
                <h1 style= {{ fontSize: `45px`, fontWeight: `bold`, }} 
                  className="title">CTD Profile</h1>
              </div>

           <div style= {{ gridTemplateRows: `auto 1fr auto`, backgroundSize: `contain`,
                backgroundPosition: `center`, backgroundRepeat: `no-repeat`, }}
                className="lx-row align-stretch">
           <div style= {{ display: `flex`, alignItems: `center`, justifyContent: `flex-end`, maxWidth: `25rem`, float: `left`,
                width: `45%`, padding: `10px`, }} 
                className="lx-column column-user-pic">
           <div style= {{ width: `50%`, maxWidth: `30rem`, margin: `6rem .05rem`, display: `flex`, flexFlow: `wrap column`, 
                alignItems: `center`, justifyContent: `center`, borderRadius: `0.25rem`, backgroundColor: `white`, }}
                className="profile-pic bs-md">
            {/* <ProfilePic /> */}
           <div style= {{ width: `20rem`, height: `20rem`, position: `relative`, overflow: `hidden`, borderRadius: `50%`, }} 
                className="pic bs-md">      
                       
              <img style= {{ width: `100%`, height: `100%`, objectFit: `cover`, objectPosition: `center`, }} 
                    src="https://bit.ly/3jRbrbp" alt="" loading="lazy" />
                    
                    <a style= {{ opacity: `0`, width: `5-0%`, height: `100%`, margin: `25px`, padding: `0`, position: `absolute`,
                        transform: `translate(-50%, -50%)`, top: `50%`, left: `50%`, display: `none`, alignItems: `center`,
                        justifyContent: `center`, textTransform: `none`, fontSize: `1rem`, color: `white`, 
                        backgroundColor: `rgba(0, 0, 0, 0.8)`, }} id="change-avatar" className="lx-btn"></a>
                  
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
                <input className="col-6 form-control" name="Language" onChange={this.handleChange} type="text" value={this.state.value} placeholder="Projects" id="projects" autocomplete="projects" required></input>  
          </div>
        </div>  

        <div className="fieldset">
          <div className="input-wrapper"> 
            <span className="icon"> 
              <i className="fas fa-language fa-1x"/></span>
              &nbsp;&nbsp;
              &nbsp;&nbsp;
              <input className="col-6 form-control" name="Language" onChange={this.handleChange} type="text" value={this.state.value} placeholder="Language" id="username" autocomplete="username" required></input> 
          </div>
        </div>

        <div className="fieldset">
          <div className="input-wrapper"> 
            <span className="icon"> 
              <i className="fas fa-chalkboard-teacher fa-1x"/></span>
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
              <i className="fas fa-landmark fa-1x"/></span>
              &nbsp;&nbsp;
              &nbsp;&nbsp;
              <input className="col-6 form-control" name="State" onChange={this.handleChange} type="text" value={this.state.value}
                placeholder="State" id="username" autocomplete="username" required></input> 
          </div>
        </div>

        <div className="fieldset">
          <div className="input-wrapper"> 
            <span className="icon"> 
              <i className="fas fa-globe fa-1x"/></span>
              &nbsp;&nbsp;
              &nbsp;&nbsp;
              <input className="col-6 form-control" name="Country" onChange={this.handleChange} type="text" value={this.state.value}
                placeholder="Country" id="username" autocomplete="username" required></input> 
          </div>
        </div> 

        <div className="fieldset">
          <div className="input-wrapper"> 
            <span className="icon"> 
              <i className="fas fa-podcast fa-1x"/></span>
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
              <i className="fas fa-laptop-code fa-1x"/></span>
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

      
        
         <Button className="button-tertiary" disable={isInvalid} type="submit">
          Sign Up
         </Button> 

        {/* {error && <p>{error.message}</p>} */}
        {/* <Button onChange='submit'>Submit</Button> */}

{/* 
        <Link to={'/directory/profile.js'}>
        <Button> Profile Page </Button>
        </Link>
        {error && <p>{error.message}</p>} */}
    
      </form>
    </FormWrapper>           
            
           </div>
        </div>        
      </section>
    </main>

    
    )
 };

};
        

      
      
export default Profile;





