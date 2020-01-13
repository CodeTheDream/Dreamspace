// import React from 'react'
// import AddComment from './AddComment';
// import Comment from './Comment';
// import { withRouter } from 'react-router-dom';
// import { compose } from 'recompose';
// import { withFirebase } from '../Firebase';
// import individualView from "../IndividualView/index.js";



// const Comments = ({comments}) => {

//     return (
//         <div>
//                   {this.state.comments && this.state.comments.map(comments => {
//                        return (
//                        <div className="commentgrid">
//                         <div className="commentstyle" >
//                            <article  >
//                              <p> {comments.articleId} </p>
//                              <p>{comments.comment}</p>
//                              <p>{comments.limmit}</p>
//                              <p>{comments.timeCreated}</p>
//                           </article>
//                          </div>
//                        </div>
//                        )
//                    }
//                    )}
//         </div>
//     )
// }


// export default  compose(withFirebase, withRouter)(Comments);