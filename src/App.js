import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

// import PrivateRoute from './components/common/PrivateRoute';
import Layout from './components/layout/Layout';

import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import GuideSearch from './components/guideSearch/GuideSearch';

// Auth
import { setCurrentUser, logoutUser } from './store/actions/authActions';
import { firebase } from './firebase';

class App extends Component {
  // Observe auth state
  componentDidMount = () => {
    const { history } = this.props;

    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        // Set current user if user logged in
        this.props.setCurrentUser(user);
      } else {
        // Logout user
        this.props.logoutUser();
        if (history.location.pathname !== '/') {
          history.push('/');
        }
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Layout>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to LibGuides</h1>
          </header>

          {/* <Route path="/" render={HomePage} /> */}
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/guides" component={GuideSearch} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { setCurrentUser, logoutUser }
  )(App)
);
