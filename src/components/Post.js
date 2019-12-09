import React from 'react';
import PostsData from '../data/posts.json';
import "./PostStyle.scss";


class Post extends React.Component {
   

    render(){
      


         return (
            
             <div className="wrapper">
                 <div  className="NewPost">Create Post  <a href="#" className="right" >Link</a> </div>
                 
                 { PostsData.map((postDetail,index) => {
                 return (
                   <div className="PostedBy" >  
                 <p className="Start">{postDetail.postedBy }  { postDetail.timeAt}</p>
                 
                       <p className="Topic">{postDetail.content}</p>
                       </div>
                    
                 );
                 })}
             </div>
         );
    }

   
}

export default Post;