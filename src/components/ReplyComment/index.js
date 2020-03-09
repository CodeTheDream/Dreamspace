import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

const moment = require("moment");
class ReplyComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeCreated: "",
      replys: [],
      limit: 5,
      showAll: false
    };
  }

  componentDidMount = () => {
    const commentId = this.props.commentID;
    //console.log("this is commentId",commentId)
    this.unsubscribe = this.props.firebase
      .replys(commentId)
      //.where("articleId", "==", articleId)
      .onSnapshot(snapshot => {
        const Replys = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          Replys.push(data);
        });
      
        this.setState({ replys: Replys });
      });
  };
  handelOnClick = () => {
    if(this.state.replys.length > 0){
      console.log("this is my list of replys",this.state.replys)
          return <div >{this.state.Replys}</div>;
       
      }
    }
  
  render() {
    return (
      <div style={{margin:"10px",paddingLeft:"2%" ,right:"80%"}}>
        <button className="fas fa-arrow-alt-down" onClick={this.handelOnClick}>
          view more Replys
        </button>
   
      </div>
    );
  }
}

export default compose(withFirebase, withRouter)(ReplyComment);
