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
      render() {
        let articles = this.state.articles;
        console.log(articles);
    
        if (articles !== undefined || articles !== null || articles !=="") {
          console.log(articles);
          return articles.map((article, index) => {
            console.log(article);
            return <tr><td>{article.title}</td> <td>{article.uid}</td></tr>;
          });
        
    // return(
    //     <div>TESTING</div>
    // )
    }
        return null;
      }
}


export default compose(withFirebase)(Articles)