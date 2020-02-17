import React from "react";
import "./ViewArticle.scss";
import AddComment from "../../components/CommentSystem/AddComment";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import Comment from "../../components/Comment";
import ListItem  from '../../components/ListItem'
const moment = require("moment");
class IndividualView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: "",
      comment: [],
      articleId: "",
      timeCreated: "",
      comments: null,
      limit: "",
      limited: 450,
      TotallComment: "",
      totalcount: 0
    };
  }

  componentDidMount = () => {
    let articleId = this.props.match.params.articleId;
    this.unsubscribe = this.props.firebase
      .comments()
      .where("articleId", "==", articleId)

      //.orderBy('timeCreated','desc')
      //.startAfter(lastDoc.timeCreated)
      .limit(8)

      .onSnapshot(snapshot => {
        const comments = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          comments.push(data);
        });

        this.setState({ comments: comments });
        // console.log("here my snapshot ", snapshot);
      });

    //get the ID for a particular article
    // console.log("articleId", this.props.match.params);
    this.setState({ articleId });

    this.unsubscribe = this.props.firebase
      .article(articleId)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log(" this is my article", doc.data());
          this.setState({
            article: doc.data(),
            timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A  `)
          }); // set data to local state
        } else {
          console.log("No such document!");
        }
      });
    //This Helps to find the total commets for spesific articleId
    this.unsubscribe = this.props.firebase
      .comments()
      .where("articleId", "==", articleId)
      .onSnapshot(snapshot => {
        const TotallComment = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          TotallComment.push(data);
         

        });

        this.setState({ TotallComment: TotallComment });
        const totalcount = TotallComment.length
        this.setState({totalcount:totalcount})
      });
  };

  //  componentWillUnmount =() => {
  //         this.unsubscribe();
  //     }

  createComment = (comment, article) => {
    //  console.log("here create comment", comment, this.state.articleId);
    this.props.firebase
      .comments()
      .add({
        ...comment,
        articleId: this.state.articleId
      })
      .then(function(docRef) {
        //console.log("Document written with ID: ", docRef.id);
      });
  };

  handleRemove = articleId => {
    const allArticles = this.state.articles;
  };

  render() {
    // Access to local component state
    const {
      article,
      comment,
      comments,
      timeCreated,
      articleId,
      limited
    } = this.state;
    const { userId, url, description, title } = this.props;
    //const numRows = this.state.TotallComment.length;

    return (
      <div className="container-indvidual ">
        <div className="card-individual">
          <div
            className="likes-indivividual"
            style={{
              width: "40px; border-left:4px solid transparent;",
              float: "left"
            }}
          >
            <span style={{ fontSize: "1em" }}>
              <button className="upvote-individual">
                <i className="fa fa-arrow-up custom"> </i>
              </button>
              <br />
              {this.state.calculatedvote}
              <br />
              <button className="downvote-individual">
                <i className="fa fa-arrow-down custom"></i>
              </button>
            </span>
          </div>
          <div className="auther-name-indvidual">
            <div className="autherstyle-individual">
              <i className="fa fa-user"></i>
              <span>posted by {article.timeCreated}</span>
            </div>
          </div>

          <div className="grid-subject2">
            <a href={article.url}>{article.title}</a>
          </div>

          <div className="grid-description">
            <p>{article.description}</p>
          </div>

          <div className="stylebutton">
            <button style={{justifyContent:"spacebitween"}}
              type="button"
              //onClick={this.handleSubmit}
              className="disabled"
            >
              <i className="fa fa-comment"> </i>
              {this.state.totalcount}
              Comment
            </button>

            <button type="button" onClick={this.handleRemove} className="disabled">
              Save
            </button>
          </div>
        </div>

        <div>
          <AddComment comment={comment} onCreate={this.createComment} />
        </div>

        <div>
          {this.state.comments &&
            this.state.comments.map(comments => {
              return (
                <Comment
                  comments={comments}
                  limited={limited}
                  timeCreated={timeCreated}
                />
              );
            })}
         
        </div>
        {/*<ListItem {this.state.totalcount}</ListItem>*/}
      </div>
    );
  }
}

export default compose(withFirebase, withRouter)(IndividualView);
