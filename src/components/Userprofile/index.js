import React from "react";
import { EmailIcon, FacebookIcon, LinkedinIcon } from "react-share";
import { withFirebase } from "../Firebase";
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
  fileSelctHandler = (e) => {
    //console.log("photoUrle",e.target.files[0])
    let image =  e.target.files[0]
    this.setState({ selectedFile:image
     });
    console.log("uploaded file", this.state.selectedFile);
  };
  onUploadHundler = (e, authUser) => {
    const autherId = authUser.uid;
    e.preventDefault();
    console.log("uploded image",this.state.selectedFile)
    this.props.firebase
    .user(autherId)
    .Update({
     photoUrl: this.state.selectedFile
    })
    
  };
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
                        <span  className="PhotoCamera">
                        <i
                          className="fa fa-camera"
                          aria-hidden="true"
                          onClick={this.togglePopup}
                        />
                        </span>

                        {this.state.showPopup ? (
                          <div className="prfilecard">
                            <i
                              className="fa fa-photo"
                              style={{
                                width: "60px",
                                height: "60px",
                                padding: "40%",
                              }}
                            />
                            <input
                              type="file"
                              onChange={this.fileSelctHandler}
                            />
                            <div>
                              <button
                                type="submit"
                                onClick={(e) => this.onUploadHundler(e, authUser)
                                }
                              >
                                uploadFile
                              </button>
                            </div>
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
export default Userprofile;
