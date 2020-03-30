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
  
  componentDidMount = () => {
  const {childCommentId}=this.props
  console.log("chidCommentId in replycomment",childCommentId)
    this.unsubscribe = this.props.firebase
      .comments()
      //.where("commentId", "==", parentCommentId)
     
      .onSnapshot(snapshot => {
        const childcomments = [];
        let parentCommentId = "";
        snapshot.forEach(doc => {
          const data = doc.data();
         // console.log("doc.id",doc.id)
          parentCommentId = doc.id;
          data.ParentCommentId = parentCommentId;
          childcomments.push(data);
        });
        this.setState({
          childComments: childcomments,
          parentCommontId:parentCommentId
        });
       
       console.log(
          "this is my childcomments  in addreplys commponent",
          this.state.childComments
        );
        console.log("my parentCommentId is here",this.state.parentCommentId)
      });
  };
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };
  cancle = () => {
    this.setState({ showPopup: false });
  };
  renderReplycomment = ()=>{
  // const childComments = this.state.childComments
    console.log("comment1",this.state.childComments);
    const {commentId,comments,timeCreated,childCommentId}=this.props
    console.log("childCommentId",childCommentId)
 this.state. childComments &&
  this.state.childComments.map((comment, index) => (
    
    <React.Fragment>
  
   { commentId===comment.parentCommentId && 
      
        <div>
           <Singlecomment
           comment={comment}
           key={index}
           //limited={limited}
           timeCreated={timeCreated}
          commentId={comment.commentId}
          />
          <ReplyComments childComments={this.state.childComments}  />
        </div>
  }
    </React.Fragment>
  ));
}
  render() {
    const { timeCreated, commentID, userName, replysId, comments } = this.props;
    //  console.log("total comments in Replycomments",comments)
    const myFunction=this.renderReplycomment()
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

            {this.state.showPopup ?(
              <div>
           {myFunction}
           </div>
            ):null}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default compose(withFirebase, withRouter)(ReplyComments);
