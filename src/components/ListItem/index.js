import React from "react";
import myimage from "../../assets/images/nice-piccy3.jpg";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { AuthUserContext } from "../Session";

import ListItem1 from "../ListItem1";
class ListItem extends React.Component {
  constructor(props) {
    // console.log("this is the props value:" + props)
    super(props);
    this.state = {
      article: [],
      username: "",
      TotallComment: "",
      totalcount: "",
      authorPhoto:""
    };
  }
  openPost(e, article) {
    // console.log("ARTICLE", article)
    e.preventDefault();
    this.props.history.push({
      pathname: "/articles/" + article.uid,
      params: article.uid,
      state: { article }
    });
  }
  componentDidMount() {
    const { article } = this.props;
    this.props.firebase
      .comments()
      .where("articleId", "==", article.uid)
      .onSnapshot(snapshot => {
        const TotallComment = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          TotallComment.push(data);
        });
        this.setState({ TotallComment: TotallComment });
        const totalcount = TotallComment.length;
        this.setState({ totalcount: totalcount });
      });
      let autherId = article.userId;
        this.unsubscribe = this.props.firebase
            .user(autherId)
            .get()
            .then(doc => {
               // console.log("userdata", doc.data())
                let user = doc.data()
                this.setState({ 
                  username: user.username,
                  authorPhoto:user.email
                 })
                 console.log("authorPhoto",this.state.authorPhoto)
            })
        
  }

  render() {
    const { upvotes } = this.state;
    const { downvotes } = this.state;
    const { article } = this.props;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="card">
            <ListItem1 article={article} />
            <div className="maincontent" id="content">
              <div className="auther">
                <div className="auther-style">
                  <span>
                    <i className="fa fa-user"></i>
                  </span>
                  <span>
                    posted by {this.state.username} {article.timeCreated}
                  </span>
                </div>
              </div>
             <div> {this.props.article.tags}</div>
              <div className="auther-style">
                <a href={this.props.article.url}>{this.props.article.title}</a>
              </div>

              <div className="description-style">
                {this.props.article.description}
              </div>
            </div>
<br/>
            <div id="commentarea">
              <span style={{ float: "right" }}>
                <button
                  className="button"
                  onClick={e => this.openPost(e, article)}
                >
                  <i className="fa fa-comment-alt
">
                    {" "}
                    {this.state.totalcount} {" comment "}
                  </i>
                </button>
                <span style={{ float: "right" }}>
                  <button className="button">
                    <i className="fa fa-share">share...</i>
                  </button>
                </span>
              </span>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default compose(withFirebase, withRouter)(ListItem);
