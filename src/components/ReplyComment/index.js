import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import AddReplys1 from "../AddReplys1";
const moment = require("moment");

class ReplyComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeCreated: "",
      //replys: [],
      //limit: 5,
      showAll: false,
      showPopup: false,
      username:"",
      reply:""
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

  componentDidMount = () => {
   
const {replysId} = this.props
//console.log("replyId at replycomment  componentdidmount",replysId)     
     
       this.unsubscribe = this.props.firebase
       .comment()
 
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
  // renderReplycomment = () => {
  //   // console.log("this is the replys in renderreplys func", this.props.replys);
  //   const { comment, timeCreated } = this.props;

  //   if (this.props.replys) {
  //     this.props.replys.map((reply,i)=> {
  //       console.log("this is the the reply in the reply function", reply);
  //       return (
  //         <div>
  //           <ReplyComment timeCreated={reply.timeCreated} reply={reply.reply} />

  //          { /* <AddReplys type="child" />*/}
  //          </div>
  //       );
  //     });
  //   }
  // };
  

  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });

  render() {
    const {  timeCreated, commentId, userName ,replysId,replys} = this.props;
    // let totallReplys=""
    // replys.map(reply => {
    //   console.log("this is the the ParentcommentId in replys", reply.parentCommentId);
    //   if(commentId===reply.parentCommentId){
    //     totallReplys=totallReplys +1;
    //     console.log("totallReplys in reply comment",totallReplys)
    //   // return (
    //   //   <div>
    //   //     <div className="replystayle">
    //   //       <p>
    //   //         {" "}
    //   //         <i className="fa fa-user"></i> posted By {this.state.userName}{" "}
              
    //   //         {reply.timeCreated}
    //   //       </p>
    //   //       <p>{reply.reply}</p>
    //   //     </div>
        
    //   //   </div>
    //   // );
    //   }})
 //console.log("parent coments",replys);
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
            {replys.map(reply => {
              console.log("this is the the ParentcommentId in replys", reply.parentCommentId);
              if(commentId===reply.parentCommentId){
              return (
                <div>
                  <div className="replystayle">
                    <p>
                      {" "}
                      <i className="fa fa-user"></i> posted By {this.state.userName}{" "}
                      
                      {reply.timeCreated}
                    </p>
                    <p>{reply.reply}</p>
                  </div>
                
                </div>
              );
              }
            })
            }
          </div>
              <div className="replypage-hide">
              <i
             className="fas fa-angle-up " 
             style={{ width: "10em" }}
              
           onClick={this.cancle}>{" "}Hide {" "} viwe</i>
           
            </div>
            </div>
        ) : null}
      </div>
    );
  }
}

export default compose(withFirebase, withRouter)(ReplyComment);
