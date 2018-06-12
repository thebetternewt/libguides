import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser } from '../../store/actions/authActions';

class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser();
  }

  render() {
    return <Redirect to="/" />;
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default connect(null, { logoutUser })(Logout);
