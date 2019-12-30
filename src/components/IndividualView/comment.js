import React from 'react';
import './ViewArticle.scss';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

class Comments extends React.Component {
 constructor(props){
     super(props);
     this.state = {
         createdAt:"",
         comments :[]
     };
 }

/* componentWillMount(){

    // create reference to messages in firebase database 
   // let commentsRef = this.props.firebase.ref('comments').orderByKey().limitToLast(100);


this.unsubscribe = this.props.firebase
                   .comments()
                   .orderBy('createdAt')
                   .limit(50)
                   
       //retrieving data from firebase at the time of event and set state
    this.unsubscribe.on('value' , snapshot => {
        
        let comment ={text: snapshot.val() , id: snapshot.key};  // retrieve the data in the snapshot with the val() method 
        this.setState({comments: [comment].concat(this.state.comments)});  //update react state when message added at firebase
    })

 }*/
/*
   addMessage=(e) =>  {
       e.preventDefault();  //prevent submit from reloading the page 
        // Send the new message to firebase
      this.firebase.database().ref('messages').push(this.inputEl.value);
       this.inputEl.value ='';  // clear the input 
   }*/
    render() {
        return (
            <div className="commentgrid">
                      <div className="commentstyle">
                          What are your thoughts?
                      </div>
                     <button className="btncomment" 
                              type="button" 
                             
                             >
                                   Comment
                       </button>
                 </div>
        );
    };
}
/*
onSubmit = {this.addMessage}
ref={el => this.inputEl  }*/


export default compose(withFirebase, withRouter)(Comments);



/*writeUserData(userId, name, email, imageUrl) =>  {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }*/
 //let commentsRef =this.props.match.params.comments;