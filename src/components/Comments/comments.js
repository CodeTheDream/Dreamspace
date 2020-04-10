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

  getSingleComment = async id => {
    let comment = {}
  //   this.props.firebase.comment(id).onSnapshot(snapshot => {
  //     console.log('getting comment', snapshot)
  //     comment = snapshot

  //   //  this.setState({childCommentId:snapshot.id})
  //   // console.log("Articles loaded here yo!", articles);
  //  // console.log("childcommentID",this.state.childCommentId)
  //   });
  //   return comment
  await this.props.firebase.comment(id)
    .get()
    .then(doc => {
      comment = doc.data()
      console.log('hey tom, am i resolved', comment);
      // return comment
    })
    return comment

  };

  handleSubmit = (e, authUser) => {
    e.preventDefault();

    this.props.onCreate(this.state);
    this.setState({
      comment: ""
    });
  }
  
  renderReplies = (comments, comment) => {
    console.log('comments from RR', comment)
      
      // let childComment = this.getSingleComment(comment.commentId);
      let childComment = comments.filter((commentsComment) => {

        console.log('commentsComment', comments, commentsComment.commentId, comment.childCommentId)
        return (commentsComment.commentId == comment.childCommentId)})
      // console.log('TOM', childComment)
      if (childComment.commentId) {
      console.log("im a comment with a child ", childComment);
      
       return (

         <div>
           <Singlecomment
             comment={childComment}
             key={childComment.commentId}
             timeCreated={childComment.timeCreated}
            commentId={childComment.commentId}
            articleId={childComment.articleId}
            onCreate={this.props.onCreate}
           />
          { this.renderReplies(childComment.childCommentId)}
           </div>
       )
    } else {
      console.log('reply wiht no child', childComment)
      return (
        <div>
        <Singlecomment
             comment={childComment}
             key={childComment.commentId}
             //limited={limited}
             timeCreated={childComment.timeCreated}
            commentId={childComment.commentId}
            articleId={childComment.articleId}
            onCreate={this.props.onCreate}
           />
           </div>
      )
    }
  }
  

  render() {
    const { comment, timeCreated , childCommentId,} = this.state;
    const {
      comments,
      articleId,
      commentId,
     
      parentCommentId
    } = this.props;
  //  console.log("childCommentId in a comments",childCommentId)
    //console.log("comments", comments);
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="card-comment">
            <br />
            <p>replys</p>
            <hr />

            {comments &&
              comments.map((comment, index) => {
                console.log('all comments', comments)
                // const childComment = {};
                /* if (!comment.commen) ){//if ther is no reposes for this comment just print the singlecomment only*/
                if (comment.childCommentId) {
                //  console.log("im a comment with a child ", comment);
                  // this.getSingleComment(comment.childCommentId);
                  return (
                    <div>
                      <Singlecomment
                        comment={comment}
                        key={comment.commentId}
                        //limited={limited}
                        timeCreated={comment.timeCreated}
                       commentId={comment.commentId}
                       articleId={comment.articleId}
                       onCreate={this.props.onCreate}
                      />
                      {/* this.renderReplies(comments) */}
                      {/* <ReplyComments
                        childComment={this.getSingleComment(comment.childCommentId)}
                        childCommentId={comment.childCommentId}                        
                        commentId={commentId}
                        timeCreated={timeCreated}
                      /> */}
                      {this.renderReplies(comments, comment)}
                    </div>
                  );
                } else {
                  //console.log('i have no children', comment)
                  return (
                    // <Fragment>
                      <Singlecomment
                        comment={comment}
                        key={index}
                        //limited={limited}
                        timeCreated={timeCreated}
                        commentId={comment.commentId}
                        articleId={comment.articleId}
                        onCreate={this.props.onCreate}
                      />
                    // </Fragment>
                  );
                }
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
