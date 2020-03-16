import React from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
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
      replies: [],
      // isOldestFirst: "",
      commentId: "",
      replys: [],
      timeCreated: "",
      totallReplys: 0
    };
  }

  componentDidMount = () => {
    const commentId = this.props.commentId;
    //console.log("this is commentId", commentId);
    this.unsubscribe = this.props.firebase
      .replys(commentId)
      //.where("commentId", "==", commentId)
      .onSnapshot(snapshot => {
        const Replys = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          Replys.push(data);
        });
        console.log("this is my replys using spesific commentId", Replys);
        this.setState({ replys: Replys });
        const totallCountReplys = Replys.length;
        console.log("totalcountReplys", totallCountReplys);
        this.setState({ totallReplys: totallCountReplys });
      });
  };

  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });

  render() {
    const { comment, limited, timeCreated, commentId } = this.props;
    const { showAll } = this.state;
    let commentContent = comment.comment;
    //  const { reply } = this.state;
    // console.log("Here is your comment ID", comment.commentId)

    if (comment.comment && comment.comment.length <= limited) {
      // console.log("IF", comment.comment, comment.comment.length);
      return (
        <AuthUserContext.Consumer>
          {authUser => (
            <div>
              <div>
                <div className="commentDisplay">
                  <p className="styleDisplay">
                    {comment.timeCreated} <br />
                    {comment.comment}{" "}
                  </p>

                  <div>
                    <AddReplys commentId={comment.commentId} />

                    <div>
                      <ReplyComment
                        replys={this.state.replys}
                        timeCreated={timeCreated}
                        commentID={comment.commentId}
                        comment={comment}
                        totallReplys={this.state.totallReplys}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AuthUserContext.Consumer>
      );
    } else {
      //  console.log("ELSE", comment.comment, comment.comment.length);

      if (showAll) {
        return (
          <div className="card-comment">
            <div className="commentDisplay">
              <p className="styleDisplay">
                {comment.timeCreated} <br />
                {comment.comment}
                <a onClick={this.showLess} style={{ color: "darkblue" }}>
                  Read less
                </a>
              </p>
            </div>
          </div>
        );
      }
    }
    //console.log("this is commentContent",commentContent)
    const toShow = commentContent.slice(0, limited) + "....";

    if (toShow) {
      return (
        <div className="card-comment">
          <div className="commentDisplay ">
            <p className="styleDisplay">
              {comment.timeCreated} <br />
              {toShow}
              <a onClick={this.showMore} style={{ color: "darkblue" }}>
                {" "}
                Read More{" "}
              </a>
            </p>
            <br />
          </div>
        </div>
      );
    }
  }
}
export default compose(withFirebase)(Comment);
