import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";

const moment = require("moment");
class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeCreated: "",
      comment: "",
      limit: 5,
      
    };
  }

  componentdidMount = () => {
    //create reference to comments in firebase database
    this.unsubscribe = this.props.firebase
      .comments()
      .orderBy("timeCreated")
      .limit(5);
    console.log("Here is my comments refrence", this.unsubscribe);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A `)
     
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onCreate(this.state)
    this.setState({ comment: "" });
  };

 
  render() {
    const { comment } = this.state;
    return (
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
              onChange={this.handleChange}
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
    );
  }
}

export default compose(withFirebase, withRouter)(AddComment);
