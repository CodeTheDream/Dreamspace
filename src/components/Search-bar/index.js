import React from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
//import { withRouter } from "react-router-dom";
import { AuthUserContext } from "../Session";
//import "./searchbar.scss";

class Popover extends React.Component {
  render() {
    return (
      <div className="modal-wrapper-postarticle1">
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
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    };
  }
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="mainsearch">
            <div className="popover__wrapper">
              <div className="input-icons">
                <i className="fa fa-search"></i>
                <input
                  className="input-field"
                  type="search"
                  placeholder="search..."
                  onChange={this.props.handleInput}
            
                />
              </div>
              <div className="popover__content">
                <div className="popover__message">
                  Search by 
                  <p>Title</p>
                  <p>Tags</p>
                  <p>Description</p>
                </div>
              </div>
            </div>
           
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default compose(withFirebase)(SearchBar);
