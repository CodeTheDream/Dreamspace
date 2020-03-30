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

       
      </div>
       )}
       </AuthUserContext.Consumer>
    )
  }
}
export default compose(withFirebase, withRouter)( Singlecomment);