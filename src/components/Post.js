import React from 'react';
import PostsData from '../data/posts.json';
import "./PostStyle.scss";


class Post extends React.Component {
   

    render(){
      


         return (
          
             <div className="wrapper">
                 <div className="NewPost"  >Create Post<a  className="right" href="#" > Link</a></div>
                 <div className="subgrid-post">
                 
                 { PostsData.map((postDetail,index) => {
                 return (
                   <div className="PostedBy" >  
                 <p className="Start">{postDetail.postedBy }  { postDetail.timeAt}</p>
                
                 
                       <p className="Topic">{postDetail.content}</p>
                       <div class="buttonGrid" >
                       <button  type="button" >Comment</button>
                       <div className="nested">
                       <button type="button" >Share</button>
                       <button  type="button" >Save</button>
                       </div>
                        </div>
                       </div>
    
                    
                       );
                   })}
                   
                </div>
             </div>
             
             
         );
      }

   
}

export default Post;
