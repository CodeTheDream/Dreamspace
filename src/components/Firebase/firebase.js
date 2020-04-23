import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};
//export const storage = firebase.storage();
class Firebase {
  constructor() {
    console.log("API KEY", process.env.REACT_APP_API_KEY);
      app.initializeApp(config);


      

    /* Helper */
    this.fieldValue = app.firestore.FieldValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

      /* Social Sign In Method Provider */
      this.googleProvider = new app.auth.GoogleAuthProvider();
      this.facebookProvider = new app.auth.FacebookAuthProvider();
      this.githubProvider = new app.auth.GithubAuthProvider();
    /* Firebase APIs */
    this.auth = app.auth();
    this.db = app.firestore();
  }
  // *** Auth API ***
 doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
    //doSignInWithGoogle = () =>
     //this.googleProvider = new app.auth.GoogleAuthProvider();
    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);
     doSignInWithFacebook = () =>
        this.auth.signInWithPopup(this.facebookProvider);
    doSignInWithGithub = () =>
        this.auth.signInWithPopup(this.githubProvider);

  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
    });

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);


    
          
  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();
            // default empty roles
           if (!dbUser.roles) {
              dbUser.roles = {};
              }
             /*authUser.providerData.forEach(function (profile) {
                 //onsole.log("Sign-in provider: " + profile.providerId);
                  //nsole.log("  Provider-specific UID: " + profile.uid);
                  console.log("  Name: " + profile.displayName);
                 //onsole.log("  Email: " + profile.email);
                  console.log("  Photo URL: " + profile.photoURL);
              });*/
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              photoUrl: authUser.photoURL,
              education:authUser.education,
              interest:authUser.interest,
             aboutyouself:authUser.aboutyouself,
              ...dbUser
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });
  // *** User API ***
  user = uid => this.db.doc(`users/${uid}`);
  users = () => this.db.collection("users");
  // *** Article API ***
  article = uid => this.db.doc(`article/${uid}`);
  articles = () => this.db.collection("article");
  //*** Comments API ***
  comment = (uid) => {
    console.log('UID', uid)
    return this.db.doc(`comments/${uid}`);
  }
  comments = () => this.db.collection("comments");
  //*** Reply API ***
  // reply = uid => this.db.doc(`replies/${uid}`);
  // replies = () => this.db.collection('replies')
  //*** Reply API ***
  replys = commentId => this.db.collection(`comments/${commentId}/replys`);
  reply = (commentId, replyId) =>
    this.db.collection(`comments/${commentId}/replys/${replyId}`);
  //*** Tags API ***
  tag = uid => this.db.doc(`tags/${uid}`);
  tags = () => this.db.collection("tags");
}
export default Firebase; 