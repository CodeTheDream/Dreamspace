import React from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../../components/Session";
const moment = require("moment");
class ReplyComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeCreated: "",
      showAll: false,
      showPopup: false,
      username: "",
      photoUrl: "",
reply2:""
    };
  }
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };
  cancle = () => {
    this.setState({ showPopup: false });
  };
  componentDidMount = () => {
    
    this.getReplyUserDetails();
  
  };
  getReplyUserDetails = () => {
  
    this.props.firebase
      .user(this.props.reply.userId)
      .get()
      .then((doc) => {
        let user = doc.data();
        this.setState({
          username: user.username,
          photoUrl: user.photoUrl,
        });
      });

  };

  showMore = () => {
  this.setState({ showAll: true });
  }

  showLess = () => this.setState({ showAll: false });
  render() {
    const { commentId, replys, limited, reply } = this.props;
    const {showAll,reply2} = this.state;
    let commentReply = reply.reply;
    const replyToRender = replys.filter((reply1) =>
      commentId === reply1.parentCommentId ? reply1.parentCommentId : null
    );
    const numOfReplys = replyToRender.length;
   
   if (reply.reply.length <= limited) {
      return (
        <div>
            <div>
              <div>
                <div>
                  <div className="replystayle">
                    <p>
                      {" "}
                      <span />
                      <img
                        src={this.state.photoUrl}
                        alt=""
                        className="user-profile"
                      />{" "}
                      posted By {this.state.username} {reply.timeCreated}
                    </p>
                    <p className="replystyle">{reply.reply}</p>
                  </div>
                </div>
              </div>
              <div className="replypage-hide">
               
              </div>
            </div>
        </div>
      );
    } else {
      if (showAll) {
        return (
          <div>
              <div>
                <div>
                  <div>
                    <div className="replystayle">
                      <p>
                        {" "}
                        <span />
                        <img
                          src={this.state.photoUrl}
                          alt=""
                          className="user-profile"
                        />{" "}
                        posted By {this.state.username} {reply.timeCreated}
                      </p>
                      <p className="replystyle">
                        {reply.reply}
                        <a 
                          onClick={this.showLess}
                          style={{ color: "darkblue" }}
                        
                        >
                          Read less
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="replypage-hide">
               
                </div>
              </div>
          
          </div>
        );
      }
    }
    const toShow = commentReply.substring(0, limited) + "....";
    if (toShow) {
      return (
        <div>
            <div>
              <div>
                <div>
                  <div className="replystayle">
                    <p>
                      {" "}
                      <span />
                      <img
                        src={this.state.photoUrl}
                        alt=""
                        className="user-profile"
                      />{" "}
                      posted By {this.state.username} {reply.timeCreated}
                    </p>
                    <p className="replystyle">
                      {toShow}
                      <a onClick={this.showMore} style={{ color: "darkblue" }}>
                        {" "}
                        Read More{" "}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="replypage-hide">
                
            
              </div>
            </div>
         
        </div>
      
      )
    }
  }
}export default compose(withFirebase)(ReplyComment);
