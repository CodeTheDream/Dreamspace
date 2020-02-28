import React from "react";
import ReplyComment from "../ReplyComment"
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      showAll: false
    };
  }
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });

  };
  cancle = () => {
    this.setState({ showPopup: false });
  };

  sortByDtate () {
    const { postList, limited, timeCreated } = this.props;
    let newPostList = postList
  if(this.state.isOldestFirst){
    newPostList.sort((a,b) => a.timeCreated< b.timeCreated)
  }
  else {
    newPostList.sort((a,b) =>a.timeCreated > b.timeCreated)
  console.log("newpost" , newPostList)
  }
  
  this.setState({comments:newPostList.sort((a,b) => a.timeCreated >b.timeCreated)})
  
  }
  

  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });

  render() {
    const { comments, limited, timeCreated } = this.props;
    const { showAll } = this.state;

  
    if (comments.comment && comments.comment.length <= limited) {
      console.log("IF", comments.comment, comments.comment.length);
      return (
        <div className="card-comment">
          <div className="commentDisplay">
            <p className="styleDisplay">
              {comments.timeCreated} <br />
              {comments.comment}{" "}
            </p>

            <div >
              <div className="Reply">
              <button 
                onClick={this.togglePopup}
              >
                <i className="fa fa-comment"> </i>Reply
              </button>
              </div>
              {this.state.showPopup ? (
                <div>
                  <ReplyComment/>

                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    } else {
      console.log("ELSE", comments.comment, comments.comment.length);

      if (showAll) {
        return (
          <div className="card-comment">
            <div className="commentDisplay">
              <p className="styleDisplay">
                {comments.timeCreated} <br />
                {comments.comment}
                <a onClick={this.showLess} style={{ color: "darkblue" }}>
                  Read less
                </a>
              </p>
            </div>
          </div>
        );
      }
    }

    const toShow = comments.comment.slice(0, limited) + "....";
    if (toShow) {
      return (
        <div className="card-comment">
          <div className="commentDisplay ">
            <p className="styleDisplay">
              {comments.timeCreated} <br />
              {toShow}
              <a onClick={this.showMore} style={{ color: "darkblue" }}>
                {" "}
                Read More{" "}
              </a>
            </p>
            <br />
          </div>
        </div>
      );
    }
  }
}
export default Comment;
