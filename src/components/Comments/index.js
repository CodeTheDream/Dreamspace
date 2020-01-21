import React from "react"
import { withFirebase } from "../Firebase";
import {compose} from "recompose";

class Comments extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          comments: []
        };
      }
        componentDidMount() {
        // let comments =this.props.firebase.comments()
        this.unsubscribe = this.props.firebase.comments().onSnapshot(snapshot => {
          let comments = [];
          snapshot.forEach(doc => comments.push({ ...doc.data(), uid: doc.id }));
    
          console.log("comments loaded here yo!", comments);
          this.setState({ comments });
        })
      }
      render() {
        let comments = this.state.comments;
        console.log(comments);
    
        if (comments !== undefined || comments !== null || comments !=="") {
          console.log(comments);
          return comments.map((comment, index) => {
            console.log(comment);
            return <tr><td>{comment.articleId}</td> <td>{comment.uid}</td></tr>;
          });
        
    // return(
    //     <div>TESTING</div>
    // )
    }
        return null;
      }
}


export default compose(withFirebase)(Comments)