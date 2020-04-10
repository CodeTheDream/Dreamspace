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
      console.log('from single comment', comment)
    return (
        // <AuthUserContext.Consumer>
        // {authUser => (
               <div> 
        <Fragment>
          {/* <i className="fa fa-user"></i> posted By {this.state.username} */}
          <div>{comment.timeCreated}</div> <br />
          <div>{comment.comment + " "}</div>
          <AddReplys comment={comment}/>
        </Fragment>

       
      </div>
      //  )}
      //  </AuthUserContext.Consumer>
    )
  }
}
export default compose(withFirebase, withRouter)( Singlecomment);