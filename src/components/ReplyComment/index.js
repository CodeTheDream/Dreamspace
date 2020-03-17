import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import AddReplys from "../AddReplys";
const moment = require("moment");

class ReplyComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeCreated: "",
      replys: [],
      limit: 5,
      showAll: false,
      showPopup: false
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

  renderReplycomment = () => {
    console.log("this is the replys in renderreplys func", this.props.replys);
    const { comment, timeCreated } = this.props;
    return (
      this.props.replys &&
      this.props.replys.map(reply => {
        console.log("this is the the reply in the reply function", reply);
        return (
          <div>
            <ReplyComment reply={reply.reply} timeCreated={timeCreated} />

            <AddReplys type="child" />
          </div>
        );
      })
    );
  };

  render() {
    const { commentId, replyId } = this.props;

    console.log("this is the commentId and ReplyId", replyId, commentId);
    return <div>Number of Reply comment</div>;
  }
}

export default compose(withFirebase, withRouter)(ReplyComment);
