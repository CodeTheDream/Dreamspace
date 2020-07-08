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
const moment = require("moment");
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
      reply:""
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
        this.setState(
          {
            replys: Replys,
            replysId: replysId,
          } 
        );

        this.state.replys.map((reply) => {
          if (commentId === reply.parentCommentId) {
            if(reply.commentID){         
                this.setState({
              reply:reply
            })};
          }
        });
       });

    let { comment } = this.props;
    let autherId = comment.userId;
    // console.log("the author of the commnet",comment.userId)
    this.props.firebase
      .user(autherId)
      .get()
      .then((doc) => {
        //console.log("userdata in comment", doc.data())
        let user = doc.data();
        this.setState({
          username: user.username,
          photoUrl: user.photoUrl,
        });
      });
      // let {comment}= this.props;
      // let autherId = comment.userId;
      // this.unsubscribe = this.props.firebase
      //   .user(autherId)
      //   .get()
      //   .then(doc => {
      //     // console.log("userdata", doc.data())
      //     let user = doc.data();
      //     this.setState({ username: user.username });
      //   });
       
       
  };

  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });

  render() {
    const { comment, limited, timeCreated, commentId, userName } = this.props;
    const { showAll, replys, sortType, replysId, replyUserId ,reply} = this.state;
    let commentContent = comment.comment;
  //  {  replys.map((reply) =>
  //       commentId === reply.parentCommentId ? (
  //       reply=reply):null)
console.log("reply from state",reply)
    // if(replys){
    //   replys.sort((a,b) =>{
    //    const  isReversed = (sortType === 'asc') ? 1 :-1;
    //    return  isReversed * a.timeCreated.localeCompare(b.timeCreated)
    //  })}
    //  console.log("Total",totallReply.length)
    //      }
    if (comment.comment && comment.comment.length <= limited) {
      //  console.log("IF", comment.comment, comment.comment.length);
      return (
        <AuthUserContext.Consumer>
          {(authUser) => (
            <div>
              <div>
                <div className="commentDisplay">
                  <p className="styleDisplay">
                    <span />
                    <img
                      src={this.state.photoUrl} alt=""
                      className="user-profile"
                    />{" "}
                    {this.state.username}
                    {comment.timeCreated} <br />
                    {comment.comment}{" "}
                    
                  </p>

                  <div>
                    <AddReplys commentId={comment.commentId} />
                    {replys &&
                      replys.map((reply) =>
                        commentId === reply.parentCommentId ? ( 
                        <div>
                         {/* <button>view</button> */}
                         
                              <ReplyComment
                                reply={reply}
                                replys={this.state.replys}
                                timeCreated={timeCreated}
                                commentId={commentId}
                                comment={comment}
                                // replysId={replysId}
                                limited={limited}
                              />
                         </div>
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
      // console.log("ELSE", comment.comment, comment.comment.length);

      if (showAll) {
        return (
          // <div className="card-comment">
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
            </div>
          // </div>
        );
      }
    }
    //console.log("this is commentContent",commentContent)
    const toShow = commentContent.slice(0, limited) + "....";

    if (toShow) {
      return (
        <div //className="card-comment"
        >
          <div className="commentDisplay ">
            <p className="styleDisplay">
              <span>
                <img src={this.state.photoUrl} alt="" className="user-profile" />{" "}
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
          </div>
        </div>
      );
    }
  }
}
export default compose(withFirebase)(Comment);