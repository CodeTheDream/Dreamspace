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
        };
    }
    componentDidMount() {
        const { article } = this.props
        let upvotes = article.upvotes;
        let downvotes = article.downvotes;
        this.calculatedvote(upvotes, downvotes)
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.article !== this.props.article) {
            this.calculatedvote(this.props.article.upvotes, this.props.article.downvotes)
        }
    };
    openPost(e,article) {
        console.log("ARTICLE" , article)
        e.preventDefault();
        this.props.history.push({
          pathname: "/articles/" + article.uid,
          params: article.uid,
          state: {article}
        });
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
        // console.log("upvotestotal", upvotesTotal)
        //console.log("downvotestotal", downvotesTotal)
        this.setState({ calculatedvote: finalTotal })
    }
    handleUpvote = (e, authUser) => {
        const { article } = this.props
        let initialvote = [authUser.uid];
        if (article.upvotes == 0) {
            if (this.checkDownvote(authUser.uid, article.downvotes) == -1) {
                this.props.firebase
                    .article(article.uid)
                    .set({
                        ...article,
                        upvotes: initialvote,
                    })
                // console.log("upvotes", this.upvotes)
            }
            else {
                let uidIndex = this.checkDownvote(authUser.uid, article.downvotes)
                let articlearray = article.downvotes;
                articlearray.splice(uidIndex, 1)
                this.props.firebase
                    .article(article.uid)
                    .set({
                        ...article,
                        upvotes: initialvote,
                        downvotes: articlearray
                    })
            }
        }
        else {
            if (this.checkUpvote(authUser.uid, article.upvotes) == -1) {
                if (this.checkDownvote(authUser.uid, article.downvotes) == -1) {

                    console.log(this.checkUpvote)
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

                else {
                    console.log("checkDownvote")
                    let uidindex = this.checkDownvote(authUser.uid, article.downvotes)
                    let articlearray = article.downvotes;
                    articlearray.splice(uidindex, 1)
                    console.log("article.upvote", article.upvotes)
                    //let upvotesarray=article.upvotes.push(authUser.uid)
                    let upvotes = article.upvotes
                    let updatedUpvotes = upvotes
                    updatedUpvotes.push(authUser.uid)
                    this.props.firebase
                        .article(article.uid)
                        .set({
                            ...article,
                            downvotes: articlearray,
                            upvotes: updatedUpvotes
                        })
                }
            }
            else {
                console.log("already upvoted")
            }
        }
    }
    handleDownvote = (e, authUser) => {
        const { article } = this.props
        let initialvote = [authUser.uid];
        if (article.downvotes == 0) {
            console.log("typeof",typeof(article.upvotes))
            if (this.checkUpvote(authUser.uid, article.upvotes) == -1) {
                this.props.firebase
                    .article(article.uid)
                    .set({
                        ...article,
                        downvotes: initialvote
                    })

            }
            else {
                let uidIndex = this.checkUpvote(authUser.uid, article.upvotes)
                let articlearray = article.upvotes;
                articlearray.splice(uidIndex, 1)
                this.props.firebase
                    .article(article.uid)
                    .set({
                        ...article,
                        downvotes: initialvote,
                        upvotes: articlearray
                    })
            }
        }
        else {
            console.log("checkdownvote", this.checkDownvote(authUser.uid, article.downvotes));
            if (this.checkDownvote(authUser.uid, article.downvotes) == -1) {
                if (this.checkUpvote(authUser.uid, article.upvotes) == -1) {
                    this.setState({ calculatedvote: this.state.calculatedvote - 1 })
                    let downvotes = article.downvotes
                    let updatedDownvotes = downvotes
                    updatedDownvotes.push(authUser.uid)
                    this.props.firebase
                        .article(article.uid)
                        .set({
                            ...article,
                            downvotes: updatedDownvotes
                        })

                }


                else {
                    console.log("checkDownvote")
                    let uidindex = this.checkUpvote(authUser.uid, article.upvotes)
                    console.log("uid",uidindex)
                    let articlearray = article.upvotes;
                    articlearray.splice(uidindex, 1)
                    console.log("article.downvote", article.downvotes)
                    //let downvotearray=article.downvotes.push(authUser.uid)
                    let downvotes = article.downvotes
                    let updatedDownvotes = downvotes
                    updatedDownvotes.push(authUser.uid)
                    this.props.firebase
                        .article(article.uid)
                        .set({
                            ...article,
                            upvotes: articlearray,
                            downvotes: updatedDownvotes
                        })
                }
            }
        
      else {
                    console.log("already upvoted")
                }
            }
        } 
    
    checkUpvote = (uid, upvotes) => {
        console.log("filter", upvotes, uid)
        if (typeof (upvotes) == "number") {
            return -1
        }
            else {
                let filteredUpvote = upvotes.indexOf(uid)
                console.log("filteredvote", filteredUpvote)

                return filteredUpvote
            }
        }
    checkDownvote = (uid, downvotes) => {
        console.log("filter", downvotes, uid)
        console.log("typeof1",typeof(downvotes))
        if (typeof (downvotes) == "number") {
            return -1
        }
        else {
            let filteredDownvote = downvotes.indexOf(uid)
            console.log("filteredvote", filteredDownvote)


            return filteredDownvote
        }
    }
    render() {
        const { upvotes } = this.state
        const { downvotes } = this.state
        const { article, descritption } = this.props
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
                                    <button className="upvote"
                                        onClick={(e) => this.handleUpvote(e, authUser)}>
                                        <i className="fa fa-arrow-up custom"> </i>
                                    </button>
                                    <br />
                                    {this.state.calculatedvote}
                                    <br />
                                    <button className="downvote"
                                        onClick={(e) => this.handleDownvote(e, authUser)}>
                                        <i className="fa fa-arrow-down custom"></i>
                                    </button>
                                </span>
                            </div>
                            <div   onClick={e=>this.openPost(e,article) }  className="maincontent" id="content">
                                <div className="author">
                                    <span>
                                        <i className="fa fa-user"></i>
                                    </span>
                                    <span > post by { article.timeCreated} </span>
                                    
                                    {/* <span className="effect">
                                        <i className="fa fa-trophy"></i>
                                    </span> */}
                                </div>
{/*                            
                             <div className="auther-name" >
                 <div className="autherstyle"> 
                       <span>
                          <i className="fa fa-user"></i>
                       </span>
                    <span>posted by {article.timeCreated}</span>
                 </div>
                </div>  */}
                                    <div className="bottom">
                                    <p>{this.props.article.title}</p>
                                    <p>{this.props.article.description}</p>
                                    <a>{this.props.article.url}</a>
                                    <a href="this.props.article.url">check the url</a>
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
