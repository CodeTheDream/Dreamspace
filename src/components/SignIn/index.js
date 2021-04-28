
  
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
//import { PasswordForgetLink } from '../PasswordForget';
import  PasswordForgetLink  from '../PasswordForgetForm'; 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
   
     <div className="signinpage">
    <h3 className="signin">SignIn</h3>

      
<div className="outer">
   <div className="inner">    <SignInGoogle /></div> 
     {/* <div className="inner"> <SignInFacebook /></div>*/}
       <div className="inner"> <SignInGithub/></div>
</div>
        <p style={{ textAlign: "center" }}>Or sign in manually:</p>


        <SignInForm />
         <PasswordForgetLink /> 
        <SignUpLink />
    </div>
    
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
    'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. 
`;

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div className="view-container">
                <form onSubmit={this.onSubmit} className="form">
                    
                        <input
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email Address"
                        />
                        <input
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Password"
                        />
                        <button className="button-tertiary" disabled={isInvalid} type="submit">
                            Sign In
        </button>

                        {error && <p>{error.message}</p>}
                    
                </form>
            </div>
        );
    }
}

class SignInGoogleBase extends Component {
  constructor(props) {
   super(props);

     this.state = { error: null };
  }

  onSubmit = event => {
      this.props.firebase
          .doSignInWithGoogle()
      .then(socialAuthUser => {
       // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set(
            {

                username: socialAuthUser.user.displayName,
                photoUrl: socialAuthUser.user.photoURL,
             email: socialAuthUser.user.email,
            roles: {},
          },
           { merge: true },
          )
      })
          .then(() => {
              this.setState({ error: null });
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

  render() {
    const { error } = this.state;

      return (
      
      <form onSubmit={this.onSubmit}>
{/*  <button type="submit" className="googlebtn" style={{ fontSize: "24px" }}> <i class="fa fa-google fa-fw" style={{ float: "left" }}/>{"  "}
            
                <p style={{ textAlighn: "" }}> Login with Google+</p> </button>*/}

              <button type="submit" className="googlebtn" style={{ fontSize: "20px" }}><i class="fa fa-google fa-fw" > </i> 
 
  
</button>
{error && <p>{error.message}</p>}
 </form>
 
 
);
}
}

 class SignInFacebookBase extends Component {
   constructor(props) {
    super(props);

    this.state = { error: null };
  }

   onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
       .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
         return this.props.firebase.user(socialAuthUser.user.uid).set(
           {
                 username: socialAuthUser.user.displayName,
                 photoUrl: socialAuthUser.user.photoURL,
                 email: socialAuthUser.user.email,
                 roles: {},
                 /*username: socialAuthUser.user.displayName,
                 photoUrl: socialAuthUser.user.photoURL,
                 email: socialAuthUser.user.email,
                 roles: {},*/
          },
           { merge: true },
         );
       })
    .then(() => {
        this.setState({ error: null });
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

   render() {
     const { error } = this.state;

     return (
       <form onSubmit={this.onSubmit}>
             <button type="submit" style={{ fontSize: "20px" }} className="fb"><i class="fa fa-facebook fa-fw" /></button>

       {error && <div className="errormessage">{error.message}</div>}
      </form>
     );
   }
 }

 class SignInGithubBase extends Component {
  constructor(props) {
     super(props);

    this.state = { error: null,
      showPopup:false
     };
  }
 /* togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };*/

  /*closePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
         });
    this.myFormRef.reset();
  };*/

  onSubmit = event => {
    this.props.firebase
        .doSignInWithGithub()
       .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
         return this.props.firebase.user(socialAuthUser.user.uid).set(
           {
                // username: socialAuthUser.additionalUserInfo.profile.name,
                  //username: socialAuthUser.user.displayName,
                    //email: socialAuthUser.user.email,
                 //roles: {},
                 username: socialAuthUser.user.displayName,
                 email: socialAuthUser.user.email,                
                 photoUrl: socialAuthUser.user.photoURL,               
                 roles: {},
          },
          { merge: true },
         );
      })
        .then(() => {
            this.setState({ error: null });
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

  render() {
    const { error } = this.state;

   return (
   
      <form onSubmit={this.onSubmit}  ref={(el) => (this.myFormRef = el)}>
         <div>  <button type="submit" style={{ fontSize: "20px" }} className="github"  >
           <i class="fa fa-github" />{" "}</button></div>
         <div className="message">
          {error && <div className="errormessage">
          {error.message} </div>}
         </div>
      </form>
     
    );
  }
 }


const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

 const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

const SignInGithub = compose(
  withRouter,
  withFirebase,
)(SignInGithubBase);

export default SignInPage;

export { SignInGoogle };
export { SignInForm };
export { SignInFacebook };
export { SignInGithub }



// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { compose } from 'recompose';
// import { SignUpLink } from '../SignUp';
// //import { PasswordForgetLink } from '../PasswordForget';
// import  PasswordForgetLink  from '../PasswordForgetForm'; 
// import { withFirebase } from '../Firebase';
// import * as ROUTES from '../../constants/routes';




// const SignInPage = () => (
   
//      <div className="signinpage">
//      <h3 className="signin">SignIn</h3>

      
//      <div className="outer">
//       <div className="inner">    <SignInGoogle /></div> 
//         {/* <div className="inner"> <SignInFacebook /></div>*/}
//         <div className="inner"> <SignInGithub/></div>
//      </div>
//         <p style={{ textAlign: "center" }}>Or sign in manually:</p>

//         <SignInForm />
//         <PasswordForgetLink /> 
//         <SignUpLink />
//      </div>
    
// );

// const INITIAL_STATE = {
//     email: '',
//     password: '',
//     error: null,
// };

// const ERROR_CODE_ACCOUNT_EXISTS =
//     'auth/account-exists-with-different-credential';

// const ERROR_MSG_ACCOUNT_EXISTS = `
//   An account with an E-Mail address to
//   this social account already exists. 
// `;

// class SignInFormBase extends Component {
//     constructor(props) {
//         super(props);

//         this.state = { ...INITIAL_STATE };
//     }

//     onSubmit = event => {
//         const { email, password } = this.state;

//         this.props.firebase
//             .doSignInWithEmailAndPassword(email, password)
//             .then(() => {
//                 this.setState({ ...INITIAL_STATE });
//                 this.props.history.push(ROUTES.HOME);
//             })
//             .catch(error => {
//                 this.setState({ error });
//             });

//         event.preventDefault();
//     };

//     onChange = event => {
//         this.setState({ [event.target.name]: event.target.value });
//     };

//     render() {
//         const { email, password, error } = this.state;

//         const isInvalid = password === '' || email === '';

//         return (
//             <div className="view-container">
//                 <form onSubmit={this.onSubmit} className="form">
                    
//                     <input
//                       name="email"
//                       value={email}
//                       onChange={this.onChange}
//                       type="text"
//                       placeholder="Email Address"
//                     />
//                     <input
//                       name="password"
//                       value={password}
//                       onChange={this.onChange}
//                       type="password"
//                       placeholder="Password"
//                     />
//                       <button className="button-tertiary" disabled={isInvalid} type="submit">
//                             Sign In
//                       </button>

//                         {error && <p>{error.message}</p>}
                    
//                 </form>
//             </div>
//         );
//     }
// }

// class SignInGoogleBase extends Component {
//   constructor(props) {
//    super(props);

//      this.state = { error: null };
//   }

//   onSubmit = event => {
//       this.props.firebase
//           .doSignInWithGoogle()
//       .then(socialAuthUser => {
//        // Create a user in your Firebase Realtime Database too
//         return this.props.firebase.user(socialAuthUser.user.uid).set(
//             {

//              username: socialAuthUser.user.displayName,
//              photoUrl: socialAuthUser.user.photoURL,
//              email: socialAuthUser.user.email,
//              roles: {},
//           },
//            { merge: true },
//           )
//       })
//           .then(() => {
//               this.setState({ error: null });
//         this.props.history.push(ROUTES.HOME);
//      })
//       .catch(error => {
//        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
//          error.message = ERROR_MSG_ACCOUNT_EXISTS;
//          }

//           this.setState({ error });
//       });

//      event.preventDefault();
//    };

//   render() {
//     const { error } = this.state;

//       return (
      
//         <form onSubmit={this.onSubmit}>
// {/*  <button type="submit" className="googlebtn" style={{ fontSize: "24px" }}> <i class="fa fa-google fa-fw" style={{ float: "left" }}/>{"  "}
            
//                 <p style={{ textAlighn: "" }}> Login with Google+</p> </button>*/}

//            <button type="submit" className="googlebtn" style={{ fontSize: "20px" }}><i class="fa fa-google fa-fw" > </i></button>

//           {error && <p>{error.message}</p>}
//         </form>
 
 
// );
// }
// }

//  class SignInFacebookBase extends Component {
//    constructor(props) {
//     super(props);

//     this.state = { error: null };
//   }

//    onSubmit = event => {
//     this.props.firebase
//       .doSignInWithFacebook()
//        .then(socialAuthUser => {
//         // Create a user in your Firebase Realtime Database too
//          return this.props.firebase.user(socialAuthUser.user.uid).set(
//            {
//                  username: socialAuthUser.user.displayName,
//                  photoUrl: socialAuthUser.user.photoURL,
//                  email: socialAuthUser.user.email,
//                  roles: {},
//                  /*username: socialAuthUser.user.displayName,
//                  photoUrl: socialAuthUser.user.photoURL,
//                  email: socialAuthUser.user.email,
//                  roles: {},*/
//           },
//            { merge: true },
//          );
//        })
//     .then(() => {
//         this.setState({ error: null });
//         this.props.history.push(ROUTES.HOME);
//        })
//       .catch(error => {
//        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
//           error.message = ERROR_MSG_ACCOUNT_EXISTS;
//         }

//          this.setState({ error });
//       });

//      event.preventDefault();
//    };

//    render() {
//      const { error } = this.state;

//      return (
//        <form onSubmit={this.onSubmit}>
//              <button type="submit" style={{ fontSize: "20px" }} className="fb"><i class="fa fa-facebook fa-fw" /></button>

//        {error && <div className="errormessage">{error.message}</div>}
//       </form>
//      );
//    }
//  }

//  class SignInGithubBase extends Component {
//   constructor(props) {
//      super(props);

//     this.state = { error: null,
//       showPopup:false
//      };
//   }
//  /* togglePopup = () => {
//     this.setState({
//       showPopup: !this.state.showPopup
//     });
//   };*/

//   /*closePopup = () => {
//     this.setState({
//       showPopup: !this.state.showPopup
//          });
//     this.myFormRef.reset();
//   };*/

//   onSubmit = event => {
//     this.props.firebase
//         .doSignInWithGithub()
//        .then(socialAuthUser => {
//         // Create a user in your Firebase Realtime Database too
//          return this.props.firebase.user(socialAuthUser.user.uid).set(
//            {
//                 // username: socialAuthUser.additionalUserInfo.profile.name,
//                   //username: socialAuthUser.user.displayName,
//                     //email: socialAuthUser.user.email,
//                  //roles: {},
//                  username: socialAuthUser.user.displayName,
//                  email: socialAuthUser.user.email,                
//                  photoUrl: socialAuthUser.user.photoURL,               
//                  roles: {},
//           },
//           { merge: true },
//          );
//       })
//         .then(() => {
//             this.setState({ error: null });
//          this.props.history.push(ROUTES.HOME);
//        })
//        .catch(error => {
//         if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
//           error.message = ERROR_MSG_ACCOUNT_EXISTS;
//          }

//         this.setState({ error });
//        });

//      event.preventDefault();
//    };

//   render() {
//     const { error } = this.state;

//       return (
   
//        <form onSubmit={this.onSubmit}  ref={(el) => (this.myFormRef = el)}>
//          <div> <button type="submit" style={{ fontSize: "20px" }} className="github" >
//              <i class="fa fa-github" />{" "}</button>
//          </div>
//          <div className="message">
//           {error && <div className="errormessage">
//           {error.message} </div>}
//          </div>
//        </form>
     
//     );
//   }
//  }


// const SignInForm = compose(
//     withRouter,
//     withFirebase,
// )(SignInFormBase);

// const SignInGoogle = compose(
//   withRouter,
//   withFirebase,
// )(SignInGoogleBase);

//  const SignInFacebook = compose(
//   withRouter,
//   withFirebase,
// )(SignInFacebookBase);

// const SignInGithub = compose(
//   withRouter,
//   withFirebase,
// )(SignInGithubBase);

// export default SignInPage;

// export { SignInGoogle };
// export { SignInForm };
// export { SignInFacebook };
// export { SignInGithub };