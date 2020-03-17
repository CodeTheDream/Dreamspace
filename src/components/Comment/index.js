import React from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../../components/Session";
import { withFirebase } from "../../components/Firebase";
import ReplyComment from "../ReplyComment";
const moment = require("moment");
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      showAll: false,
     // replies: [],
      // isOldestFirst: "",
      commentId: "",
      replys: [],
      timeCreated: "",
      totallReplys: 0,
      sortType:'asc'

    };
  }

  handleSubmit = (e, commentId) => {
    e.preventDefault();
    //console.log("this is the event",e)
    //const {commentId}=this.props.comments.commentId
    console.log("this is the commentId for the reply", commentId);
    //console.log("show the reply",this.state.reply)
    this.props.firebase
      .replys(commentId)

      .add({
        // commentId:commentId,
        reply: this.state.reply,
        timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A `)
      })
      .then(docRef => {
        console.log(" this is the replysID ", docRef.id);
      })
      //.where("commentId", "==", commentId)
      .onSnapshot(snapshot => {
        const Replys = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          Replys.push(data);
        });
        //console.log("this is my replys using spesific commentId", Replys);
        this.setState({ replys: Replys });
        const totallCountReplys = Replys.length;
        //console.log("totalcountReplys", totallCountReplys);
        this.setState({ totallReplys: totallCountReplys });

      });

    this.setState({
      reply: ""
    });
  };
  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      reply: e.target.value
    });
  };

  togglePopup = () => {
    //const{commentId}=this.props
    this.setState({
      showPopup: !this.state.showPopup
    });
    //console.log("this is the commentId", commentId)
  };
  cancle = () => {
    this.setState({ showPopup: false });
  };

  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });

  render() {

    const { comment, limited, timeCreated, commentId,userName ,} = this.props;
    const { showAll,replys,sortType } = this.state;
    let commentContent = comment.comment;
    //  const { reply } = this.state;
    // console.log("Here is your comment ID", comment.commentId)

    if(replys){
      replys.sort((a,b) =>{
       const  isReversed = (sortType === 'dsc') ? 1 :-1;
       return  isReversed * a.timeCreated.localeCompare(b.timeCreated)
     })
     //console.log("sortedComment",sortedcomments)
         }

    if (comment.comment && comment.comment.length <= limited) {
      // console.log("IF", comment.comment, comment.comment.length);
      return (
        <AuthUserContext.Consumer>
          {authUser => (
            <div>
              <div>
                <div className="commentDisplay">
                  <p className="styleDisplay">
                  <i className="fa fa-user"></i>{" "}
                    posted By {userName}
                    {comment.timeCreated} <br />
                    {comment.comment}{" "}
                  </p>

                  

                    <div className="Reply">
                      <button onClick={this.togglePopup}>
                        <i className="fa fa-comment"> </i>Reply
                      </button>

                    <AddReplys commentId={comment.commentId} />

                    <div>
                      <ReplyComment
                        replys={this.state.replys}
                        timeCreated={timeCreated}
                        commentID={comment.commentId}
                        comment={comment}
                        totallReplys={this.state.totallReplys}
                        userName={userName}
                      />

                    </div>
                    {this.state.showPopup ? (
                      <div>
                        <form
                          className="card-addcomment"
                          onSubmit={e =>
                            this.handleSubmit(e, comment.commentId)
                          }
                        >
                          <div className="commentgrid">
                            <textarea
                              className="commentContent"
                              // id="reply"
                              type="text"
                              value={this.state.reply}
                              //name="reply"
                              placeholder="Write your Reply here! "
                              autoFocus={true}
                              onChange={this.handleChange}
                            ></textarea>

                            <button className="submit-btn" type="submit">
                              Reply
                            </button>
                            <button
                              className="submit-btn"
                              onClick={this.cancle}
                            >
                              cancle
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : null}
                    <ReplyComment commentID={comment.commentID} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </AuthUserContext.Consumer>
      );
    } else {
      //  console.log("ELSE", comment.comment, comment.comment.length);

      if (showAll) {
        return (
          <div className="card-comment">
            <div className="commentDisplay">
              <p className="styleDisplay">
                {comment.timeCreated} <br />
                {comment.comment}
                <a onClick={this.showLess} style={{ color: "darkblue" }}>
                  Read less
                </a>
              </p>
            </div>
          </div>
        );
      }
    }
    //console.log("this is commentContent",commentContent)
    const toShow = commentContent.slice(0, limited) + "....";

    if (toShow) {
      return (
        <div className="card-comment">
          <div className="commentDisplay ">
            <p className="styleDisplay">
              {comment.timeCreated} <br />
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
export default compose(withFirebase)(Comment);
