import React from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
class SampleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      aboutYourSelf: "",
      interest: "",
      education: "",
      user: null,
			loading: true,
    };
  }
componentDidMount = () => {
    const userInfo = this.props.children
    //const autherId = authUser.uid
   console.log("curentUserId", userInfo);
    this.props.firebase

      .user(userInfo)
      .get()
      .then((doc) => {
        // console.log("userdata", doc.data())
        let user = doc.data();
        this.setState({
          username: user.username,
          email: user.email,
          aboutYourSelf: user.aboutYourSelf,
          interest: user.interest,
          education: user.education,
          
        });
      });
  };

  //componentDidUpdate( prevState) {
  // if (prevState.authUser !== this.state) {
  //  console.log('user state has changed.');
  // this.username(this.state.username),
  //  this.email(this.state.email)
  //  }
  //  }
  onSubmit = (e, authUser) => {
    e.preventDefault();
    const autherId = authUser.uid;

    this.props.firebase.user(autherId).update({
      username: this.state.username,
      email: this.state.email,
      aboutYourSelf: this.state.aboutYourSelf,
      education: this.state.education,
      interest: this.state.interest,
    });
  };
  onUserNameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onAboutYoureSelfChange = (e) => {
    this.setState({
      aboutYourSelf: e.target.value,
    });
  };
  onInterstChange = (e) => {
    this.setState({
      interest: e.target.value,
    });
  };
  onEducationChange = (e) => {
    this.setState({
      education: e.target.value,
    });
  };

  render() {
    const { username, email, aboutYourSelf, education, interest } = this.state;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="devedit-form">
            <form onSubmit={(e) => this.onSubmit(e, authUser)}>
              <fieldset>
                <legend>
                  <span className="number">1</span> Candidate Info
                </legend>
                <input
                  type="text"
                  name="field1"
                  value={username}
                  placeholder={username}
                  onChange={(e) => this.onUserNameChange(e)}
                />
                <input
                  type="email"
                  name="field2"
                  value={email}
                  placeholder={email}
                  onChange={this.onEmailChange}
                />
                <textarea
                  name="field3"
                  value={aboutYourSelf}
                  placeholder={aboutYourSelf}
                  onChange={this.onAboutYoureSelfChange}
                ></textarea>
                <label for="job">Interests:</label>
                <select
                  id="job"
                  name="field4"
                  value={interest}
                  placeholder={interest}
                  onChange={this.onInterstChange}
                >
                  <optgroup label="Indoors">
                    <option value="fishkeeping">Fishkeeping</option>
                    <option value="reading">Reading</option>
                    <option value="boxing">Boxing</option>
                    <option value="debate">Debate</option>
                    <option value="gaming">Gaming</option>
                    <option value="snooker">Snooker</option>
                    <option value="other_indoor">Other</option>
                  </optgroup>
                  <optgroup label="Outdoors">
                    <option value="football">Football</option>
                    <option value="swimming">Swimming</option>
                    <option value="fishing">Fishing</option>
                    <option value="climbing">Climbing</option>
                    <option value="cycling">Cycling</option>
                    <option value="other_outdoor">Other</option>
                  </optgroup>
                </select>
              </fieldset>
              <fieldset>
                <legend>
                  <span className="number">2</span> Additional Info
                </legend>
                <textarea
                  name="field3"
                  value={education}
                  placeholder={education}
                  onChange={this.onEducationChange}
                ></textarea>
              </fieldset>
              {/* <button className="button-main" type="submit" value="Apply" >Apply</button>
          <button className="button-secondary" type="submit" value="Apply" >Apply</button>*/}
              <button className="button-tertiary" type="submit" value="Apply">
                Apply
              </button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(SampleForm);
