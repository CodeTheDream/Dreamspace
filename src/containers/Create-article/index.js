import React, { Component } from "react";
import axios from "axios";
import "./create_article.css";
const options = ["Select Tag", "React", "Ruby", "Javascript"];
class Createarticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      value: "Select an Option",
      urlBody: ""
    };
  }

  onUrlChange = e => {
    this.setState({
      urlBody: e.target.value
    });
  };

  onTagChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  onTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  onBodyChange = e => {
    this.setState({
      description: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      description: this.state.description,
      value: this.state.value,
      urlBody: this.state.urlBody
    };
    axios
      .post("https://jsonplaceholder.typicode.com/posts", data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  /* resetForm = () => {
    this.setState({
      title: "",
      description: "",
      value: "",
      urlBody:""
    });
  };*/
  resetform = () => {
    window.location.reload(false);
  };
  render() {
    return (
      <div className=" Datapost-form">
        <div className="grid-container">
          <div className="subgrid-container1">Create a new post</div>

          <div className="subgrid-container2">Today Top Growing Taps</div>
          <div className="form-area">
            <div className="subgrid-container3">
              <ul >
                <li>
                  <form className="subgrid-post" onSubmit={this.handleSubmit}>
                    <ul >
                     
                      <li >
                        <label>Tags</label>

                        <select
                          value={this.state.value}
                          onChange={this.onTagChange}
                        >
                          {options.map(option => {
                            return (
                              <option value={option} key={option}>
                                {option}
                              </option>
                            );
                          })}
                        </select>
                      </li>
                   
                      <li >
                        <input
                          placeholder="Title"
                          value={this.state.title}
                          onChange={this.onTitleChange}
                          required
                        />
                      </li>
                      <li >
                        <textarea
                          placeholder="URl"
                          value={this.state.urlBody}
                          onChange={this.onUrlChange}
                        />
                      </li>
                      <li >
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
                          <button type="submit"> Post</button>
                        </li>
                     
                    </ul>
                  </form>
                </li>
              </ul>
            </div>
          </div>
          <div>4</div>
        </div>
      </div>
    );
  }
}

export default Createarticle;

/*import React,{Component} from 'react'
 class Createarticle extends Component {
     render(){
         return(
             <div>post an article</div>
         )
     }
 }
 export default Createarticle;*/
