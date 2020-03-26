import React, { Component, Fragment } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import Singlecomment from "../../components/Singlecomment";
import ReplyComments from "../../components/Replycomments"
const moment = require("moment");

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeCreated: "",
      comment: "",
      limit: 5,
      userId: ""
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

  handleSubmit = (e, authUser) => {
    e.preventDefault();

    this.props.onCreate(this.state);
    this.setState({
      comment: ""
    });
  };

  render() {
    const { comment, timeCreated } = this.state;
    const { comments, articleId, commentId , childCommentId} = this.props;

   console.log(" childCommentId from props",  childCommentId);
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <br />
            <p>replys</p>
            <hr />

            {comments &&
              comments.map((comment, index) => {
            /* if (!comment.commen) ){//if ther is no reposes for this comment just print the singlecomment only*/
              
                return(
                <Fragment>
                   
                  <Singlecomment
                    comment={comment}
                    key={index}
                    //limited={limited}
                    timeCreated={timeCreated}
                    commentId={comment.commentId}
                    articleId={articleId}
                    onCreate={this.props.onCreateChild}
                    childCommentId={ childCommentId}
                    
                  />
                  <ReplyComments comments={comments} commentId={commentId} articleId={articleId} childCommentId={childCommentId}/>
                </Fragment>
                
                );
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
