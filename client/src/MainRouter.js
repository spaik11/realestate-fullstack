import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Consumer } from "./components/Context/UserContext";

import "./MainRouter.css";

const MapPage = React.lazy(() => import("./components/MapPage/MapPage"));
const Landing = React.lazy(() => import("./components/Landing/Landing"));
const Login = React.lazy(() => import("./components/Login/Login"));
const Register = React.lazy(() => import("./components/Register/Register"));
const UserProfile = React.lazy(() =>
  import("./components/UserProfile/UserProfile")
);

export default class MainRouter extends Component {
  render() {
    return (
      <Consumer>
        {({ dispatch }) => {
          return (
            <div id="app">
              <Header dispatch={dispatch} />
              <div id="middle">
                <Switch>
                  <Route path="/login" exact component={Login} />
                  <Route path="/register" exact component={Register} />
                  <Route path="/user-profile" exact component={UserProfile} />
                  <Route path="/map" exact component={MapPage} />
                  <Route path="/" exact component={Landing} />
                </Switch>
              </div>
              <Footer />
            </div>
          );
        }}
      </Consumer>
    );
  }
}
