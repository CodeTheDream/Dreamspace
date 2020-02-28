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
      isOldestFirst:true
    };
  }


sortByDtate () {
  const {comment}=this.state.comment
  let newPostList = comment
if(this.state.isOldestFirst){
  newPostList.sort((a,b) => a.timeCreated > b.timeCreated)
}
else {
  newPostList.sort((a,b) =>a.timeCreated > b.timeCreated)

}
this.setState({
isOldestFirst :!this.state.isOldestFirst,
  comment:newPostList})
console.log("this is a " ,Comment)
}

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
   // const { comment } = this.state;
    return (
      <form className="card-addcomment" onSubmit={this.handleSubmit}>
        <div className="commentgrid">
        
            <textarea
              className="commentContent"
              id="comment"
              type="text"
             value={this.state.comment}
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
