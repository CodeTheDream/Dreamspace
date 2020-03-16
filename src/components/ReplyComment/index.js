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
   return(
      this.props.replys &&
    
    this.props.replys.map(reply => {
        console.log("this is the the reply in the reply function", reply);
        return (
          <div>
            <ReplyComment
              reply={reply.reply}
              timeCreated={timeCreated}
            />

            <AddReplys type="child" />
          </div>
        );
      })
   )
  };

  render() {
    const { reply, timeCreated, commentId } = this.props;
    //console.log("totall replys",reply)
    console.log("show popup", this.state.showPopup);
    return (
      <div>
        <div className="repypage">
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
        {this.state.showPopup ? (
          <div>
            {this.props.replys.map(reply => {
              console.log("this is the the reply in the reply function", reply);
              return (
                <div>
                  <div className="replystayle">{this.renderReplycomment}</div>
                  <div>
                    <AddReplys type="child" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default compose(withFirebase, withRouter)(ReplyComment);
