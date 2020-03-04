import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";

const moment = require("moment");
class ReplyComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeCreated: "",
      reply: "",
      limit: 5,
      showAll: false
    };
  }



 
  render() {
    //const { comment } = this.state;
    
console.log(this.state.reply)
    return (
    <div>Reply comment</div>
     
    );
  }
}

export default compose(withFirebase, withRouter)(ReplyComment);
