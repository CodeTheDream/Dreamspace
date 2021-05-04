import React, { Component } from "react";
import './'
// import FormWrapper from "react-form-wrapper";
import { compose } from "recompose";
import { Link, withRouter } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../../components/Session";
import { withFirebase } from "../../components/Firebase";
import { messaging } from "firebase";
import styled from 'styled-components';
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



const Button = styled.button`
  cursor: pointer;
  background: black;
  font-size: 16px;
  border-radius: 25px;
  color: white;
  ${'' /* border: 2px solid black; */}
  margin: 1em 1em;
  margin-left: 10px;
  margin-right: 20px;
  padding: 1em 1em;
  transition: 0.5s all ease-out;
 
  &:hover {
    background-color: white;
    color: black;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  alignItems: flex-start;
  justify-content: center;
  form {
    margin: 2rem 1rem; 
    padding: 1.5px;
  }
.fieldset {
    width: 100%; 
    margin: 2rem 0; 
    position: relative; 
    display: flex; 
    flexWrap: wrap; 
    alignItems: center; 
    justifyContent: flex-start; 
} 
`
const span = styled.div`
  width: fit-content;
  margin: 0;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  border-top-left-radius: 0.25em;
  border-bottom-left-radius: 0.25em; 
  border-top-right-radius: 0;
  border-bottom-right-radius: 0; 
  border: 0.0625rem solid #ced4da; 
  font-size: 1rem; 
  font-weight: 400; 
  line-height: 1.5; 
  color: #495057; 
  text-align: center; 
  background-color: e9ecef;
  } 
`
const i = styled.div`
  color: black;
  padding: 5px;
  
  }
`
const InputWrapper = styled.div`
    flexGrow: 1; 
    minHeight: 2rem; 
    padding: 0.375rem 0.75rem;                         
    display: block; 
    border-top-left-radius: .75em; 
    border-bottom-left-radius: 2em;
    border-top-right-radius: 0.25em;
    border-bottom-right-radius: 0.25em; 
    border: 0.0625rem solid #ced4da; 
    border-left: 0, fontSize: 1rem;
    fontWeight: 100; 
    lineHeight: 1.75; 
    color: #495057;
  }
`; 
// const hr = styled.div`
//   border-color: black;
//   }
// `;

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
      inputTag: "",
      calculatedvote: 0,
      showTitle: false
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
        calculatedvote: this.state.calculatedvote,

        timeCreated: moment().format(` MMMM DD, YYYY  --  hh:mm:ss A`),
      })
      .then((docRef) => {
        this.setState({ confirmmessage: docRef.id });
        console.log("Document written with ID: ", this.state.confirmmessage);
        alert(
          "you've successfully created an article with ID: " +
            this.state.confirmmessage
        );
      }); 
    if (newtag.name !== options.name) {
      this.props.firebase.tags().add({
        name: this.state.value,
      });
    }

    this.setState({
      value: "",
      title: "",
      url: "",
      description: "",
      downvotes: 0,
      upvotes: 0,
      calculatedvote: 0,
      showPopup: false,
      options: "",
    });
  };
  handleClick = (e) => {
    this.setState({showTitle:true})
   
  };
  handleChange = (event) => {
    const value = event.target.value
    this.setState({
      ...this.state,
      [event.target.name]: value
    })

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
                        {/* <ul>
                          <li>
                            <form
                              onSubmit={(e) => this.handleSubmit(e, authUser)}
                            > */}
                        {/* <ul>
                                <li>
                                  <input
                                    type="text"
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={this.onTitleChange}
                                    required
                                  />
                                  
                                </li>
                                <li> */}
                        {/* <select
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
                                  </select> */}
                        {/* <div className="autosuggest_list">
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
                              </ul> */}

                        {/* <label htmlFor="title">
                                Title
                                <input
                                  type="text"
                                  name="title"
                                  id="title"
                                  value={this.state.title}
                                  onChange={this.handleChange}
                                  autoComplete="title"
                                />
                              </label>

                              <br />
                              <label htmlFor="url">
                                URL
                                <input
                                  type="text"
                                  name="url"
                                  id="url"
                                  value={this.state.url}
                                  onChange={this.handleChange}
                                  autoComplete="url"
                                />
                              </label>
                              <label htmlFor="description">
                                Description
                                <textarea
                                  col={30}
                                  rows={10}
                                  name="description"
                                  value={this.state.description}
                                  onChange={this.handleChange}
                                  required
                                />
                              </label>

                              <br />

                              <input type="submit" value="Submit" />
                            </form>
                          </li>
                        </ul>
                  <div>
                <div> */}
                        <FormWrapper
                          onSubmit={(e) => this.handleSubmit(e, authUser)}
                        >
                          <form action="get">
                            <div className="fieldset">
                              <div className="InputWrapper">
                                <span className="icon">
                                  <i className="fas fa-portrait fa-1x" />
                                </span>
                                <input
                                  className="col-6 form-control"
                                  type="text"
                                  name="title"
                                  id="title"
                                  value={this.state.title}
                                  onChange={this.handleChange}
                                  autoComplete="title"
                                  required
                                ></input>
                              </div>
                            </div>
                            <div className="fieldset">
                              <div className="InputWrapper">
                                <span className="icon"></span>
                                <i className="fas fa-envelope fa-1x" />
                                <input
                                  className="col-6 form-control"
                                  type="text"
                                  name="url"
                                  id="url"
                                  value={this.state.url}
                                  onChange={this.handleChange}
                                  autoComplete="url"
                                ></input>
                              </div>
                            </div>
                            <div className="fieldset">
                              <div className="InputWrapper">
                                <Button type="submit" value="submit">Submit</Button>
                              </div>
                            </div>
                          </form>
                        </FormWrapper>

                        {/* <Link to={'/projects'}>
                     <Button> Profile Page </Button>
                    </Link> */}
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



