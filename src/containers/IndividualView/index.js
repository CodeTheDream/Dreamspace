import React from 'react';
import './ViewArticle.scss';
import AddComment from '../../components/AddComment';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../components/Firebase';
import Comment from '../../components/Comment' ;





const moment = require("moment");
class IndividualView extends React.Component {
    constructor(props){
        super(props);
        this.state ={
           
           article:'',
           comment:[],
           articleId:'',
           timeCreated:'',
           comments:null,
           limit:'',
           limited:450,
           
           
           
           
           
           
        }; 
       
    }


 
    componentDidMount =() => {
        
            let articleId = this.props.match.params.articleId;
            this.unsubscribe =this.props.firebase
            .comments()
            .where("articleId","==",articleId)
            
            //.orderBy('timeCreated','desc')
            //.startAfter(lastDoc.timeCreated)
            .limit(8)
            
            .onSnapshot(snapshot => {
                const comments = []
                    snapshot.forEach(doc => {
                        const data=doc.data()
                        comments.push(data)
            })
            
            this.setState({ comments:comments })
            console.log('here my snapshot',snapshot)
            })
            
            //   componentWillUnmount() {
            //     this.unsubscribe();
            //   }






        //get the ID for a particular article
      console.log("articleId" , this.props.match.params);
        this.setState({articleId})
      
     this.unsubscribe=this.props.firebase.article(articleId).get().then((doc ) =>  {
      
         if (doc.exists) {
            console.log(" this is my article", doc.data());
            this.setState({article :doc.data(),
                timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A  `)
                })   // set data to local state
         
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
                     ...comment,
                     articleId:this.state.articleId,
                     
                     
               })
               .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
              })
            }
       


            handleRemove = (articleId) => {
                const allArticles = this.state.articles 
            }
         

          

            

    render() {
        // Access to local component state
       const {article, comment, comments , timeCreated, articleId, limited} =this.state;
       const {userId, url , description, title} = this.props;




        return (

        
              <div className="container ">
                  <div className="card-article">
                   
                <div className="auther-name">
                   <div className="autherstyle">
                     <i className="fa fa-user"></i>       
                    <span>posted by {article.timeCreated}</span>
                 </div>
                 </div>


               <div className="grid-subject" >
                     <div className="subject-style">
                     <a href={article.url}>{article.title}</a> 
                     </div>
                     </div> 



               <div className="grid-description"> 
                     <div className="view-description">
                     <p>{article.description}</p> 
                     </div>
               </div>   
               

               <div className="stylebutton" >
                       <button 
                        type="button" 
                        //onClick={this.handleSubmit}
                        className="disabled"  
                        >
                        Comment
                        </button>

                       <button type="button"  onClick={this.handleRemove} >Save</button>
                       
                 </div>

                 </div>     
    
                    

                 <div>
                 {this.state.comments && this.state.comments.map(comments => {
                        return (    < Comment  comments={comments} limited={limited} timeCreated={timeCreated} /> )
                      }
                   )}
                  
                </div>    


                 <div>
                    < AddComment
                    comment ={comment}
                    onCreate ={this.createComment}
                   
                     />
                    </div>
                         
               
            </div>
        
        );
    };              
}

export default compose(withFirebase, withRouter)(IndividualView);







