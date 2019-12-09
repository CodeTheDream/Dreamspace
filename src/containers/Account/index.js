import React from "react";
import { withAuthorization } from "../../components/Session";
import { PasswordForgetForm } from "../../components/PasswordForget";
import PasswordChangeForm from "../../components/PasswordChange";

const AccountPage = ({ authUser }) => (
    console.log(authUser),
  <div className="view-container account-page">
    <h2>Account: {authUser}</h2>
    {/* <PasswordForgetForm /> */}
    <PasswordChangeForm />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
