import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import history from "utilities/history.js";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Components from "views/Components/Components.js";
import Portion from "views/Portion";
// import LandingPage from "views/LandingPage/LandingPage.js";
// import ProfilePage from "views/ProfilePage/ProfilePage.js";
// import LoginPage from "views/LoginPage/LoginPage.js";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      {/* <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} /> */}
      <Route path="/portion" component={Portion} />
      <Route path="/" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
