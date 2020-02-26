import React from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { AuthUserContext } from "../Session";
import "./searchbar.scss";
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
          <div>
            <div>
              <input
                className="mainSearch"
                type="text"
                placeholder="search..."
                onChange={this.props.handleInput}
                onClick={this.togglePopup}
              />
              <i className="fa fa-search"/>
            </div>
            {this.state.showPopup ? (
              <div className="card-search">
                <p>search by tags</p>
                <p>search by title</p>
              </div>
            ) : null}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default compose(withFirebase)(SearchBar);
