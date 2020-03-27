import React, { Component, Fragment } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import AddReplys from "../../components/AddReplys"
const moment = require("moment");

class Singlecomment extends Component {
  constructor(props) {
    super(props);
    this.state = {
       // limit: 5,
        userId: "",
       reply: "",
      timeCreated: "",
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

  this.props.onCreate(this.state);
  this.setState({
    reply: ""
  });
};
 

  handleChange = (e, authUser) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A `),
      userId: authUser.uid
    });
  };
  render() {
    const {reply}=this.state
      const {comment,commentId, childCommentId} = this.props;
      //console.log(" childCommentId in single comment", childCommentId)
    return (
        <AuthUserContext.Consumer>
        {authUser => (
               <div> 
        <Fragment>
          <i className="fa fa-user"></i> posted By {this.state.username}
          {comment.timeCreated} <br />
          {comment.comment}{" "}
         {/* <AddReplys commentId={commentId}/>*/}
        </Fragment>

        
        <div className="Reply">
          <button onClick={this.togglePopup}>
            <i className="fa fa-comment-alt"> </i> Reply
          </button>
        </div>
        {this.state.showPopup ? (
          <form className="card-addcomment" onSubmit={this.handleSubmit}>
            <div className="commentgrid">
              <textarea
                className="commentContent"
                // id="reply"
                type="text"
                value={reply}
                name="reply"
                placeholder="Write your Reply here! "
                autoFocus={true}
                onChange={e => this.handleChange(e, authUser)}
              ></textarea>

              <button className="submit-btn" type="submit">
                Reply
              </button>
            { /* <button className="submit-btn" onClick={this.cancle}>
                cancle
        </button>*/}
            </div>
          </form>
        ) : null}
      </div>
       )}
       </AuthUserContext.Consumer>
    )
  }
}
export default compose(withFirebase, withRouter)( Singlecomment);
