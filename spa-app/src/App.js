import React from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Auth from "./components/Auth/Auth";
import Header from "./components/Header/Header";
import SearchBlock from "./components/SearchBlock/SearchBlock";
import Favorites from "./components/Favorites/Favorites"
import SingleFavorite from "./components/SingleFavorite/SingleFavorite";

import { autoLogin } from "./redux/actions/auth";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {
  componentDidMount() {
    this.props.autoLogin();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path='/favorites/:id' component={SingleFavorite} />
          <Route path='/favorites' component={Favorites} />
          <Route path="/" exact component={SearchBlock} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Header isLoggedIn={this.props.isLoggedIn} />
        <main>{routes}</main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: !!state.auth.token
    // isLoggedIn: true
  };
}
function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
