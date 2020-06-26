import React, { Component } from "react";
import { compose } from "recompose";
import Autosuggest from "react-autosuggest";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../../components/Session";
import { withFirebase } from "../../components/Firebase";
import { messaging } from "firebase";
//const options = [ "React", "Ruby", "Javascript"];
export const options = [];
//export const options = [{name:"React"}, {name:"Ruby"}, {name:"Javascript"}];
const moment = require("moment");

  
  const getSuggestions = (value) => {
  //const{tags1}=this.props
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    :options.filter(
        (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};


const getSuggestionValue = (suggestion) => suggestion.name;

const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

class Dialog extends React.Component {
  render() {
    return (
      <div className="modal-wrapper-postarticle">
        <div className="dialogstyle devedit-form">
          <button
            className=" dialogCloseButonStayle"
            onClick={this.props.closePopup}
          >
            X
          </button>
          <div className="diglog_inner">
            <h4>{this.props.children}</h4>
          </div>
        </div>
      </div>
    );
  }
}
class Createarticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      tags: "",
      url: "",
      downvotes: 0,
      upvotes: 0,
      timeCreated: "",
      userName: "",
      suggestions: [],
     
      value: "",
      inputTag:"",
      calculatedvote:0,
    

    };
  }

  componentDidMount = () => {
    this.unsubscribe = this.props.firebase.tags().onSnapshot((snapshot) => {
      const totalTags = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
       // totalTags.push(data);
        options.push(data)
      });
console.log("tags from api call",options)
      //this.setState({ tags1: totalTags },()=>console.log("Tags1",totalTags));
    });
    
  };
  onChange = (e, { newValue }) => {

    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };
  togglePopup = ()=>{
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };

  onUrlChange = (e) => {
    this.setState({
      url: e.target.value,
    });
  };
  // onTagChange = (e) => {
  //   console.log("Tag on change",e.target.value)
  //   this.setState({
      
  //     tags: e.target.value,
  //   });
  //   getSuggestions.push(this.state.tags)
  // };
  onTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  onBodyChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  
  handleSubmit = (e, authUser) => {
    const newtag1=this.state.value;
    const newtag=[{name:"newtag1"}]
    // console.log("username on article submit",authUser.username)
     e.preventDefault();
     this.props.firebase
       .articles()
       .add({
         userId: authUser.uid,
        // userName:this.state.userName,
         title: this.state.title,
        
         description: this.state.description,
         tags: this.state.value,
         url: this.state.url,
         downvotes: this.state.downvotes,
           upvotes: this.state.upvotes,
         calculatedvote:this.state.calculatedvote,
        
         timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A`)
       })
       .then(docRef => {
         
         this.setState({confirmmessage:docRef.id})
         console.log("Document written with ID: ", this.state.confirmmessage);
      alert("you've successfully created an article with ID: " + this.state.confirmmessage);
       
       });
       if(newtag.name !== options.name){
         
            this.props.firebase
            .tags()
            .add({
              name:this.state.value
            })
          };
        
     this.setState({
       value: "",
       title: "",
       url: "",
       description: "",
       downvotes: 0,
         upvotes: 0,
       calculatedvote:0,
       showPopup:false,
       options:""
     });
     
   }
  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Tags",
      value,
      onChange: this.onChange,
    };

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            <button className="button-secondary1" onClick={this.togglePopup}>
              Post New Article
            </button>
            {this.state.showPopup ? (
              <Dialog closePopup={this.togglePopup}>
                <div>
                  <div>
                    {/* <div style={{fontSize:"legend"}}>Create new post</div>*/}
                    <legend className="devedit-form-legend1">
                      Create New Post
                    </legend>
                    <div>
                      <div>
                        <ul>
                          <li>
                            <form
                              onSubmit={(e) => this.handleSubmit(e, authUser)}
                            >
                              <ul>
                                <li>
                                  <input
                                    type="text"
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={this.onTitleChange}
                                    required
                                  />
                                  
                                </li>
                                <li>
                                  {/*<select
                                    value={this.state.tags}
                                    onChange={this.onTagChange}
                                  >
                                    {options.map(option => {
                                      return (
                                        <option value={option} key={option}>
                                          {option}
                                        </option>
                                      );
                                    })}
                                  </select>*/}
                                  <div className="autosuggest_list">
                                  <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={
                                      this.onSuggestionsFetchRequested
                                    }
                                    onSuggestionsClearRequested={
                                      this.onSuggestionsClearRequested
                                    }
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps}
                                  />
                                  </div>
                                </li>
                                <li>
                                
                                </li>
                                <li>
                                  <input
                                    type="text"
                                    placeholder="URl"
                                    value={this.state.url}
                                    onChange={this.onUrlChange}
                                    required
                                  />
                                </li>
                                <li>
                                  <textarea
                                    col={30}
                                    rows={10}
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={this.onBodyChange}
                                    required
                                  />
                                </li>
                                <li>
                                  <button
                                    className="button-tertiary"
                                    type="submit"
                                    onClick={this.closeSelf}
                                  >
                                    {" "}
                                    Post
                                  </button>
                                </li>
                              </ul>
                            </form>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog>
            ) : null}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default compose(withFirebase)(Createarticle);
// import React, { Component } from "react";
// import { compose } from "recompose";
// import {
//   AuthUserContext,
//   withAuthorization,
//   withEmailVerification
// } from "../../components/Session";
// import { withFirebase } from "../../components/Firebase";
// import { messaging } from "firebase";
// const options = ["Select Tag", "React", "Ruby", "Javascript"];
// const moment = require("moment");

// class Dialog extends React.Component {
//   render() {
//     return (
//       <div className="modal-wrapper-postarticle">
//       <div className="dialogstyle devedit-form">
//         <button
//           className=" dialogCloseButonStayle"
//           onClick={this.props.closePopup}
//         >
//           X
//         </button>
//         <div className="diglog_inner">
//           <h4>{this.props.children}</h4>
//         </div>
//       </div>
//       </div>
//     );
//   }
// }
// class Createarticle extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "",
//       description: "",
//       tags: "Select an Option",
//       url: "",
//       downvotes: 0,
//       upvotes: 0,
//       //authorID: "",
//       timeCreated: "",
//       userName:"",
//       calculatedvote:0
//     };
    
//   }
  
//   togglePopup=()=> {
   
//     this.setState({
//       showPopup: !this.state.showPopup
      
//     });
    
//   }

//   onUrlChange = e => {
//     this.setState({
//       url: e.target.value
//     });
//   };
//   onTagChange = e => {
//     this.setState({
//       tags: e.target.value
//     });
//   };
//   onTitleChange = e => {
//     this.setState({
//       title: e.target.value
//     });
//   };
//   onBodyChange = e => {
//     this.setState({
//       description: e.target.value
//     });
//   };
  
//   handleSubmit = (e, authUser) => {
//    // console.log("username on article submit",authUser.username)
//     e.preventDefault();
//     this.props.firebase
//       .articles()
//       .add({
//         userId: authUser.uid,
//        // userName:this.state.userName,
//         title: this.state.title,
//         description: this.state.description,
//         tags: this.state.tags,
//         url: this.state.url,
//         downvotes: this.state.downvotes,
//           upvotes: this.state.upvotes,
//         calculatedvote:this.state.calculatedvote,
//         timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A`)
//       })
//       .then(docRef => {
        
//         this.setState({confirmmessage:docRef.id})
//         console.log("Document written with ID: ", this.state.confirmmessage);
//      alert("you've successfully created an article with ID: " + this.state.confirmmessage);
      
//       });
//     this.setState({
//       tags: "",
//       title: "",
//       url: "",
//       description: "",
//       downvotes: 0,
//         upvotes: 0,
//       calculatedvote:0,
//       showPopup:false
//     });
    
//   }
//   render() {
//     return (
//       <AuthUserContext.Consumer>
//         {authUser => (

//           <div>
//             <button className="button-secondary1"

//               onClick={this.togglePopup}>
//               Post New Article
//               </button>  
//             {this.state.showPopup ? (
//               <Dialog closePopup={this.togglePopup}>
                


//                 <div >
//                   <div >
//                    {/* <div style={{fontSize:"legend"}}>Create new post</div>*/} 
//                     <legend className="devedit-form-legend1">Create New Post</legend>
//                     <div >
//                       <div >

//                         <ul>
//                           <li>
//                             <form
                              
//                               onSubmit={e => this.handleSubmit(e, authUser)}
                             
//                             >
//                               <ul>
//                               <li>
//                                   <input
//                                     type="text"
//                                     placeholder="Title"
//                                     value={this.state.title}
//                                     onChange={this.onTitleChange}
//                                     required
//                                   />
//                                 </li>
//                                 <li>
//                                   <select
//                                     value={this.state.tags}
//                                     onChange={this.onTagChange}
//                                   >
//                                     {options.map(option => {
//                                       return (
//                                         <option value={option} key={option}>
//                                           {option}
//                                         </option>
//                                       );
//                                     })}
//                                   </select>
//                                 </li>

//                                 <li>
//                                 <input
//                                     type="text"
//                                     placeholder="URl"
//                                     value={this.state.url}
//                                     onChange={this.onUrlChange}
//                                     required
//                                   />
//                                 </li>
//                                 <li>
//                                   <textarea
//                                     col={30}
//                                     rows={10}
//                                     placeholder="Description"
//                                     value={this.state.description}
//                                     onChange={this.onBodyChange}
//                                     required
                                    
//                                   />
                                
//                                 </li>
//                                 <li>
                                  
//                                   <button className="button-tertiary" type="submit" onClick={this.closeSelf}> Post</button>
//                                 </li>

//                               </ul>
//                             </form>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Dialog>
//             ) : null}
//           </div>
//         )}
//       </AuthUserContext.Consumer>
//     );
//   }
// }

// export default compose(withFirebase)(Createarticle);
