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
class UploadImage extends React.Component {
  constructor(props) {
    // console.log("this is the props value:" + props)
    super(props);
    this.state = {
      article: [],
      username: "",

      //photoUrl: " ",
      
      file: "",
    };
  }

 

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
            <form>
              <div className="uploadImage">{imgPreview}</div>

              <div>
                <input type="file" onChange={this.uploadSingleFile} />
              </div>
              <button type="button" onClick={(e) => this.upload(e, authUser)}>
                Upload
              </button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default withFirebase(UploadImage);
