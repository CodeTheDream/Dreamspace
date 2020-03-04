import React from "react";
import ReplyComment from "../ReplyComment";
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      showAll: false,
      reply:"",
      isOldestFirst:""
     
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    console.log("new reply",this.state.reply)
   this.props.onCreate(this.state.reply)
    this.setState({ reply: "" });
    alert("new reply",this.state.reply)
  };
 
  
  handleChange = e => {
   // console.log(e.target.value)
      this.setState({
        reply: e.target.value
      });
    };
    
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
     // console.log("IF", comments.comment, comments.comment.length);
      return (
        <div className="card-comment">
          <div className="commentDisplay">
            <p className="styleDisplay">
              {comments.timeCreated} <br />
              {comments.comment}{" "}
            </p>

            <div>
              <div className="Reply">
                <button onClick={this.togglePopup}>
                  <i className="fa fa-comment"> </i>Reply
                </button>
              </div>
              {this.state.showPopup ? (
                <div>
                  
                  <form className="card-addcomment" onSubmit={this.handleSubmit}>
                  <div className="commentgrid">
                  
                  <textarea
              className="commentContent"
              type="text"
             value={this.state.reply}

             name="reply"
              placeholder="Write your Reply here! "
              autoFocus={true}
              onChange={this.handleChange}
            ></textarea>
         
          <button
            className="submit-btn"
            type="submit"
            value=" Reply"
            disabled={!this.state.Reply}
           
          >
            Reply
          </button>
                    <button className="submit-btn" onClick={this.cancle}>
                        cancle
                      </button>
                    </div>
                  
                </form>

                 
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
