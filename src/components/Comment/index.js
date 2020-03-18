import React from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../../components/Session";
import { withFirebase } from "../../components/Firebase";
import ReplyComment from "../ReplyComment";
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
      reply: "",
      timeCreated: ""
    };
  }

  handleSubmit = (e, commentId) => {
    e.preventDefault();
    //console.log("this is the event",e)
    //const {commentId}=this.props.comments.commentId
    console.log("this is the commentId for the reply", commentId);
    //console.log("show the reply",this.state.reply)
    this.props.firebase
      .replys(commentId)
      .add({
        // commentId:commentId,
        reply: this.state.reply,
        timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A `)
      })
      .then(docRef => {
        console.log(" this is the replysID ", docRef.id);
      });

    this.setState({
      reply: ""
    });
  };
  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      reply: e.target.value
    });
  };

  togglePopup = () => {
    //const{commentId}=this.props
    this.setState({
      showPopup: !this.state.showPopup
    });
    //console.log("this is the commentId", commentId)
  };
  cancle = () => {
    this.setState({ showPopup: false });
  };

  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });

  render() {
    const { comment, limited, timeCreated, reply } = this.props;
    const { showAll } = this.state;
    let commentContent = comment.comment;
    //  const { reply } = this.state;
    // console.log("Here is your comment ", comment);
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
                    <div className="Reply">
                      <button onClick={this.togglePopup}>
                        <i className="fa fa-comment"> </i>Reply
                      </button>
                    </div>
                    {this.state.showPopup ? (
                      <div>
                        <form
                          className="card-addcomment"
                          onSubmit={e =>
                            this.handleSubmit(e, comment.commentId)
                          }
                        >
                          <div className="commentgrid">
                            <textarea
                              className="commentContent"
                              // id="reply"
                              type="text"
                              value={this.state.reply}
                              //name="reply"
                              placeholder="Write your Reply here! "
                              autoFocus={true}
                              onChange={this.handleChange}
                            ></textarea>

                            <button className="submit-btn" type="submit">
                              Reply
                            </button>
                            <button
                              className="submit-btn"
                              onClick={this.cancle}
                            >
                              cancle
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : null}
                    <ReplyComment commentID={comment.commentID} />
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
