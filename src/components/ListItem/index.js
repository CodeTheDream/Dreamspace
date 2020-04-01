import React from "react";
import { EmailIcon, FacebookIcon, LinkedinIcon,FacebookShareCount } from "react-share";
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
      totalcount: ""
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
        let user = doc.data();
        this.setState({
          username: user.username,
          authorPhoto: user.email
        });
        console.log("authorPhoto", this.state.authorPhoto);
      });
  }
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };
 
  
  fbClicked () {
    
    this.props.sharedBy('fb')
  }
  render() {
    const { upvotes } = this.state;
    const { downvotes } = this.state;
    const { article } = this.props;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
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
                
                <div className="auther-style">
                  <a href={this.props.article.url}>
                    {this.props.article.title}
                  </a>
                </div>

                <div className="description-style">
                  {this.props.article.description}
                </div>
              </div>
              <br />
              <div id="commentarea">
                <span style={{ float: "right" }}>
                  <button
                    className="button"
                    onClick={e => this.openPost(e, article)}
                  >
                    <i
                      className="fa fa-comment-alt
"
                    >
                      {" "}
                      {this.state.totalcount} {" comment "}
                    </i>
                  </button>
                  <span style={{ float: "right" }}>
                    <button className="button" onClick={this.togglePopup}>
                      <i className="fa fa-share">share...</i>
                    </button>
                  </span>
                </span>
              </div>
            </div>
            <span style={{ float: "right" }}>
              <div>
                {this.state.showPopup ? (
                  <div className="sharecard">
                    
                     <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FacebookIcon url={this.props.article.url}  size={32} round={true} onClick={this.fbClicked} >
                      {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                      </FacebookIcon>
                    </a>
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedinIcon url={this.props.article.url}  size={32} round={true}>
                      {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                        </LinkedinIcon>
                    </a>
                    <EmailIcon   size={32} round={true}/>
                  
                  </div>
                ) : null}
              </div>
            </span>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default compose(withFirebase, withRouter)(ListItem);
