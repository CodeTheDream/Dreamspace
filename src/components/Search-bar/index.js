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
            <div className="input-icons">
              <i className="fa fa-search"></i>
              <input
                className="input-field"
                type="search"
                placeholder="search..."
                onChange={this.props.handleInput}
                onClick={this.togglePopup}
              />
            </div>
           
            {this.state.showPopup ? (
               <Popover closePopup={this.togglePopup}>
             <div >
            <p></p>
             </div>
          </Popover> ) : null}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default compose(withFirebase)(SearchBar);
/* <div className="popover__wrapper">
              <a href="#">
                <h2 >Hover:me</h2>
              </a>
              <div className="popover__content">
                <p className="popover__message">
                  Joseph Francis "Joey" Tribbiani, Jr.
                </p>
                <img
                  alt="Joseph Francis Joey Tribbiani, Jr."
                  src="https://media.giphy.com/media/11SIBu3s72Co8w/giphy.gif"
                />
              </div>
            </div>*/
