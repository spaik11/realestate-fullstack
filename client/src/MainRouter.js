import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const Landing = React.lazy(() => import("./components/Landing/Landing"));
const Login = React.lazy(() => import("./components/Login/Login"));
const Register = React.lazy(() => import("./components/Register/Register"));

export default class MainRouter extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Landing} />
        </Switch>
        <Footer />
      </>
    );
  }
}
