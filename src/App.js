import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import PrivateRoute from './components/common/PrivateRoute';
import Layout from './components/layout/Layout';

import HomePage from './components/pages/HomePage';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Dashboard from './components/pages/Dashboard';
import GuideSearch from './components/guideSearch/GuideSearch';

import './App.css';

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
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home | LibGuide Portal</title>
          <meta
            name="description"
            content="A portal application for users to save access to favorite guides through the MSU Library system."
          />
        </Helmet>
        <Layout>
          <Route exact path="/" component={HomePage} />
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route path="/guides" component={GuideSearch} />
          </Switch>

          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape().isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { setCurrentUser, logoutUser }
  )(App)
);
