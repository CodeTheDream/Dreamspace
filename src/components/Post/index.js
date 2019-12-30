import React from "react"
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import {compose} from "recompose"
class Post extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          article: ""
        };
      }
    componentDidMount(){
        console.log("PROPS", this.props.match.params.articleId)
        let articleId= this.props.match.params.articleId

        this.unsubscribe = this.props.firebase.article(articleId).onSnapshot(doc => {
      
            console.log("Single article loaded here yo!", doc.data());
            let  article = doc.data()
            this.setState({ article });
          });
    }
    
    render(){
        console.log("STATE THINGS", this.state)
        const article = this.state.article
        return(
            <div
            className="maincontent"
            id="content"
          >
            <div className="author">
              <span style={{ float: "left" }}>
                <i className="fa fa-user"></i>
              </span>
              <span style={{ float: "left" }}> Username </span>
              <span style={{ float: "left" }}> 7 hours ago</span>
              <span style={{ float: "left" }} className="effect">
                <i className="fa fa-trophy"></i>
              </span>
            </div>
            <div className="posts-content">
              <h4>{article.title}</h4>
              {/* <img className="profile-img" alt="complex" src={myimage} /> */}
            </div>
            <div className="bottom" id="commentarea">
              <span style={{ float: "left" }}>
                <i className="fa fa-comment">6k comments</i>
              </span>
              <span style={{ float: "left" }}>
                <i className="fa fa-share">share</i>
              </span>
  
              <span style={{ float: "left" }}>...</span>
            </div>
          </div>

            )
    }
}

export default compose(withFirebase, withRouter)(Post);
