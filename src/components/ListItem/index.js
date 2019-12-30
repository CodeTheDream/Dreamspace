import React from "react";
import myimage from "../../assets/images/nice-piccy3.jpg";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { withAuthentication } from "../Session";

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: "",
      totalVote: ""
    };
  }
  openPost(e, article) {
    console.log("ARTICLE", article);
    e.preventDefault();
    this.props.history.push({
      pathname: "/articles/" + article.uid,
      params: article.uid,
      state: { article }
    });
  }
  upVote(e, article) {
    // let article = this.state.article
    console.log(article);
    if (article !== undefined) {
      let newUpvotes = article.upvotes + 1;
      console.log(article.upvotes);
      console.log(newUpvotes);
      this.props.firebase
        .article(article.uid)
        .set({ ...article, upvotes: newUpvotes })
        .then(() => {
          console.log("SETTING STATE", newUpvotes);
          this.setState({
            ...article,
            totalVote: newUpvotes
          });
        })
        .then(()=>{
          this.calculateTotal(article.downvotes, newUpvotes);

        });
    }
  }
  handleUpvote = (e) => {
    console.log("upvotes",this.state.upvotes + 1)
    this.props.firebase
        .articles().add({
            title: "Elsa,Aster,Ella",
       upvotes:this.state.upvotes + 1
        })
    this.setState({
        upvotes: this.upvotes + 1
    })
}
  downVote(e, article) {
        // let article = this.state.article
        console.log(article);
        if (article !== undefined) {
          let newDownvotes = article.downvotes + 1;
          console.log(article.downvotes);
          console.log(newDownvotes);
          this.props.firebase
            .article(article.uid)
            .set({ ...article, downvotes: newDownvotes })
            .then(() => {
              console.log("SETTING STATE", newDownvotes);
              this.setState({
                ...article ,
                totalVote: newDownvotes
              });
            })
            .then(()=>{
              this.calculateTotal(newDownvotes,article.upvotes);

            });
        }
  }
  calculateTotal(downvotes, upvotes) {
    console.log("UPVOTE", upvotes);
    console.log("DOWNVOTE", downvotes);
    let total = upvotes - downvotes;
    console.log(total);
    this.setState({ totalVote: total });
  }
  componentDidMount() {
    const { article } = this.props;
    const authorID = article.authorID;
    this.calculateTotal(article.downvotes, article.upvotes);
    // let articles =this.props.firebase.articles()
    this.unsubscribe = this.props.firebase
      .user(authorID)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          let user = doc.data();
          console.log("AUthor Shit", user);
          this.setState({ user: user });
          console.log("STATE", this.state);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
    // console.log("USER",user)
  }
  componentWillUnmount() {
    // this.unsubscribe();
  }

  render() {
    const { article } = this.props;
    const user = this.state.user;
    console.log("USERSTUFF", this.state);

    console.log("AUTHSTUFFHERE", this.props)
    return (
      <div className="posts">
        <div
          className="likes"
          style={{
            width: "40px; border-left:4px solid transparent;",
            float: "left"
          }}
        >
          <span style={{ fontSize: "1em" }}>
            <i
              className="fa fa-arrow-up custom"
              onClick={e => this.handleUpvote(e, article)}
            ></i>
            {this.state.totalVote}
            <i className="fa fa-arrow-down custom"
                          onClick={e => this.downVote(e, article)}

            ></i>
          </span>
        </div>
        <div
          className="maincontent"
          id="content"
          onClick={e => this.openPost(e, article)}
        >
          <div className="author">
            <span style={{ float: "left" }}>
              <i className="fa fa-user"></i>
            </span>
            <span style={{ float: "left" }}> {user.username} </span>
            <span style={{ float: "left" }}> 7 hours ago</span>
            <span style={{ float: "left" }} className="effect">
              <i className="fa fa-trophy"></i>
            </span>
          </div>
          <div className="posts-content">
            <h4>{article.title}</h4>
            <img className="profile-img" alt="complex" src={myimage} />
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
      </div>
    );
  }
}

export default compose(withFirebase, withRouter, withAuthentication)(ListItem);
