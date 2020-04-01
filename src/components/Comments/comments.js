import React, { Component, Fragment } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import Singlecomment from "../../components/Singlecomment";
import ReplyComments from "../../components/Replycomments";
const moment = require("moment");

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeCreated: "",
      comment: "",
      limit: 5,
      userId: "",
      childCommentId:""
    };
  }
  
  
  handleChange = (e, authUser) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A `),
      userId: authUser.uid
    });
  };

  getSingleComment = id => {
    this.props.firebase.comment(id).onSnapshot(snapshot => {
      console.log('getting comment', snapshot.id)
    //  this.setState({childCommentId:snapshot.id})
    // console.log("Articles loaded here yo!", articles);
   // console.log("childcommentID",this.state.childCommentId)
    });
  };

  handleSubmit = (e, authUser) => {
    e.preventDefault();

    this.props.onCreate(this.state);
   this. props.refreshFunction(this.state)
    this.setState({
      comment: ""
      
    });
  };

  render() {
    const { comment, timeCreated } = this.state;
    const { comments, articleId, commentId , childCommentId} = this.props;

   //console.log(" childCommentId from props",  childCommentId);
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="card-comment">
            <br />
            <p>replys</p>
            <hr />

            {comments &&
              comments.map((comment, index) => {
                //console.log('comment', comment)
                const childComment = {};
                /* if (!comment.commen) ){//if ther is no reposes for this comment just print the singlecomment only*/
                if (comment.childCommentId) {
                 console.log("im a comment with a child ", Comment);
                  this.getSingleComment(comment.childCommentId);
                  return (
                    <div>
                      <Singlecomment
                        comment={comment}
                        key={index}
                        //limited={limited}
                        timeCreated={timeCreated}
                       commentId={comment.commentId}
                       articleId={articleId}
                       onCreate={this.props.onCreate}
                      />
                      <ReplyComments
                        
                        childCommentId={comment.childCommentId}                        
                        commentId={commentId}
                        timeCreated={timeCreated}
                      />
                    </div>
                  );
                } else {
                  //console.log('i have no children', comment)
                  return (
                    <Fragment>
                      <Singlecomment
                        comment={comment}
                        key={index}
                        //limited={limited}
                        timeCreated={timeCreated}
                        commentId={comment.commentId}
                        articleId={articleId}
                        onCreate={this.props.onCreate}
                      />
                    </Fragment>
                  );
                }
                //}
              })}

            <form className="card-addcomment" onSubmit={this.handleSubmit}>
              <div className="commentgrid">
                <textarea
                  className="commentContent"
                  id="comment"
                  type="text"
                  value={comment}
                  name="comment"
                  placeholder="Write your comment here! "
                  autoFocus={true}
                  onChange={e => this.handleChange(e, authUser)}
                ></textarea>

                <button
                  className="submit-btn"
                  type="submit"
                  value=" Comment"
                  disabled={!this.state.comment}
                >
                  Comment
                </button>
              </div>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default compose(withFirebase, withRouter)(Comments);
