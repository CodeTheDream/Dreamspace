import React from "react";
//import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Dashboard from "./containers/Dashboard";
import * as ROUTES from "./constants/routes.js";
import About from "./containers/About";
import IndividualView from "./containers/IndividualView";
import Account from "./containers/Account";
import SignUp from "./components/SignUp";
import SignInPage from "./components/SignIn";
import HomePage from "./containers/HomePage";
import ProjectDashBoard from "./containers/ProjectDashBoard";
import { withAuthentication } from "./components/Session";
import FrontPage from "./components/FontPage";
//import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <Switch>
          <Route exact path={ROUTES.ARTICLES} component={Dashboard} />
          <Route exact path={ROUTES.ABOUT} component={About} />
          <Route exact path={ROUTES.PROJECT} component={ProjectDashBoard} />
          {/* <Route exact path={ROUTES.FRONTPAGE} component={FrontPage} />*/}
          <Route exact path={ROUTES.ACCOUNT} component={Account} />
          <Route exact path={ROUTES.SIGNUP} component={SignUp} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.HOME} component={HomePage} />
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
