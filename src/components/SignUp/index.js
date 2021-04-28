
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import styled from 'styled-components';

// const Button = styled.button`
//   cursor: pointer;
//   background: blue;
//   font-size: 16px;
//   border-radius: 25px;
//   color: white;
//   margin-left: 12px;
//   margin-right: 20px; 
//   padding: .75em .75em;
//   transition: 0.5s all ease-out;
 
//   &:hover {
//     background-color: white;
//     color: black;
//   }
// `;

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
//   <div>
//    <br />
//    <br />
//     <h1>SignUp</h1>
//     <SignUpForm />
//   </div>
<div style={{ marginTop: "4.8em" }}>
   <div className="signup"></div>
    <h3 className="signin">SignUp</h3>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  firstName: '',
   photoURL: "https://ya-webdesign.com/images250_/placeholder-image-png-1.png",
  lastName: '',
  developer: '',
  github: '',
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
      const { username, firstName, lastName, developer, github, email, passwordOne, passwordTwo, isAdmin } = this.state;
    // console.log('email', email);
      const roles = {};

    //   onSubmit = event => {
    //     const { username, email, passwordOne, isAdmin,interest,education,aboutyourself} = this.state;
    //    const roles = {};
//       // users = () => this.db.collection("users");
//      this.db.collection("users").document(firebase.getInstance().getCurrentUser().getUid())
//       .get().addOnCompleteListener(authUser => {
//       if(authUser.isSuccessful() && authUser.getResult() != null) {
//       firstName = authUser.getResult().getString("First Name");
//       lastName = authUser.getResult().getString("Last Name");
//       email = authUser.getResult().getString("Email");
//       developer = authUser.getResult().getString("developer");
//       passwordOne = authUser.getResult().getString("passwordOne");
//       passwordTwo = authUser.getResult().getString("passwordTwo");
//       //other stuff
//    } else {
//       //deal with err
//   }
// });
  
    if (isAdmin) {
       roles[ROLES.ADMIN] = ROLES.ADMIN;
    // }
 // else {
    //   roles[ROLES.NONADMIN] = ROLES.NONADMIN;
    // }
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
            developer,
            github,
            passwordOne,
            passwordTwo
          
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
      firstName,
      lastName,
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
    
    return (
      <FormWrapper>
        <form onSubmit={this.onSubmit}>
          <div className="fieldset">
            <div className="input-wrapper"> 
              <span className="icon"> 
                <i className="fas fa-portrait fa-1x"/></span>
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                <input className="col-6 form-control" name="firstName" onChange={this.onChange} type="text" value={this.state.value} placeholder="First Name" required></input>            
            </div>
          </div>

          <div className="fieldset">
            <div className="input-wrapper"> 
              <span className="icon"> 
                <i className="fas fa-portrait fa-1x"/></span>
                  
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                <input className="col-6 form-control" name="lastName" onChange={this.onChange} type="text" value={this.state.value} placeholder="Last Name" required></input>            
            </div>
          </div>
          
          <div className="fieldset">
            <div className="input-wrapper"> 
            <span className="icon"> 
                <i className="fab fa-dev fa-1x"/></span>
                &nbsp;&nbsp;
                &nbsp;&nbsp;
              <input list="developer" id="developer-choice" name="developer" onChange={this.onChange} {...developer} placeholder='Developer' required/>
                  <datalist id="developer">
                      <option value="Frontend" />
                      <option value="Backend" />
                      <option value="Full Stack" />
                  </datalist>
                    
            </div>
          </div>   

          <div className="fieldset">
            <div className="input-wrapper"> 
              <span className="icon"> 
                <i className="fab fa-github-square fa-1x"/></span>
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                <input className="col-6 form-control" name="github" onChange={this.onChange} type="text" value={this.state.value}
                placeholder="Github" required></input> 
          </div>
        </div>
        <hr />

        <div className="fieldset">
          <div className="input-wrapper"> 
            <span className="icon"> 
              <i className="fas fa-envelope fa-1x"/></span>
              &nbsp;&nbsp;
              &nbsp;&nbsp;
              <input className="col-6 form-control" name="email" onChange={this.onChange} type="text" value={this.state.value} placeholder="Email" required></input> 
          </div>
        </div>

        <div className="fieldset">
          <div className="input-wrapper"> 
            <span className="icon"> 
              <i className="fas fa-unlock-alt fa-1x"/></span>
              &nbsp;&nbsp;
              &nbsp;&nbsp;
              <input className="col-6 form-control" name="passwordOne" onChange={this.onChange} type="password" value={this.state.value}
                placeholder="Password" required></input> 
          </div>
        </div>

        <div className="fieldset">
          <div className="input-wrapper"> 
            <span className="icon"> 
              <i className="fas fa-lock-alt fa-1x"/></span>
              &nbsp;&nbsp;
              &nbsp;&nbsp;
              <input className="col-6 form-control" name={passwordTwo} onChange={this.onChange} type="password" value={this.state.value}
                placeholder="Confirm Password" required></input> 
          </div>
        </div>

        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label> 

        {/* <Button className="button-tertiary" disable={isInvalid} type="submit">
          Sign Up
        </Button> */}
        {/* <Button type='submit' value='onSubmit'>Submit</Button>   */}
{/* //             <br />
//             <br />

//            <Link to={'/directory/profile.js'}>
//            <Button> Profile Page </Button>
//            </Link>
//            {error && <p>{error.message}</p> */}
        <button className="button-tertiary" disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    </FormWrapper>
    
    );

}};
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
export default { SignUpForm, SignUpLink };




// //commented out file for commit, push and pull capabilities


// import React, { Component } from "react";
// import { Link, withRouter } from "react-router-dom";
// import { withFirebase } from "../Firebase";
// import * as ROUTES from "../../constants/routes";
// import * as ROLES from "../../constants/roles";
// const SignUpPage = () => (
//   <div style={{ marginTop: "4.8em" }}>
//    < div className="signup"></div>
//     <h3 className="signin">SignUp</h3>
//     <SignUpForm />
//   </div>
// );
// const INITIAL_STATE = {
//   username: "name",
//    email: "",
//   photoUrl: "https://ya-webdesign.com/images250_/placeholder-image-png-1.png",
//   passwordOne: "",
//   passwordTwo: "",
//   isAdmin: false,
//   error: null,
//   education:"",
//   interest:"",
//   aboutyourself:""
// };
// const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";
// const ERROR_MSG_ACCOUNT_EXISTS = `
//   An account with this E-Mail address already exists.
//   Try to login with this account instead. If you think the
//   account is already used from one of the social logins, try
//   to sign in with one of them. Afterward, associate your accounts
//   on your personal account page.
// `;
// class SignUpFormBase extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { ...INITIAL_STATE };
//   }
//   onSubmit = event => {
//     const { username, email, passwordOne, isAdmin,interest,education,aboutyourself} = this.state;
//    const roles = {};
//     if (isAdmin) {
//       roles[ROLES.ADMIN] = ROLES.ADMIN;
//     }
//     // else {
//     //   roles[ROLES.NONADMIN] = ROLES.NONADMIN;
//     // }
//     console.log("roles: ", roles);
//     this.props.firebase
//       .doCreateUserWithEmailAndPassword(email, passwordOne)
//       .then(authUser => {
//         // Create a user in your Firebase realtime database
//         return this.props.firebase.user(authUser.user.uid).set(
//           {
//             username,
//                 email,
//                 roles,
//                 education,
//                 interest,
//                 aboutyourself
//           },
//           { merge: true }
//         );
//       })
//       .then(() => {
//         return this.props.firebase.doSendEmailVerification();
//       })
//       .then(() => {
//         this.setState({ ...INITIAL_STATE });
//         this.props.history.push(ROUTES.HOME);
//       })
//       .catch(error => {
//         if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
//           error.message = ERROR_MSG_ACCOUNT_EXISTS;
//         }
//         this.setState({ error });
//       });
//     event.preventDefault();
//   };
//   onChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };
//   onChangeCheckbox = event => {
//     this.setState({ [event.target.name]: event.target.checked });
//   };
//   render() {
//     const {
//       username,
//       email,
//       passwordOne,
//       passwordTwo,
//       isAdmin,
//       error,
     
//     } = this.state;
//     const isInvalid =
//       passwordOne !== passwordTwo ||
//       passwordOne === "" ||
//       email === "" ||
//       username === "";
//       return (
//           <div className="view-container-signup">
//               <form  className="form" onSubmit={this.onSubmit} >
           
//         <input
//           name="username"
//           value={username}
//           onChange={this.onChange}
//           type="text"
//           placeholder="Full Name"
//         />
//         <input
//           name="email"
//           value={email}
//           onChange={this.onChange}
//           type="text"
//           placeholder="Email Address"
//         />
//         <input
//           name="passwordOne"
//           value={passwordOne}
//           onChange={this.onChange}
//           type="password"
//           placeholder="Password"
//         />
//         <input
//           name="passwordTwo"
//           value={passwordTwo}
//           onChange={this.onChange}
//           type="password"
//           placeholder="Confirm Password"
//         />
//                       <button className="button-tertiary" disabled={isInvalid} type="submit">
//           Sign Up
//         </button>
//               {error && <p>{error.message}</p>}
            
//         </form>
//     </div>
//     );
//   }
// }
// const SignUpLink = () => (
//   <p>
//     Don't have an account? <Link className="linkstyle" to={ROUTES.SIGNUP}>Sign Up</Link>
//   </p>
// );
// const SignUpForm = withRouter(withFirebase(SignUpFormBase));
// export default SignUpPage;
// export { SignUpForm, SignUpLink }