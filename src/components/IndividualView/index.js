import React from 'react';
import './ViewArticle.scss';
import AddComment from '../CommentSystem/AddComment.js';
import Comments from '../CommentSystem/Comments.js';
import Comment from '../CommentSystem/Comment.js';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';




const moment = require("moment");
class IndividualView extends React.Component {
    constructor(props){
        super(props);
        this.state ={
           title:"",
           article:"",
           comment:[],
           articleId:"",
           timeCreated:"",
           comments:null,
           limmit:50
           
           
        }; 
    }



 componentDidMount =() => {
    
    this.unsubscribe = this.props.firebase
    .comments()
    .get()
    .then(snapshot => {
        const comments = []
        snapshot.forEach(doc => {
            const data=doc.data()
             comments.push(data)
        })
   
        this.setState({ comments:comments })
        console.log('here my snapshot',snapshot)
      })
      .catch(error => console.log(error))
    

    //   componentWillUnmount() {
    //     this.unsubscribe();
    //   }






        //get the ID for a particular article
        let articleId =this.props.match.params.articleId;
     
      console.log("articleId" , this.props.match.params);
        this.setState({articleId})
      
     this.unsubscribe=this.props.firebase.article(articleId).get().then((doc ) =>  {
      
         if (doc.exists) {
            console.log(" this is my article", doc.data());
            this.setState({article :doc.data(),
                 timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A  UTC-6`)
                })   // set data to local state
         
            }  else {
                console.log("No such document!");
            } 
        
     })
  
    
    
    } 



//  componentWillUnmount =() => {
//         this.unsubscribe();
//     }    
    

            createComment =(comment, article ) => {
               console.log( "here create comment",comment,this.state.articleId);
               this.props.firebase
               .comments().add({
                     ...comment,
                     articleId:this.state.articleId,
                   
               })
               .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
              })
            }



            

    render() {
        // Access to local component state
       const {article, comment, comments , timeCreated, articleId} =this.state;




        return (

           
              <div className="container">
                <div className="auther-name" >
                 <div className="autherstyle"> 
                       <span style={{ float: "left" }}>
                          <i className="fa fa-user"></i>
                       </span>
                    <span style={{ float: "left",fontWeight:'bold' }}>posted byAuther  {timeCreated} </span>
                 </div>
                </div>


               <div className="grid-subject" >
                     <div className="article-subject">
                            Article Subject    
                     </div>
                     </div> 



               <div className="grid-view"> 
                     <div className="view-article">
                     <h1>{article.title}</h1> 
                     </div>
               </div>   
                   


               <div className="stylebutton" >
                       <button 
                        type="button" 
                        //onClick={this.handleSubmit}
                     
                        >
                        Comment
                        </button>

                       <button type="button" >Share</button>
                       <button  type="button" >Save</button>
                 </div>

                    <div>
                    < AddComment
                    comment ={comment}
                    onCreate ={this.createComment}
                   
                     />
                    </div>
                
                    

                 <div>
                   {this.state.comments && this.state.comments.map(comments => {
                       return (
                       <div className="commentDisplay">
                        <div className="styleDisplay" >
                           <article  >
                             <p> {comments.articleId} </p>
                             <p>{comments.comment}</p>
                             <p>{comments.limmit}</p>
                             <p>{comments.timeCreated}</p>
                          </article>
                         </div>
                       </div>
                       )
                   }
                   )}
                </div>            

            </div>
        );
    };              
}

export default compose(withFirebase, withRouter)(IndividualView);









// fetch('https://console.firebase.google.com/u/0/project/devedit-8d545/database/firestore/data~2Fcomments', {
      
        
    //     method: "GET",
    //     dataType: "JSON",
    //     headers: {
    //         "Content-Type": "application/json; charset=utf-8"
    //     }
    // })
    //     .then(resp => {
    //         return resp.json();
    //     })
    //     .then(comments => { this.setState({ hits: comments.hits});
    //      })
       
    //     .catch(error => {
    //         console.log(error, "catch the hoop");
    //     });





   




