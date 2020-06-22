import React from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../../components/Session";
import AddReplys1 from "../AddReplys1";
const moment = require("moment");

class ReplyComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeCreated: "",
      //replys: [],
      //limit: 5,
      showAll: false,
      showPopup: false,
      username:"",
      reply:"",
      photoUrl:""
    };
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };
  cancle = () => {
    this.setState({ showPopup: false });
  };

  componentDidMount = (authUser) => { 
  // this.replyCommentUser(authUser)
  
  }
   replyCommentUser = (e, authUser) => {
    //e.preventDefault();
    console.log("my new url", authUser);
    //const autherId = authUser.uid;
    this.props.firebase
    .user()
   .get()
   .then((doc) => {
     console.log("userdata in comment", doc.data())
     let user = doc.data();
     this.setState({
       // username: user.username,
       // photoUrl: user.photoUrl
        });
      })
  };
  

  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });

  render() {
    const {  timeCreated, commentId, userName ,replysId,replys,replyUserId,totallReply} = this.props;
    
 console.log("replyUserID at reply render",replyUserId)
    return (
      <AuthUserContext.Consumer>
      {(authUser) => (
      <div>
        <div className="replypage"  >
          <i
            className="fas fa-angle-down "
            style={{ width: "10em" }}
            onClick={() =>{ this.togglePopup()}
         // this.replyCommentUser(authUser)
        }
          >
            {" "}
            view{""} {this.props.totallReplys}
            {" more "}
            {" Replys "}
          </i>
        </div>
        {this.state.showPopup ? (
          <div>
          <div>
            {replys.map(reply => {
             // console.log("this is the the ParentcommentId in replys", reply.parentCommentId);
             
             
              if(commentId===reply.parentCommentId){
                
              return (
                <div>
                  <div className="replystayle">
                    <p>
                      {" "}
                      <span /><img src={reply.photoUrl} className="user-profile" />{" "} posted By {this.state.userName}{" "}
                      
                      {reply.timeCreated}
                    </p>
                    <p>{reply.reply}</p>
                  </div>
                
                </div>
              );
              }
            })
            }
          </div>
              <div className="replypage-hide">
              <i
             className="fas fa-angle-up " 
             style={{ width: "10em" }}
              
           onClick={this.cancle}>{" "}Hide {" "} viwe</i>
           
            </div>
            </div>
        ) : null}
      </div>
       )}
       </AuthUserContext.Consumer>
    );
  }
}

export default compose(withFirebase)(ReplyComment);
