import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { AuthUserContext } from "../Session";
const moment = require("moment");
class AddReplys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: "",
      timeCreated: "",
 
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

  handleSubmit =(e,authUser)=> {
    e.preventDefault();
    const commentId = this.props.commentId;

    this.props.firebase
     
      .comments()
      .add({
       
        reply: this.state.reply,
        timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A `),
        userId:authUser.uid,
        parentCommentId: commentId
      })
      .then(docRef => {
        console.log('DOC REF', docRef.id)
        this.props.firebase.comment(commentId).update({
          childCommentId: docRef.id
      
      });

    this.setState({
      reply: "",
      showPopup: false
    });
  });
}
  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      reply: e.target.value
    });
  };

  render() {
    
    const { commentId} = this.props;

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
          <form className="card-addcomment" onSubmit={e=>this.handleSubmit(e,authUser)}>
            <div className="commentgrid">
              <textarea
                className="commentContent"
               
                type="text"
                value={this.state.reply}
               
                placeholder="Write your Reply here! "
                autoFocus={true}
                onChange={this.handleChange}
              ></textarea>

              <button className="submit-btn" type="submit">
                Reply
              </button>
            <button className="submit-btn" onClick={this.cancle}>
                cancle
        </button>
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