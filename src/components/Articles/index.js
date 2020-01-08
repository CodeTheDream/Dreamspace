import React from "react"
import { withFirebase } from "../Firebase";
import {compose} from "recompose";

class Articles extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          articles: []
        };
      }
        componentDidMount() {
        // let articles =this.props.firebase.articles()
        this.unsubscribe = this.props.firebase.articles().onSnapshot(snapshot => {
          let articles = [];
          snapshot.forEach(doc => articles.push({ ...doc.data(), uid: doc.id }));
    
          console.log("Articles loaded here yo!", articles);
          this.setState({ articles });
        })
      }
    render(){
        return(
            <div>Articles</div>
        )
    }
}


export default compose(withFirebase)(Articles)