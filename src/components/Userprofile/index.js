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

class Userprofile extends React.Component {
  constructor(props) {
   super(props);
    this.state = {
      article: [],
      username: "",
      name: "",
      email: "",
      selectedFile: null,
      image: null,
      progress: 0,
      crewDirectory: [],
      file: "",
      pics: [],
      url: "",
      urlError:""
    };
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };

  onUrlChange = (e) => {
    
    this.setState({
      url: e.target.value,
    });
  
  };
validate = () => {
let urlError= "";
if(this.state.url === ""){
urlError="Url cannot be blank"
}
if(urlError){
  this.setState({urlError})
  return false;
}
return true;
}
  upload = (e, authUser) => {
    e.preventDefault();
    const autherId = authUser.uid;
    const isValid = this.validate();
    if (isValid) {
   this.props.firebase.user(autherId).update({
     photoUrl: this.state.url,
    })}
    if(this.state.url){
    this.setState({
     url:"",
      urlError:""
    })}
  };
  cancleButton = (e) => {
    this.setState({ showPopup: false });
  };
  render() {
    const { url } = this.state;
    console.log("pics1", url);
    let imgPreview;
    let id;
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
                      <div className="PhotoCamera">
                        <span>
                          <i
                            className="fa fa-camera"
                            aria-hidden="true"
                            onClick={this.togglePopup}
                          />
                        </span>

                        {this.state.showPopup ? (
                          <div className="profilewraper">
                            <div className="prfilecard">
                              <div>
                                {" "}
                                <button
                                  className="canclebutton"
                                  onClick={(e) => this.cancleButton(e)}
                                >
                                  x
                                </button>
                              </div>
                              <br />

                              <div className="uploadimage">
                                <input
                                  className="imageinput"
                                  type="url"
                                  placeholder="Drage and drop your Image-URl"
                                  value={this.state.url}
                                  onChange={this.onUrlChange}
                                  required
                                />
                                
                                <button
                                  className="imageupload"
                                  onClick={(e) => this.upload(e, authUser)}
                                >
                                  upload Image
                                </button>

                              </div>
                        <div style={{fontSize:12 ,color:"red"}}>{this.state.urlError}</div>
                              <br />

                              <img
                                src={
                                  this.state.url ||
                                  "http://via.placeholder.com/100x100"
                                }
                                alt="Uploaded images"

                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </span>

                    <br />
                    <br />

                    <p>{authUser.username}</p>
                    <p>{authUser.email}</p>
                  </div>

                  <div className="AccountsignOut">
                    <Link to={ROUTES.ACCOUNT}>
                      {" "}
                      <i className="fal fa-cog" style={{ Color: "#fae596" }} />
                      {"  "}
                      UserSetting{" "}
                    </Link>
                   <span> 
                      <SignOut/>
                      </span>
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
