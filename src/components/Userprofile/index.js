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
      url:"https://avatars3.githubusercontent.com/u/54107158?s=400&u=7d1a895b87fdfdb4d2de1fb52fec5f1ec8073233&v=4",
      progress: 0,
      crewDirectory: [],
    searchDirectory: "",
    };
  }
  /*
  componentDidMount() {
    this.directoryAirTable();
  }
  selectedStaffMember = (id) => {                                                  
    let allStaffMembers = this.state.crewDirectory;                                
    console.log('look at ', id)                                                      
    let selectStaffMember = allStaffMembers.find(x => x.id === id);
    console.log('selectStaffMember ', selectStaffMember)                                      
    this.setState({                                                                
       selectStaffMember                                                    
    })  
    console.log(selectStaffMember)                                                              
  } 
  directoryAirTable() {
    const url = "https://api.airtable.com/v0/appBu5I7tEJENCp45/Employee%20directory";
      fetch(url, {
        headers: { Authorization: "Bearer " + process.env.REACT_APP_DIRECTORY_AIRTABLE_KEY  }
      })
      .then(response => response.json())
      .then(responseData => {
        console.log("directory data ", responseData);
        const crewDirectory = responseData.records;
        console.log("crewDirectory ", crewDirectory);
        this.setState({
          crewDirectory: crewDirectory, 
          allDirectory: crewDirectory,
        })
      });
    }
*/

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };
 
  /*handleChange = (e) => {
   
    }
  };*/
 
  handleUpload = (e, authUser) => {
    console.log("authUser1", authUser)
    e.preventDefault();
    const autherId = authUser.uid;

    this.props.firebase.user(autherId).update({
     
      photoUrl: this.state.url
    });
  };
  render() {
    const { selectedFile,url } = this.state;
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
                            

                            <div className="style">
                              <progress value={this.state.progress} max="100" />
                              <br />
                             {/* <input type="link" onChange={this.handleChange}/>*/}
                              <button onClick={e => this.handleUpload(e,authUser)}>
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
export default withFirebase(Userprofile);
