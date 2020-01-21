import React from 'react';
import './ViewArticle.scss';





class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            timeCreated:"",
            comments:null,
            limited:70,
            showAll:false
            
        };
    }

    showMore =() => this.setState({showAll:true});
    showLess =() => this.setState({showAll:false});


    render(){
        const { comments, limited, timeCreated} = this.props
         const {showAll}= this.state
    if ( comments.comment && comments.comment.length <= limited ) {
        console.log( "IF", comments.comment , comments.comment.length)
           return (
            <div  className="commentDisplay">
             <p className="styleDisplay"  >
                  {timeCreated} <br/>
                  {comments.comment} </p>
             </div>
            ); 
       } else {
        console.log( "ELSE", comments.comment , comments.comment.length)

   if (showAll) {
       return  (
        <div  className="commentDisplay">
         <p className="styleDisplay" > 
         {timeCreated} <br/>
         {comments.comment}
        <a onClick ={this.showLess}> Read less</a>
        </p>
       </div>
        )
        }
    }


             const toShow = comments.comment.slice(0,limited) + "...";
             if(toShow) {
             return <div  className="commentDisplay">
             <p className="styleDisplay" >
             {timeCreated} <br />      
             {toShow}
             <a onClick={this.showMore}> Read More </a>
             </p>
            </div>
            }

      }       

}
export default Comment;
   