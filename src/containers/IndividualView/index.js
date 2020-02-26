import React from "react";
import AddComment from "../../components/CommentSystem/AddComment";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import Comment from "../../components/Comment";
import ListItem1 from '../../components/ListItem1'
const moment = require("moment");
class IndividualView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article:"" ,
      comment: [],
      articleId: "",
      timeCreated: "",
      comments: null,
      limit: "",
      limited: 450,
      TotallComment: "",
      totalcount: ""
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
            article: doc.data()})
            this.setState({
            timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A  `)
          }); // set data to local state
          console.log("this is a state article:" , this.state.article)
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
   // const allArticles = this.state.articles;
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.article !== this.props.article) {
        this.calculatedvote(this.props.article.upvotes, this.props.article.downvotes)
    }
};
  render() {
    // Access to local component state
    const {
      article,
      comment,
   
      timeCreated,
     
      limited
    } = this.state;
    //const { userId, url, description, title } = this.props;
    //const numRows = this.state.TotallComment.length;
console.log("this is the new article for indivi:" , article)
if(article){
    return (
      <div className="container-individual ">
        <div className="card-individual">

          <ListItem1 article={article }  isIndividualView = {true}/>
         
          <div className="auther-name-individual">
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
            this.state.comments.map((comments,index) => {
              return (
                <Comment
                  comments={comments}
                  key={index}
                  limited={limited}
                  timeCreated={timeCreated}
                />
              );
            })}
         
        </div>
        
      </div>
    );
          }
          else {
          
            console.log("no article")
            return(
            null)

          }
  }
}

export default compose(withFirebase, withRouter)(IndividualView);
