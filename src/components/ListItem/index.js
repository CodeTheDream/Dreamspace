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
<<<<<<< HEAD
<<<<<<< HEAD
            calculatedvote: 0,
            // disabled: false
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

        //let filteredVote = this.props.article.upvotes.findIndex(this.checkUpvote(authUser.uid,article.upvotes))
        //console.log("filtervote", filteredVote)
        if (article.upvotes == 0) {

            this.props.firebase
                .article(article.uid)
                .set({
                    ...article,
                    upvotes: initialvote,

                })
        }



        else {
            if (this.checkUpvote(authUser.uid, article.upvotes) == -1) {
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
                console.log("already upvoted")
            }

        }


    }
    handleDownvote = (e, authUser) => {
        const { article } = this.props
        let initialvote = [authUser.uid];
        if (article.downvotes == 0) {
            this.props.firebase
                .article(article.uid)
                .set({
                    ...article,
                    downvotes: initialvote
                })
        }
        else {
            //if (this.checkDownvote(authUser.uid, article.upvotes) == -1) {
            this.setState({ calculatedvote: this.state.calculatedvote - 1 })
            let downvotes = article.downvotes
            let updatedDownvotes = downvotes
            updatedDownvotes.push(authUser.uid)
            this.props.firebase
                .article(article.uid)
                .set({
                    ...article,
                    upvotes: updatedDownvotes
                })

        }
        /* else {
             console.log("already downvoted")
         }*/

        // }


    }
    checkUpvote = (uid, upvotes) => {
        console.log("filter", upvotes, uid)
        let filteredUpvote = upvotes.indexOf(uid)
        console.log("filteredvote", filteredUpvote)

    }
    checkDownvote = (uid, downvotes) => {

        console.log("filter", downvotes, uid)
        let filteredDownvote = downvotes.indexOf(uid)
        console.log("filteredvote", filteredDownvote)

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
=======
            calculatedvote: 0
        };
        //this.handleVote = this.handleVote.bind(this);
    }
    // onClick = {(e) => this.handleVote(e, authUser)}>
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
        // console.log("article", article)
        if (article.upvotes == 0) {
            this.props.firebase
                .article(article.uid)
                .set({
                    ...article,
                    upvotes: initialvote
                })
        }
        

        else {
            this.setState({ calculatedvote: this.state.calculatedvote + 1 })
            let upvotes = article.upvotes
            let updatedUpvotes = upvotes
            updatedUpvotes.push(authUser.uid)
            // console.log("article2", article)
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
            //console.log("currentuser", authUser)
            //console.log("upvotes", this.state.calculatedvote)

        }
    }
    render() {
        // const { upvotes } = this.state
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
                                        onClick={(e) => this.handleUpvote(e, authUser)}>

                                        <i className="fa fa-arrow-up custom"> </i>
>>>>>>> ee2c958bdc0355d7ebf3a62ec93cca990cc86e5b
=======
            calculatedvote: 0
        };
        //this.handleVote = this.handleVote.bind(this);
    }
    // onClick = {(e) => this.handleVote(e, authUser)}>
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
        // console.log("article", article)
        if (article.upvotes == 0) {
            this.props.firebase
                .article(article.uid)
                .set({
                    ...article,
                    upvotes: initialvote
                })
        }
        

        else {
            this.setState({ calculatedvote: this.state.calculatedvote + 1 })
            let upvotes = article.upvotes
            let updatedUpvotes = upvotes
            updatedUpvotes.push(authUser.uid)
            // console.log("article2", article)
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
            //console.log("currentuser", authUser)
            //console.log("upvotes", this.state.calculatedvote)

        }
    }
    render() {
        // const { upvotes } = this.state
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
                                        onClick={(e) => this.handleUpvote(e, authUser)}>

                                        <i className="fa fa-arrow-up custom"> </i>
>>>>>>> ee2c958bdc0355d7ebf3a62ec93cca990cc86e5b
                                    </button>
                                    <br />
                                    {this.state.calculatedvote}
                                    <br />
                                    <button
                                        onClick={(e) => this.handleDownvote(e, authUser)}>
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> ee2c958bdc0355d7ebf3a62ec93cca990cc86e5b
=======
>>>>>>> ee2c958bdc0355d7ebf3a62ec93cca990cc86e5b
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
<<<<<<< HEAD
<<<<<<< HEAD
export default compose(withFirebase, withRouter)(ListItem);
=======
export default compose(withFirebase, withRouter)(ListItem);
>>>>>>> ee2c958bdc0355d7ebf3a62ec93cca990cc86e5b
=======
export default compose(withFirebase, withRouter)(ListItem);
>>>>>>> ee2c958bdc0355d7ebf3a62ec93cca990cc86e5b
