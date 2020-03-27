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
      timeCreated: "",
      //replys: [],
      //limit: 5,
      //showAll: false,
      showPopup: false,
      username: "",
      childcomments: ""
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

  componentDidMount = () => {
 
const {childCommentId,commentId,ParentCommentID} = this.props
console.log("chiledComentID  componentdidmount",childCommentId)     
   
this.unsubscribe = this.props.firebase
     .comments()
     //.where(commentId, "==" , ParentCommentID)
     .onSnapshot(doc => {
       if (doc.exists) {
        console.log(" this is my childcomments", doc.data());
         this.setState({
         
           childcomments: doc.data()
           
         });
        }})
       // console.log("reply",this.state.reply)
  let autherId = this.state.childcomments.userId;
  //console.log("autherId of  a reply",autherId)
  this.unsubscribe = this.props.firebase
    .user(autherId)
    .get()
    .then(doc => {
      // console.log("userdata", doc.data())
      let user = doc.data();
      //this.setState({ username: user.username });
    })
}
  renderReplyComment = () => {
    // console.log("this is the replys in renderreplys func", this.props.replys);
    const { comment, timeCreated, articleId, comments } = this.props;
//let comments=null;
    this.props.comments &&
     this.props.comments.map((comment, index) => {
        return (
          <Fragment>
            <Singlecomment
              comment={comment}
              key={index}
              //limited={limited}
              timeCreated={timeCreated}
             // commentId={comment.commentId}
              //articleId={articleId}
              //onCreate={this.props.onCreate}
            />
            {/*<ReplyComments comments={comments} articleId={articleId} />*/}
          </Fragment>
        );
        //}
      });
    
  };
  

  render() {
    const { timeCreated, commentID, userName, } = this.props;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
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

            {this.renderReplyComment}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default compose(withFirebase, withRouter)(ReplyComments);
