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
        // let articles =this.props.firebase.articles()
        this.unsubscribe = this.props.firebase.comments().onSnapshot(snapshot => {
          let comments = [];
          snapshot.forEach(doc => comments.push({ ...doc.data(), uid: doc.id }));
    
          console.log("comments loaded here yo!", comments);
          this.setState({ comments });
        })
      }
    render(){
        return(
            <div>Comments</div>
        )
    }
}


export default compose(withFirebase)(Comments)