import React from "react";
import myimage from '../../assets/images/nice-piccy3.jpg';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../components/Session';
import labsLogo from '../../assets/images/ctd-labs-logo.png'

class Dashboard extends React.Component {
    render() {
    return (
      <div className="wrapper">
      <div className="popular-title">
          <p style={{float:"left"}}>Popular Posts</p>
      </div>
      <div className="create-post">
      <a href="#" title="upload image" style={{float:"right"}}><i className="fa fa-image"></i></a>
      <a href="#" title="upload image" style={{float:"right"}}><i className="fa fa-link"></i></a>
      <input type="text" placeholder="Create post" class="writepost"/>
      </div>
      <div className="posts">
          <div className="likes" style={{width:"40px; border-left:4px solid transparent;", float:"left"}}>
            <span style={{fontSize:"1em"}}><i className="fa fa-arrow-up custom"></i>6k<i className="fa fa-arrow-down custom"></i></span>
          </div>
          <div className="maincontent" id="content">
            <div className="author">
              <span style={{float:"left"}}><i className="fa fa-user"></i></span>
              <span style={{float:"left"}}> post by Eliz </span>
              <span style={{float:"left"}}>  7 hours ago</span>
              <span style={{float:"left"}} className="effect"><i className="fa fa-trophy" ></i></span>
            </div>
            <div className="posts-content">
              <h4>React</h4>
              <img className="profile-img"
                  alt="complex"
                  src={myimage}/>
            </div>
            <div className="bottom" id="commentarea">
            <span style={{float:"left"}}><i className="fa fa-comment">6k comments</i></span>
            <span style={{float:"left"}}><i className="fa fa-share">share</i></span>
            
              <span style={{float:"left"}}>...</span>
            </div>
        </div>
      </div>
      <div className="posts">
          <div className="likes" style={{width:"40px; border-left:4px solid transparent;", float:"left"}}>
            <span style={{fontSize:"1em"}}><i className="fa fa-arrow-up custom"></i>6k<i className="fa fa-arrow-down custom"></i></span>
          </div>
          <div className="maincontent" id="content">
            <div className="author">
              <span style={{float:"left"}}><i className="fa fa-user"></i></span>
              <span style={{float:"left"}}> post by Eliz </span>
              <span style={{float:"left"}}>  7 hours ago</span>
              <span style={{float:"left"}} className="effect"><i className="fa fa-trophy" ></i></span>
            </div>
            <div className="posts-content">
              <h4>Web development</h4>
              
                    <img className="profile-img"
                  alt="complex"
                  src={myimage} height="100px"/>
                 
            </div>
            
            <div className="bottom" id="commentarea">
            <span style={{float:"left"}}><i className="fa fa-comment">6k comments</i></span>
            <span style={{float:"left"}}><i className="fa fa-share">share</i></span>
            <span style={{float:"left"}}>...</span>
            </div>
        </div>
      </div>
      </div>
  );
}
}


const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(Dashboard);