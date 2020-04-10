import React, { Component, Fragment } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { AuthUserContext } from "../Session";
import Singlecomment from "../../components/Singlecomment";

const moment = require("moment");

class ReplyComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
      showPopup: false,
      username: "",
      childComments:[],
      parentCommentId:""
    };
  }

  getSingleComment = id => {
    let comment = {}
    this.props.firebase.comment(id).onSnapshot(snapshot => {
      console.log('getting comment', snapshot.id)
      comment = snapshot
    //  this.setState({childCommentId:snapshot.id})
    // console.log("Articles loaded here yo!", articles);
   // console.log("childcommentID",this.state.childCommentId)
    });
    return comment
  };
  
  componentDidMount = () => {
  const {childCommentId}=this.props
  console.log("chidCommentId in replycomment",childCommentId)
    // this.unsubscribe = this.props.firebase
    //   .comments()
    //   //.where("commentId", "==", parentCommentId)
     
    //   .onSnapshot(snapshot => {
    //     const childcomments = [];
    //     let parentCommentId = "";
    //     snapshot.forEach(doc => {
    //       const data = doc.data();
    //      // console.log("doc.id",doc.id)
    //       parentCommentId = doc.id;
    //       data.ParentCommentId = parentCommentId;
    //       childcomments.push(data);
    //     });
    //     this.setState({
    //       childComments: childcomments,
    //       parentCommontId:parentCommentId
    //     });
       
    //    console.log(
    //       "this is my childcomments  in addreplys commponent",
    //       this.state.childComments
    //     );
    //     console.log("my parentCommentId is here",this.state.parentCommentId)
    //   });
  };
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };
  cancle = () => {
    this.setState({ showPopup: false });
  };
  renderReplyComment = ()=> {
  const comment = this.props.childComment
   console.log('rendering reply', this.props.childCommentId)
   console.log('comment from render replies', this.props.comment);
  // const childComments = this.state.childComments
    // console.log("comment1",this.state.childComments);
    // const {commentId,comments,timeCreated,childCommentId}=this.props
    // console.log("childCommentId",childCommentId)
//  this.state.childComments &&
  // this.state.childComments.map((comment, index) =>
    
      if (comment.childCommentId) {
        // this.getSingleComment(comment.childCommentId);
        return (
         <div>
         <Singlecomment
         comment={comment}
         key={comment.commentId}
         //limited={limited}
        //  timeCreated={timeCreated}
        // commentId={comment.commentId}
        />
       <ReplyComments
                        childComment={this.getSingleComment(comment.childCommentId)}
                        childCommentId={comment.childCommentId}                        
                        // commentId={commentId}
                        // timeCreated={timeCreated}
                      />
      </div>
      )} else {
        return (
          <div>
          <Singlecomment
          comment={comment}
         //  key={index}
          //limited={limited}
        //   timeCreated={timeCreated}
        //  // commentId={comment.commentId}
         />
       </div>
        )
      }
    }

  render() {
    console.log('CHILD COMMENT IN REPLIES', this.props.childCommentId)
    const { timeCreated, commentID, userName, replysId, comments } = this.props;
    //  console.log("total comments in Replycomments",comments)
    // const myFunction=this.renderReplycomment()
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {this.renderReplyComment()}
            <div className="replypage">
              <i
                className="fas fa-angle-down "
                style={{ width: "10em" }}
                onClick={() => this.togglePopup()}
              >
                {" "}
                view{""} {this.props.totallReplys}
                {" more "}
                {" Replys "}
              </i>
            </div>

            {this.state.showPopup ?(
              <div>
           {/* {myFunction} */}
           </div>
            ):null}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default compose(withFirebase, withRouter)(ReplyComments);
