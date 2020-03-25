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
        timeCreated: "",
        comment: "",
       // limit: 5,
        userId: ""
    };
  }
  togglePopup = () => {
    //const{commentId}=this.props
    this.setState({
      showPopup: !this.state.showPopup
    });
    //console.log("this is the commentId", commentId)
  };
 /* cancle = () => {
    this.setState({ showPopup: false });
  };*/
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
      comment: "",
      showPopup:false

    });
  };
  render() {
      const {comment,commentId} = this.props;
    return (
        <AuthUserContext.Consumer>
        {authUser => (
               <div> 
        <Fragment>
          <i className="fa fa-user"></i> posted By {this.state.username}
          {comment.timeCreated} <br />
          {comment.comment}{" "}
          <AddReplys commentId={commentId}/>
        </Fragment>

        
             
      {/*     
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
               />

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
      */}
       
      </div>
       )}
       </AuthUserContext.Consumer>
    )
  }
}
export default compose(withFirebase, withRouter)( Singlecomment);
