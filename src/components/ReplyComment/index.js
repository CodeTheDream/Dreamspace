import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import AddReplys1 from "../AddReplys1";
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

 /* renderReplycomment = () => {
    // console.log("this is the replys in renderreplys func", this.props.replys);
    const { comment, timeCreated } = this.props;

    if (this.props.replys) {
      this.props.replys.map((reply,i)=> {
        console.log("this is the the reply in the reply function", reply);
        return (
          <div>
            <ReplyComment timeCreated={reply.timeCreated} reply={reply.reply} />

            <AddReplys type="child" />
          </div>
        );
      });
    }
  };*/

  render() {
    const { reply, timeCreated, commentId, userName ,replysId} = this.props;
   //console.log("replyId at replycomment", replysId);
    //console.log("show popup", this.state.showPopup);
    return (
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
        {this.state.showPopup ? (
          <div>
            {this.props.replys.map(reply => {
              //console.log("this is the the reply in the reply function", reply);
              return (
                <div>
                  <div className="replystayle">
                    <p>
                      {" "}
                      <i className="fa fa-user"></i> posted By {userName}{" "}
                      {reply.timeCreated}
                    </p>
                    <p>{reply.reply}</p>
                  </div>
                  <AddReplys1 commentId={commentId} replysId={replysId}/>
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
