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
  constructor(){
    super();
    this.state = {
      username:"",
      email:"",
      aboutYourself:"",
      interest:"",
      education:"",

    }
  }

onSubmit=(e,authUser)=>{
  e.preventDefault();
  const autherId = authUser.uid
  console.log("curentUserId",autherId)
  this.props.firebase
    .user(autherId)
    .update({
      username:this.state.username
           
    })
    // .onSnapshot(user => {
    //   console.log('user', user.data())
    //   // user.update({
    //   //       username:this.state.username
           
    //   //     })

    // })
}
onChange= e => {
this.setState({username:e.target.value})
}

  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
      <div  className="view-container-signup">
        <form className="devedit-form" onSubmit={e => this.onSubmit(e,authUser)}>
          <fieldset>
            <legend>
              <span className="number">1</span> Candidate Info
            </legend>
            <input type="text" name="field1" value={this.state.username} placeholder={authUser.username}onChange={e=>this.onChange(e)} />
            <input type="email" name="field2" placeholder={authUser.email}/>
            <textarea name="field3" placeholder="About yourself"></textarea>
            <label for="job">Interests:</label>
            <select id="job" name="field4">
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
            <textarea name="field3" placeholder="About Your School"></textarea>
          </fieldset>
        { /* <button className="button-main" type="submit" value="Apply" >Apply</button>
          <button className="button-secondary" type="submit" value="Apply" >Apply</button>*/}
          <button className="button-tertiary" type="submit" value="Apply" >Apply</button>

        </form>
      </div>
         )}
         </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(SampleForm);
