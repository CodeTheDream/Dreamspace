import React from 'react';
import './ViewArticle.scss';
import AddComment from '../CommentSystem/AddComment.js';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';




class IndividualView extends React.Component {
    constructor(props){
        super(props);
        this.state ={
           title:"",
           article:"",
           comment:[],
           articleId:"",
           createdAT:"",
           comments:[]
           
           
        }; 
    }



 componentDidMount =() => {
        //get the ID for a particular article
        let articleId =this.props.match.params.articleId;
     
      console.log("articleId" , this.props.match.params);
        this.setState({articleId})
      
     this.unsubscribe=this.props.firebase.article(articleId).get().then((doc ) =>  {
      
         if (doc.exists) {
            console.log(" this is my article", doc.data());
            this.setState({article :doc.data()})   // set data to local state
         
            }  else {
                console.log("No such document!");
            } 
        
     })
  

       
    } 
//  componentWillUnmount =() => {
//         this.unsubscribe();
//     }    
    

            createComment =(comment, article) => {
               console.log( "here create comment",comment,this.state.articleId);
               this.props.firebase
               .comments().add({
                   ...comment, articleId:this.state.articleId
               })
               .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
              })
            }



            

    render() {
        // Access to local component state
       const {article, comment, comments } =this.state;




        return (

           
              <div className="container">
                <div className="auther-name" >
                 <div className="autherstyle"> 
                       <span style={{ float: "left" }}>
                          <i className="fa fa-user"></i>
                       </span>
                    <span style={{ float: "left",fontWeight:'bold' }}>posted by Auther  8 hours ago </span>
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
                    comments ={comment}
                    onCreate ={this.createComment}
                   
                     />

             <section>
                   {comments.map(comment =>
                       comment={comment} )}

             </section> 
                
                   
                
                    </div> 

                   
                   
               </div>
        );
    };              
}

export default compose(withFirebase, withRouter)(IndividualView);


