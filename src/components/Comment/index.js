import React from "react";
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
                  <textarea />
                  <div className="Reply1" >
                  <button onClick={this.cancle}>cancle</button>
                  <button>Reply</button>
                </div>
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
