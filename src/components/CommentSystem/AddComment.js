import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
const moment = require("moment");
class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeCreated: "",
      comment: "",
      limit: 5,
      userId:""
    };
  }

  componentdidMount = () => {
    //create reference to comments in firebase database
    this.unsubscribe = this.props.firebase
      .comments()
      .orderBy("timeCreated")
      .limit(5);
    //console.log("Here is my comments refrence", this.unsubscribe);
  };

  handleChange =(e,authUser) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A `),
      userId: authUser.uid
    });
  };

  handleSubmit = (e,authUser) => {
    e.preventDefault();

    this.props.onCreate(this.state)
    this.setState({ comment: "" ,
  
  });
  };

 
  render() {
    const { comment } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
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
              onChange={e=>this.handleChange(e,authUser)}
            ></textarea>
         

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
        )}
        </AuthUserContext.Consumer>
    );
  }
}

export default compose(withFirebase, withRouter)(AddComment);
