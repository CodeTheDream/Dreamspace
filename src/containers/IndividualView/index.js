import React, { Fragment } from "react";
import AddComment from "../../components/CommentSystem/AddComment";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import Comment from "../../components/Comment";
import ListItem1 from "../../components/ListItem1";
const moment = require("moment");
class IndividualView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      limit: "",
      limited: 350,
      TotallComment: "",
      totalcount: "",
      isOldestFirst: true,
      username: "",
      sortType: "asc",
      commentList: [],
      childCommentId: "",
      parentCommentId: "",
      photoUrl: " ",
    };
  }
  componentDidMount = () => {
    let articleId = this.props.match.params.articleId;
    this.unsubscribe = this.props.firebase
      .comments()

      .where("articleId", "==", articleId)
      .limit(8)

      .onSnapshot((snapshot) => {
        const comments = [];
        let commentId = "";
        snapshot.forEach((doc) => {
          const data = doc.data();
          commentId = doc.id;
          data.commentId = commentId;
          comments.push(data);
          this.setState({
            comments: comments,
          });
        });
      });

    this.setState({ articleId });

    this.unsubscribe = this.props.firebase
      .article(articleId)

      .onSnapshot((doc) => {
        if (doc.exists) {
          this.setState({
            article: doc.data(),
          });
          this.setState({
            timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A  `),
          });
        } else {
          console.log("No such document!");
        }
        let autherId = this.state.article.userId;

        this.props.firebase
          .user(autherId)
          .get()
          .then((doc) => {
            let user = doc.data();
            this.setState({
              username: user.username,
              photoUrl: user.photoUrl,
            });
          });
      });

    this.unsubscribe = this.props.firebase
      .comments()
      .where("articleId", "==", articleId)
      .onSnapshot((snapshot) => {
        const TotallComment = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          TotallComment.push(data);
        });
        this.setState({ TotallComment: TotallComment });
        const totalcount = TotallComment.length;
        this.setState({ totalcount: totalcount });
      });
  };
  createComment = (comment, article) => {
    this.props.firebase
      .comments()
      .add({
        ...comment,
        articleId: this.state.articleId,
      })
      .then(function (docRef) {});
  };

  render() {
    const {
      article,
      comment,
      comments,
      timeCreated,
      sortType,
      limited,
    } = this.state;
    if (comments) {
      comments.sort((a, b) => {
        const isReversed = sortType === "desc" ? 1 : -1;
        return isReversed * a.timeCreated.localeCompare(b.timeCreated);
      });
    }

    if (article) {
      return (
        <div className="container-individual ">
          <div className="card-individual">
            <ListItem1 article={article} isIndividualView={true} />
            <div className="auther-name-individual">
              <div className="autherstyle-individual">
                <span />
                <img src={this.state.photoUrl} className="user-profile" />{" "}
                <span className="usernamepost">
                  posted by {this.state.username}
                  {article.timeCreated}
                </span>
              </div>
            </div>

            <div className="grid-subject2">
              <a href={article.url}>{article.title}</a>
            </div>

            <div className="grid-description">
              <p>{article.description}</p>
            </div>

            <div className="stylebutton">
              <button
                style={{ justifyContent: "spacebitween" }}
                type="button"
                className="disabled"
              >
                <i className="fa fa-comment"> </i> {this.state.totalcount}{" "}
                Comment
              </button>
            </div>
          </div>
          <div>
            <AddComment comment={comment} onCreate={this.createComment} />
          </div>

          <div>
            {this.state.comments &&
              this.state.comments.map((comment, index) => {
                return (
                  <div className="card-comment">
                    <Comment
                      comment={comment}
                      key={index}
                      limited={limited}
                      timeCreated={timeCreated}
                      commentId={comment.commentId}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      );
    } else {
      console.log("no article");
      return null;
    }
  }
}
export default compose(withFirebase, withRouter)(IndividualView);
