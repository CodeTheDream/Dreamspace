import React from 'react';
import './ViewArticle.scss';
import Comments from './comment.js';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import myimage from "../../assets/images/nice-piccy3.jpg";



class IndividualView extends React.Component {
    constructor(props){
        super(props);
        this.state ={
           title:"",
           content:"",
           article:""
           
           
           
        }; 
    }



 componentDidMount() {
        //get the ID for a particular article
        let articleId =this.props.match.params.articleId;
     
      console.log("articleId" , this.props.match.params);
        
      
     this.unsubscribe=this.props.firebase.article(articleId).get().then((doc ) =>  {
      
         if (doc.exists) {
            console.log(" this is my article", doc.data());
            this.setState({article :doc.data()})   // set data to local state
         
            }  else {
                console.log("No such document!");
            } 
        
     })
  

       
    } 
 componentWillUnmount() {
        this.unsubscribe();
    }    
    
    
            handleSubmit =(e) => {
                e.preventDefault();
               
            }


    render() {
        // Access article from local component state
       const {article} =this.state;



//    let displayArticle = this.state.article.map((A) => (
//        <div  Key={A.articleId} >
//            <h1>{A.title}</h1>
//            <p>{A.article}</p>
//        </div>
//    ))
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
                        onClick={this.handleSubmit}
                        >
                        Comment
                        </button>

                       <button type="button" >Share</button>
                       <button  type="button" >Save</button>
                 </div>

                    <div>
                    < Comments />
                    </div>
                
                 
               </div>
        );
    };
}

export default compose(withFirebase, withRouter)(IndividualView);




/*this.unsubscribe=this.props.firebase.article(articleId).get().then((doc ) =>  {
    if (doc.exists) {
        console.log(" this is my article", doc.data());
     
        }  else {
            console.log("No such document!");
        } */



         /*componentDidMount (){
      db.collection('article')
        .get()
        .then (snapshot => {
            console.log(snapshot)
           /* const article =[]
            snapshot.forEach( doc => {
                const data =doc.data()
                article.push (data)
            })
            this.setState ({article :article})*
            
            
   /*firebase.database().ref("article").once('value')
    .then((snapshot) => console.log(snapshot.val()));*/