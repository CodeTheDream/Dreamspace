import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
const moment = require("moment");
class AddReplys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: "",
      timeCreated: "",
      // showPopup:true
      childComments:[]
    };
  }

  

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

  handleSubmit = (e, authUser) => {
    e.preventDefault();
    const commentId = this.props.commentId;
    console.log("this is the commentId for the reply", commentId);
    this.props.firebase
      //.replys(commentId)
      .comments()
      .add({
        // commentId:commentId,
        reply: this.state.reply,
        timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A `),
        userId: authUser.uid,
        parentCommentId: commentId
      })
      .then(docRef => {
        console.log("ChildCommnetId", docRef.id);

        this.props.firebase.comment(commentId).update({
          childCommentId: docRef.id,
          parentCommentId:docRef.id
        });

        this.setState({
          reply: "",
          showPopup: false
        });
      });
  };
  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      reply: e.target.value
    });
  };

  render() {
    // const { comment, limited, timeCreated,commentId } = this.props;
    const { commentId } = this.props;
    // console .log("this is the comment Id i have from comment",commentId)
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <div className="Reply">
              <button onClick={this.togglePopup}>
                <i className="fa fa-comment-alt"> </i> Reply
              </button>
            </div>
            {this.state.showPopup ? (
              <form
                className="card-addcomment"
                onSubmit={e => this.handleSubmit(e, authUser)}
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
                  {/* <button className="submit-btn" onClick={this.cancle}>
                cancle
        </button>*/}
            </div>
          </form>
        ) : null}
      </div>
      )}
      </AuthUserContext.Consumer>
    );
  }
}

export default compose(withFirebase, withRouter)(AddReplys);