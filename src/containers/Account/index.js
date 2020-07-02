import React from "react";
import { withAuthorization,AuthUserContext } from "../../components/Session";
//import { PasswordForgetForm } from "../../components/PasswordForget";

import PasswordChangeForm from "../../components/PasswordChange";
import SampleForm from "../../components/SampleForm";
const condition = authUser => !!authUser;

class Account extends React.Component {
  constructor(){
    super()
  }
render(){
  return(
    <AuthUserContext.Consumer>
        {(authUser) => (

          <div >
          <h2 >Account</h2>
          {/* <PasswordForgetForm /> */}
          <SampleForm>{authUser.uid}</SampleForm>
          
          <PasswordChangeForm />
        </div>
        )}
        </AuthUserContext.Consumer>
  )
}

}

export default withAuthorization(condition)(Account);


