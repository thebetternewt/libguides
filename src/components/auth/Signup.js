import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ContentContainer from '../common/ContentContainer';
import Spinner from '../common/Spinner';

import { registerUser } from '../../store/actions/authActions';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
  };

  // Add error to state
  getDerivedStateFromProps = (nextProps, prevState) => {
    this.setState({ error: nextProps.error });
  };

  // Clear errors when unmounting

  // Handle input value changes
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handle register form submission
  handleSubmit = e => {
    e.preventDefault();

    const { name, email, passwordOne, passwordTwo } = this.state;

    // Check if passwords match before registering user
    if (passwordOne !== passwordTwo) {
      this.setState({ error: { message: 'Passwords must match' } });
    } else {
      this.props.registerUser(name, email, passwordOne);
    }
  };

  render() {
    // Reroute if authenticated
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.redirectPath} />;
    }

    if (this.props.loading) {
      return <Spinner />;
    }

    const { name, email, passwordOne, passwordTwo, error } = this.state;

    return (
      <ContentContainer>
        <Helmet>
          <title>Sign Up | The Marketplace</title>
        </Helmet>
        <Card>
          <h2>Sign Up</h2>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          <form onSubmit={this.handleSubmit}>
            <TextInput
              type="text"
              name="name"
              placeholder="name"
              onChange={this.handleChange}
              value={name}
            />
            <TextInput
              type="email"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
              value={email}
            />
            <TextInput
              type="password"
              name="passwordOne"
              placeholder="password"
              onChange={this.handleChange}
              value={passwordOne}
            />
            <TextInput
              type="password"
              name="passwordTwo"
              placeholder="confirm password"
              onChange={this.handleChange}
              value={passwordTwo}
            />
            <SubmitButton>Sign up</SubmitButton>
          </form>
          <p>
            Already have an account?{' '}
            <Link to="/login">
              <span>Log in</span>
            </Link>
          </p>
        </Card>
      </ContentContainer>
    );
  }
}

Signup.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape(),
  isAuthenticated: PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired,
  redirectPath: PropTypes.string.isRequired
};

Signup.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.user !== null,
  redirectPath: state.auth.authRedirectPath,
  error: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Signup);

const TextInput = styled.input`
  display: block;
  width: 100%;
  max-width: 90vw;
  border: none;
  border-radius: 99px;
  font-size: 1rem;

  margin: 10px auto;
  padding: 10px 15px;
`;

const SubmitButton = styled.button`
  display: block;
  background-color: #660000;
  color: #fff;
  border: none;
  border-radius: 99px;
  font-size: 1.2rem;
  padding: 10px 0;
  margin: 15px auto 1rem;
  width: 100%;
  cursor: pointer;

  &:disabled {
    background-color: gray;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
  text-align: center;
`;

const Card = styled.div`
  align-self: center;
  width: 300px;
  max-width: 90%;
  background-color: #e1eaf2;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  margin: 20% auto;
  padding: 15px;

  h2 {
    font-family: 'Montserrat', 'Helvetica', Arial, sans-serif;
    margin: 0.9em 0 0.9em;
    text-align: center;
    text-transform: uppercase;
  }

  span {
    color: #43a7ff;
    text-decoration: underline;
  }
`;
