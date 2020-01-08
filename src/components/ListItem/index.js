import React from "react";
import myimage from "../../assets/images/nice-piccy3.jpg";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { AuthUserContext } from "../Session";
class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            upvotes: [],
            downvotes: [],
            calculatedvote: 0,
            disabled: false
        };
       
    }
    
    componentDidMount() {
        const { article } = this.props
        let upvotes = article.upvotes;
        let downvotes = article.downvotes;
        this.calculatedvote(upvotes, downvotes)
    }
    calculatedvote(upvotes, downvotes) {
        if (upvotes == 0) {
            upvotes = []
        }
        if (downvotes == 0) {
            downvotes = []
        }
        console.log("upvote", upvotes)
        console.log("downvote", downvotes)
      let upvotesTotal = upvotes.length;
      let downvotesTotal = downvotes.length;
      let finalTotal = upvotesTotal - downvotesTotal;
        console.log("upvotestotal", upvotesTotal)
        console.log("downvotestotal", downvotesTotal)
        this.setState({ calculatedvote: finalTotal })

    }
    handleUpvote = (e, authUser) => {
       

       const { article } = this.props
        let initialvote = [authUser.uid]; 
       
              
     if (article.upvotes == 0) {
            this.props.firebase
                .article(article.uid)
                .set({
                    ...article,
                    upvotes: initialvote,
                    
                })
        }
      
        

        else {
            this.setState({ calculatedvote: this.state.calculatedvote + 1 })
            let upvotes = article.upvotes
            let updatedUpvotes = upvotes
            updatedUpvotes.push(authUser.uid)
            this.props.firebase
                .article(article.uid)
                .set({
                    ...article,
                    upvotes: updatedUpvotes
                })

        }


    }
    handleDownvote = (e, authUser) => {
        const { article } = this.props
        let initialvote = [authUser.uid];
        // console.log("article", article)
        if (article.downvotes == 0) {
            this.props.firebase
                .article(article.uid)
                .set({
                    ...article,
                    downvotes: initialvote
                })
        }
        else {
            this.setState({ calculatedvote: this.state.calculatedvote - 1 })
            let downvotes = article.downvotes
            let updatedDownvotes = downvotes
            updatedDownvotes.push(authUser.uid)
            // console.log("article2", article)
            this.props.firebase
                .article(article.uid)
                .set({
                    ...article,
                    downvotes: updatedDownvotes
                })
            

        }
    }
   
   
    render() {
         const { upvotes } = this.state
        // const { downvotes } = this.state
        const { countedvote } = this.state
        return (
            <AuthUserContext.Consumer>
                {
                    authUser => (
                        <div className="posts">
                            <div
                                className="likes"
                                style={{
                                    width: "40px; border-left:4px solid transparent;",
                                    float: "left"
                                }}
                            >
                                <span style={{ fontSize: "1em" }}>
                                    <button
                                        onClick={(e) => this.handleUpvote(e, authUser)}
                                        disabled={this.props.article.upvote > 6 ? true : false}>                                                        <i className="fa fa-arrow-up custom"> </i>
                                    </button>
                                    <br />
                                    {this.state.calculatedvote}
                                    <br />
                                    <button
                                        onClick={(e) => this.handleDownvote(e, authUser)}>
                                        <i className="fa fa-arrow-down custom"></i>
                                    </button>
                                </span>
                            </div>
                            <div className="maincontent" id="content">
                                <div className="author">
                                    <span style={{ float: "left" }}>
                                        <i className="fa fa-user"></i>
                                    </span>
                                    <span style={{ float: "left" }}> post by Eliz </span>
                                    <span style={{ float: "left" }}> 7 hours ago</span>
                                    <span style={{ float: "left" }} className="effect">
                                        <i className="fa fa-trophy"></i>
                                    </span>
                                </div>
                                <div className="posts-content">
                                    <h4>{this.props.article.title}</h4>
                                    <img className="profile-img" alt="complex" src={myimage} />
                                </div>
                                <div className="bottom" id="commentarea">
                                    <span style={{ float: "left" }}>
                                        <button> <i className="fa fa-comment">comments</i></button>
                                    </span>
                                    <span style={{ float: "left" }}>
                                        <button>
                                            <i className="fa fa-share">share...</i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
            </AuthUserContext.Consumer>
        )
    }
}
export default compose(withFirebase, withRouter)(ListItem);