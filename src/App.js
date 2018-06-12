import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

import PrivateRoute from './components/common/PrivateRoute';
import SearchItems from './components/searchItems.js/SearchItems';
import Spinner from './components/common/Spinner';

// Auth
import { setCurrentUser, logoutUser } from './store/actions/authActions';
import { firebase } from './firebase';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';

class App extends Component {
  state = {
    searchString: '',
    searchResults: [],
    loading: false
  };

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

  // Handle input value changes
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      loading: true
    });
    this.search(this.state.searchString);
  };

  // Handle search hitting libguide API with axios
  search = searchString => {
    axios
      .get(
        `https://lgapi-us.libapps.com/1.1/guides?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6&search_terms=${
          this.state.searchString
        }&status=1&sort_by=count_hit&expand=owner`
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          searchResults: res.data,
          loading: false
        });
      })
      .catch(err => console.log(err));

    console.log();
  };

  render() {
    let searchItems;
    if (this.state.loading) {
      searchItems = <Spinner />;
    } else {
      searchItems = <SearchItems searchResults={this.state.searchResults} />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to LibGuides</h1>
        </header>
        <input
          type="text"
          name="searchString"
          placeholder="Type to begin searching for guides"
          value={this.state.searchString}
          onChange={this.handleChange}
        />
        {searchItems}

        {/* <Route path="/" render={HomePage} /> */}
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
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
