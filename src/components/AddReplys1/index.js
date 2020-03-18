import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";

const moment = require("moment");
class AddReplys1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      showAll: false,
      replies: [],
      // isOldestFirst: "",
      //commentId:"",
      reply: "",
      timeCreated: ""
      // showPopup:true
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

  handleSubmit = e => {
    e.preventDefault();
    const { commentId } = this.props;
    const { replysId } = this.props;
    //console.log("this is the commentId for the reply at addreplys1", commentId);
    this.props.firebase
      .replys(replysId)
      .add({
        reply: this.state.reply,
        timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A `)
      })
      .then(docRef => {
        //console.log(" this is the replysID ", docRef.id)
      });

    this.setState({
      reply: ""
    });
  };
  handleChange = e => {
    //console.log(e.target.value);
    this.setState({
      reply: e.target.values
    });
  };

  render() {
    const { comment, limited, timeCreated, commentId } = this.props;
    // console.log("this is the comment Id i have from comment at add replys", commentId );
    return (
      <div>
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
                value={this.state.reply}
                //name="reply"
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
    );
  }
}

export default compose(withFirebase, withRouter)(AddReplys1);
