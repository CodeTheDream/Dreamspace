import React from 'react';
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";

const AdminSignInPage = (props) => {
  let firstAdminUser = props.firebase;
  console.log('firstAdminUser ', firstAdminUser);
  return(
    <div className = 'admin-signIn-container'>
      <form>
        <label>
          Enter email:
          <input type = 'text' value = 'value'/>
          Enter password:
          <input type = 'password' />
        </label>
          <input type = 'submit' value = 'Submit'/>
      </form>
    </div>
  )
}
export default AdminSignInPage;


