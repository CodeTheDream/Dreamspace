import React from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../../components/Session";
import { withFirebase } from "../../components/Firebase";
import ReplyComment from "../ReplyComment";
import AddReplys from "../AddReplys";
const moment = require("moment");
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      showAll: false,
      commentId: "",
      replys: [],
      timeCreated: "",
      totallReplys: 0,
      sortType:'asc',
      replysID:"",
      username:""
    };
  }

  componentDidMount = () => {
    const commentId = this.props.commentId;
    //console.log("this is commentId", commentId);
    this.unsubscribe = this.props.firebase
      .replys(commentId)
      //.where("commentId", "==", commentId)
      .onSnapshot(snapshot => {
        const Replys = [];
        let replysId = "";
        snapshot.forEach(doc => {
         
          const data = doc.data();
         // console.log("doc data",data)
          replysId = doc.id;
          data.replysId = replysId;
          Replys.push(data);
        });
       //console.log("this is my replysID using spesific commentId", replysId);
        this.setState({ 
          replys: Replys,
          replysId:replysId
         });

        const totallCountReplys = Replys.length;
        //console.log("totalcountReplys", totallCountReplys);
        this.setState({ totallReplys: totallCountReplys });
      });
      let {comment}= this.props;
      let autherId = comment.userId;
      this.unsubscribe = this.props.firebase
        .user(autherId)
        .get()
        .then(doc => {
          // console.log("userdata", doc.data())
          let user = doc.data();
          this.setState({ username: user.username });
        });
       
       
  };

  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });

  render() {

    const { comment, limited, timeCreated, commentId,userName ,} = this.props;
    const { showAll,replys,sortType,replysId} = this.state;
    let commentContent = comment.comment;
    
//console.log("Here is your  replysId", replysId)

    if(replys){
      replys.sort((a,b) =>{
       const  isReversed = (sortType === 'asc') ? 1 :-1;
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
                    posted By {this.state.username}
                    {comment.timeCreated} <br />
                    {comment.comment}{" "}
                    
                  </p>

                  <div>
                    <AddReplys commentId={comment.commentId} />

                    <div>
                      <ReplyComment
                        replys={this.state.replys}
                        timeCreated={timeCreated}
                        commentID={commentId}
                        comment={comment}
                        totallReplys={this.state.totallReplys}
                        replysId={replysId}
                        
                      />
                    </div>
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
