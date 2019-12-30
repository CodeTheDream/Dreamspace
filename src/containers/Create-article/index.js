import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import "./create_article.css";
const options = ["Select Tag", "React", "Ruby", "Javascript"];
class Dialog extends React.Component {
  render() {
    return (
      <div className="dialogstyle ">
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
    );
  }
}
class Createarticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      tags: "Select an Option",
      url: "",
      loading: false,
      messages: []
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  onUrlChange = e => {
    this.setState({
      ur: e.target.value
    });
  };
  onTagChange = e => {
    this.setState({
      tags: e.target.value
    });
  };
  onTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };
  onDescriptionChange = e => {
    this.setState({
      description: e.target.value
    });
  };
  /*componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.messages().on("value", snapshot => {
      const messageObject = snapshot.val();
      if (messageObject) {
        const messageList = Object.keys(messageObject).map(key => ({
          ...messageObject[key],
          uid: key
        }));
        this.setState({
          messages: messageList,
          loading: false
        });
      } else {
        this.setState({ messages: null, loading: false });
      }
    });
  }
  componentWillUnmount() {
    this.props.firebase.messages().off();
  }*/
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      description: this.state.description,
      tags: this.state.tags,
      url: this.state.url
    };

    this.props.firebase.articles().add({ data });
    console.log("DATA",data);
    this.setState({
      tags: "",
      title: "",
      url: "",
      description: ""
    });
  };
  render() {
    const { title, tags, url, description} = this.state;
    return (
      <div>
        <input
          placeholder="create_article"
          onClick={this.togglePopup.bind(this)}
        />
        {this.state.showPopup ? (
          <Dialog closePopup={this.togglePopup.bind(this)}>
            <div className=" Datapost-form">
              <div className="grid-container">
                <div className="subgrid-container1">Create a new post</div>
                <div className="form-area">
                  <div className="subgrid-container3">
                    <ul>
                      <li>
                     
                        <form
                          id="postdataform"
                          className="subgrid-post"
                          onSubmit={this.handleSubmit}
                        >
                          <ul>
                            <li>
                              <label>Tags</label>
                              <select
                                id="tags"
                                /*value={this.state.tags}*/
                                value={tags}
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
                            <li>
                              <input
                                id="title"
                                placeholder="Title"
                               /* value={this.state.title}*/
                               value={title}
                                onChange={this.onTitleChange}
                                required
                              />
                            </li>
                            <li>
                              <textarea
                                id="url"
                                placeholder="URl"
                                /*value={this.state.url}*/
                                value={url}
                                onChange={this.onUrlChange}
                              />
                            </li>
                            <li>
                              <textarea
                                col={30}
                                rows={10}
                                id="description"
                                placeholder="Description"
                               /* value={this.state.description}*/
                               value={description}
                                onChange={this.onDescriptionChange}
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
              </div>
            </div>
          </Dialog>
        ) : null}
      </div>
    );
  }
}
export default compose(withFirebase)(Createarticle);