import React from "react";
import { EmailIcon, FacebookIcon, LinkedinIcon } from "react-share";
import { withFirebase, storage } from "../Firebase";
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
      //photoUrl: " ",
      name: "",
      email: "",
      selectedFile: null,
      image: null,
      progress: 0,
      crewDirectory: [],
      searchDirectory: "",
      file: "",
    };
  }
 /* componentDidMount = () => {
    const userInfo = this.props.children
    //const autherId = authUser.uid
   console.log("curentUserId", userInfo);
    this.props.firebase

      .user(userInfo)
      .get()
      .then((doc) => {
        // console.log("userdata", doc.data())
        let user = doc.data();
        this.setState({
          file:user.photoUrl
          
        });
      });
  };
*/

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };

  uploadSingleFile = (e) => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
    });
  
  };

  upload = (e, authUser) => {
    e.preventDefault();
    console.log("my new url", this.state.file);
    const autherId = authUser.uid;

    this.props.firebase.user(autherId).update({
      photoUrl: this.state.file,
    });
  };
  render() {
    const { selectedFile, url } = this.state;
    let imgPreview;
    if (this.state.file) {
      imgPreview = <img src={this.state.file} alt="" />;
    }
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
                            <form>
                              <div className="uploadImage">{imgPreview}</div>

                              <div   className="inputIageProfie">
                                <input
                                  type="file"
                                
                                  onChange={this.uploadSingleFile}
                                />
                              </div>
                              <button
                                type="button"
                                onClick={(e) => this.upload(e, authUser)}
                              >
                                Upload
                              </button>
                            </form>
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
