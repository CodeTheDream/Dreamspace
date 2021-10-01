import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Articles from "./containers/Articles";
import * as ROUTES from "./constants/routes.js";
import LinkGithub from "./containers/LinkGithub";
import About from "./containers/About";
import IndividualView from "./containers/IndividualView";
import Account from "./containers/Account";
import SignUp from "./components/SignUp";
import TeamMember from "./containers/Directory/TeamMember";
import SignInPage from "./components/SignIn";
import HomePage from "./containers/HomePage";
import Image from "./components/Map";
import ProjectDashBoard from "./containers/ProjectDashBoard";
import { withAuthentication } from "./components/Session";
import  password from "./components/PasswordForget";
//import FrontPage from "./components/FontPage";
//import Sidebar from "./components/Sidebar";
//import UserCard from './components/UserCard'
import Directory from "./containers/Directory";
import Userprofile from './components/Userprofile';

// import World from "./components/World";
import Profile from "./containers/Directory/profile";
// import Underconstruct from "./containers/Directory/underconstruct";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <Switch>
          <Route exact path={ROUTES.ARTICLES} component={Articles} />
          <Route exact path={ROUTES.ABOUT} component={About} />
          <Route exact path={ROUTES.PROJECT} component={ProjectDashBoard} />
          <Route exact path={ROUTES.ACCOUNT} component={Account} />
          <Route exact path={ROUTES.SIGNUP} component={SignUp} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.PASSWORD_FORGET} component={password} />
          <Route exact path={ROUTES.TeamMember} component={TeamMember} />
          <Route exact path={ROUTES.DIRECTORY} component={Directory} />

          {/* <Route exact path={ROUTES.USERCARD} component={UserCard} /> */}
          {/* <Route exact path={ROUTES.UNDERCONSTRUCT} component={Underconstruct} /> */}
          <Route exact path={ROUTES.LINKGITHUB} component={LinkGithub} />
          <Route path={ROUTES.PROFILE} component={Profile} />
        

          <Route
            exact
            path={ROUTES.INDIVIDUAL_VIEW}
            component={IndividualView}
          />
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default withAuthentication(App);
