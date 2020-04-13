import React from "react";
import { EmailIcon, FacebookIcon, LinkedinIcon } from "react-share";
import { withFirebase ,storage} from "../Firebase";
//import storage from "../Firebase/firbaseStorage"
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";
import SignOut from "../SignOut";
import Setting from "../../containers/Account";
const options = ["username", "profile", "setting"];
class Userprofile extends React.Component {
  constructor(props) {
    // console.log("this is the props value:" + props)
    super(props);
    this.state = {
      article: [],
      username: "",

      photoUrl: " ",
      name: "",
      email: "",
      photoUrl: "",
      selectedFile: null,
      image: null,
      url: "",
      progress: 0,
    };
  }
  /*componentDidUpdate(prevProps) {
    if (this.props.photoUrl && prevProps.photoUrl !== this.props.photoUrl) {
        this.setState({ profilePicture: this.props.photoUrl })
    }
}*/

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };
 
  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };
 /* handleUpload = (e,authUser) => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.setState({ url });
          });
      }
    );
    const autherId = authUser.uid;
    e.preventDefault();
    console.log("uploded image",this.state.selectedFile)
    this.props.firebase
    .user(autherId)
    .pudate({
     photoUrl: this.state.url
    })
  };*/
  render() {
    const { selectedFile } = this.state;
    // console.log("authuser", selectedFile);
   
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            <div className="dropdown">
              <div className="dropbtn">
                <i style={{ Color: "#fae596" }}>
                  {" "}
                  <img src={authUser.photoUrl} className="user-profile1" />
                </i>{" "}
                <i className="fa fa-caret-down" style={{ Color: "#fae596" }} />
                <div className="dropdown-content">
                  <div>
                    <span>
                      <img src={authUser.photoUrl} className="user-profile11" />
                      <div>
                        <span className="PhotoCamera">
                          <i
                            className="fa fa-camera"
                            aria-hidden="true"
                            onClick={this.togglePopup}
                          />
                        </span>

                        {this.state.showPopup ? (
                          <div className="prfilecard">
                            

                           {/* <div className="style">
                              <progress value={this.state.progress} max="100" />
                              <br />
                              <input type="file" onChange={this.handleChange} />
                              <button onClick={this.handleUpload}>
                                Upload
                              </button>
                              <br />
                              <img
                                src={
                                  this.state.url ||
                                  "http://via.placeholder.com/400x300"
                                }
                                alt="Uploaded images"
                                height="300"
                                width="400"
                              />
                              </div>*/}
                          </div>
                        ) : null}
                      </div>
                    </span>
                    {"   "}

                    <p>{authUser.username}</p>
                    <p>{authUser.email}</p>
                  </div>

                  <div>
                    <Link to={ROUTES.ACCOUNT}>
                      {" "}
                      <i className="fal fa-cog" style={{ Color: "#fae596" }} />
                      {"  "}
                      UserSetting{" "}
                    </Link>
                    <SignOut />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default withFirebase(Userprofile);
