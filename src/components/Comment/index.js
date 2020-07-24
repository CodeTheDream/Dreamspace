import React from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../../components/Session";
import { withFirebase } from "../../components/Firebase";
import ReplyComment from "../ReplyComment";
import AddReplys from "../AddReplys";
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      showAll: false,
      commentId: "",
      replys: [],
      timeCreated: "",
      sortType: "asc",
      replysID: "",
      username: "",
      photoUrl: "",
      reply: "",
    };
  }
  componentDidMount = () => {
    const commentId = this.props.commentId;
    this.unsubscribe = this.props.firebase
      .comments(commentId)
      .onSnapshot((snapshot) => {
        const Replys = [];
        let replysId = "";
        snapshot.forEach((doc) => {
          const data = doc.data();
          replysId = doc.id;
          data.replysId = replysId;
          Replys.push(data);
        });
        this.setState({
          replys: Replys,
          replysId: replysId,
        });
        this.state.replys.map((reply) => {
          if (commentId === reply.parentCommentId) {
            if (reply) {
              this.setState({
                reply: reply,
              });
            }
          }
        });
      });
    let { comment } = this.props;
    let autherId = comment.userId;
    this.props.firebase
      .user(autherId)
      .get()
      .then((doc) => {
        let user = doc.data();
        this.setState({
          username: user.username,
          photoUrl: user.photoUrl,
        });
      });
  };
  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };

  render() {
    const { comment, limited, timeCreated, commentId, userName } = this.props;
    const { showAll, replys, sortType, replysId, reply } = this.state;
    const replyToRender = replys.filter((reply1) =>
      commentId === reply1.parentCommentId ? reply1.parentCommentId : null
    );
    const numOfReplys = replyToRender.length;
    let commentContent = comment.comment;
   
    if (replys) {
      replys.sort((a, b) => {
        const isReversed = sortType === "desc" ? 1 : -1;
        return isReversed * a.timeCreated.localeCompare(b.timeCreated);
      });
    }
    if (comment.comment && comment.comment.length <= limited) {
     
      return (
        <AuthUserContext.Consumer>
          {(authUser) => (
            <div>
              <div>
                <div className="commentDisplay">
                  <p className="styleDisplay">
                    <span />
                    <img
                      src={this.state.photoUrl}
                      alt=""
                      className="user-profile"
                    />{" "}
                    {this.state.username}
                    {comment.timeCreated} <br />
                    <p className="commentdescription"> {comment.comment}{" "}</p>
                   
                  </p>
                  <div>
                    <AddReplys commentId={comment.commentId} />
                    <div className="replypage">
                      {numOfReplys ? (
                        <button className="replypage"
                          
                          style={{ }}
                          onClick={() => {
                            this.togglePopup();
                            
                          }}
                        >
                          {this.state.showPopup ? (
                            <div>
                              <i className="fas fa-angle-up" /> {"Hide"}{" "}
                          {numOfReplys} {" "}{" Replys "}
                            </div>
                          ) : (
                            <div>
                              <i className="fas fa-angle-down " /> {"View"}{" "}
                              {numOfReplys}
                              
                              {" Replys "}
                            </div>
                          )}
                        </button>
                      ) : null}
                    </div>
                    {replys &&
                      this.state.showPopup &&
                      replys.map((reply) =>
                        commentId === reply.parentCommentId ? (
                          <ReplyComment
                            reply={reply}
                            replys={this.state.replys}
                            timeCreated={timeCreated}
                            commentId={commentId}
                            comment={comment}
                            replysId={replysId}
                            limited={limited}
                          />
                        ) : null
                      )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </AuthUserContext.Consumer>
      );
    } else {
     
      if (showAll) {
        return (
         
          <div className="commentDisplay">
            <p className="styleDisplay">
              <span>
                <img src={this.state.photoUrl} className="user-profile" />{" "}
                {this.state.username}
              </span>
              {comment.timeCreated} <br />
              {comment.comment}
              <a onClick={this.showLess} style={{ color: "darkblue" }}>
                Read less
              </a>
            </p>
            <div></div>
          </div>
        );
      }
    }
    
    const toShow = commentContent.slice(0, limited) + "....";
    if (toShow) {
      return (
        <div 
        >
          <div className="commentDisplay ">
            <p className="styleDisplay">
              <span>
                <img
                  src={this.state.photoUrl}
                  alt=""
                  className="user-profile"
                />{" "}
                {this.state.username}
              </span>
              {comment.timeCreated} <br />
              {toShow}
              <a onClick={this.showMore} style={{ color: "darkblue" }}>
                {" "}
                Read More{" "}
              </a>
            </p>
            <AddReplys commentId={comment.commentId} />
            <div className="replypage">
              {numOfReplys ? (
                <i
                  className="fas fa-angle-down "
                  style={{ width: "10em" }}
                  onClick={() => {
                    this.togglePopup();
                  }}
                >
                  {" "}
                  View{""}
                  {numOfReplys}
                  {" More "}
                  {" Replys "}
                </i>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
  }
}
export default compose(withFirebase)(Comment);
