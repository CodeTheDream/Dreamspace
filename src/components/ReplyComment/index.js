/*import React from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../../components/Session";
const moment = require("moment");

class ReplyComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeCreated: "",
<<<<<<< HEAD
      showAll: false,
      showPopup: false,
      username: "",
     // reply: "",
      photoUrl: "",
=======
      //replys: [],
      //limit: 5,
      showAll: false,
      showPopup: false,
      username:"",
      reply:""
>>>>>>>  new commit for  rebuilding of the comment system
    };
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };
  cancle = () => {
    this.setState({ showPopup: false });
  };
  componentDidMount = () => {
    this.getReplyUserDetails();
   // console.log("reply user id", this.props.replyUserId);
  };

<<<<<<< HEAD
  getReplyUserDetails = () => {
    //e.preventDefault();
    //const autherId = authUser.uid;
    this.props.firebase
      .user(this.props.replyUserId)
      .get()
      .then((doc) => {
       // console.log("userdata in comment", doc.data());
        let user = doc.data();
        this.setState({
          username: user.username,
          photoUrl: user.photoUrl,
        });
      });
  };
=======
  componentDidMount = () => {
   
const {replysId} = this.props
console.log("replyId at replycomment  componentdidmount",replysId)     
     
       this.unsubscribe = this.props.firebase
       .replys(replysId)
 
       .onSnapshot(doc => {
         if (doc.exists) {
         // console.log(" this is my article", doc.data());
           this.setState({
           
             reply: doc.data()
             
           });
          }})
         // console.log("reply",this.state.reply)
    let autherId = this.state.reply.userId;
    //console.log("autherId of  a reply",autherId)
    this.unsubscribe = this.props.firebase
      .user(autherId)
      .get()
      .then(doc => {
        // console.log("userdata", doc.data())
        let user = doc.data();
        //this.setState({ username: user.username });
      })
  
  }
 /* renderReplycomment = () => {
    // console.log("this is the replys in renderreplys func", this.props.replys);
    const { comment, timeCreated } = this.props;

    if (this.props.replys) {
      this.props.replys.map((reply,i)=> {
        console.log("this is the the reply in the reply function", reply);
        return (
          <div>
            <ReplyComment timeCreated={reply.timeCreated} reply={reply.reply} />

            <AddReplys type="child" />
          </div>
        );
      });
    }
  };
  
>>>>>>>  new commit for  rebuilding of the comment system

  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });

  render() {
<<<<<<< HEAD
    const { commentId, replys, limited, reply, showAll } = this.props;
    let commentReply = reply.reply;
    //console.log("showMore", this.showMore);
    const replyToRender = replys.filter((reply1) =>
      commentId === reply1.parentCommentId ? reply.parentCommentId : null
    );
    const numOfReplys = replyToRender.length;
   console.log("reply  comment that can be shown:",reply.reply)

    // let replycomment = replys.filter((reply) =>
    //   (commentId === reply.parentCommentId )? reply.reply : null
    // );
    // console.log("replycomment",replycomment)
    if (reply.reply.length <= limited) {
      return (
        <div>
          <div className="replypage">
            <i
              className="fas fa-angle-down "
              style={{ width: "10em" }}
              onClick={() => {
                this.togglePopup();
              }}
            >
              {" "}
              {/* View{""}  */}
              {numOfReplys}
              {" More "}
              {" Replys "}
            </i>
          </div>
          {this.state.showPopup ? (
            <div>
              <div>
=======
    const {  timeCreated, commentID, userName ,replysId} = this.props;
    
 console.log("replyId at replycomment11", replysId);
    //console.log("show popup", this.state.showPopup);
    return (
      <div>
        <div className="replypage">
          <i
            className="fas fa-angle-down "
            style={{ width: "10em" }}
            onClick={() => this.togglePopup()}
          >
            {" "}
            view{""} {this.props.totallReplys}
            {" more "}
            {" Replys "}
          </i>
        </div>
        {this.state.showPopup ? (
          <div>
          <div>
            {this.props.replys.map(reply => {
              //console.log("this is the the reply in the reply function", reply);
              return (
>>>>>>>  new commit for  rebuilding of the comment system
                <div>
                  <div className="replystayle">
                    <p>
                      {" "}
<<<<<<< HEAD
                      <span />
                      <img
                        src={this.state.photoUrl}
                        alt=""
                        className="user-profile"
                      />{" "}
                      posted By {this.state.username} {reply.timeCreated}
=======
                      <i className="fa fa-user"></i> posted By {this.state.userName}{" "}
                      
                      {reply.timeCreated}
>>>>>>>  new commit for  rebuilding of the comment system
                    </p>
                    <p>{reply.reply}</p>
                  </div>
                </div>
              </div>
              <div className="replypage-hide">
                <i
                  className="fas fa-angle-up "
                  style={{ width: "10em" }}
                  onClick={this.cancle}
                >
                  {" "}
                  Hide viwe
                </i>
              </div>
            </div>
          ) : null}
        </div>
      );
    } else {
      if (showAll) {
        return (
          <div>
            <div className="replypage">
              <i
<<<<<<< HEAD
                className="fas fa-angle-down "
                style={{ width: "10em" }}
                onClick={() => {
                  this.togglePopup();
                }}
              >
                {" "}
                {/* View{""}  */}
                {numOfReplys}
                {" More "}
                {" Replys "}
              </i>
=======
             className="fas fa-angle-up " 
             style={{ width: "10em" }}
              
           onClick={this.cancle}>{" "}Hide {" "} viwe</i>
           
>>>>>>>  new commit for  rebuilding of the comment system
            </div>
            {this.state.showPopup ? (
              <div>
                <div>
                  <div>
                    <div className="replystayle">
                      <p>
                        {" "}
                        <span />
                        <img
                          src={this.state.photoUrl}
                          alt=""
                          className="user-profile"
                        />{" "}
                        posted By {this.state.username} {reply.timeCreated}
                      </p>
                      <p>
                        {reply.reply}
                        <a 
                          onClick={this.showLess}
                          style={{ color: "darkblue" }}
                        
                        >
                          Read less
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="replypage-hide">
                  <i
                    className="fas fa-angle-up "
                    style={{ width: "10em" }}
                    onClick={this.cancle}
                  >
                    {" "}
                    Hide viwe
                  </i>
                </div>
              </div>
            ) : null}
          </div>
        );
      }
    }
    
    //console.log("commentReplys",commentReply)
    const toShow = commentReply.substring(0, limited) + "....";
   // console.log("sliced comment Replys", toShow);
    if (toShow) {
      return (
        <div>
          <div className="replypage">
            <i
              className="fas fa-angle-down "
              style={{ width: "10em" }}
              onClick={() => {
                this.togglePopup();
              }}
            >
              {" "}
              {/* View{""}  */}
              {numOfReplys}
              {" More "}
              {" Replys "}
            </i>
          </div>
          {this.state.showPopup ? (
            <div>
              <div>
                <div>
                  <div className="replystayle">
                    <p>
                      {" "}
                      <span />
                      <img
                        src={this.state.photoUrl}
                        alt=""
                        className="user-profile"
                      />{" "}
                      posted By {this.state.username} {reply.timeCreated}
                    </p>
                    <p>
                      {toShow}
                      <a onClick={this.showMore} style={{ color: "darkblue" }}>
                        {" "}
                        Read More{" "}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="replypage-hide">
                <i
                  className="fas fa-angle-up "
                  style={{ width: "10em" }}
                  onClick={this.cancle}
                >
                  {" "}
                  Hide viwe
                </i>
              </div>
            </div>
          ) : null}
        </div>
      );
    }
  }
}

<<<<<<< HEAD
export default compose(withFirebase)(ReplyComment);
=======
export default compose(withFirebase, withRouter)(ReplyComment);*/
>>>>>>>  new commit for  rebuilding of the comment system
