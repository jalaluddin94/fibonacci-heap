import React from "react";
import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import history from "utilities/history.js";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import configStore from './redux/store';
import Components from "views/Components/Components.js";
import Portion from "views/Portion";
// import LandingPage from "views/LandingPage/LandingPage.js";
// import ProfilePage from "views/ProfilePage/ProfilePage.js";
// import LoginPage from "views/LoginPage/LoginPage.js";

const initialState = {};
const store = configStore(initialState, history);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {/* <Route path="/landing-page" component={LandingPage} />
          <Route path="/profile-page" component={ProfilePage} />
          <Route path="/login-page" component={LoginPage} />  */}
          <Route path="/portion" component={Portion} />
          <Route path="/" component={Components} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
