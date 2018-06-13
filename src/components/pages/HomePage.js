import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContentContainer from '../common/ContentContainer';
import { Button } from '../UI';
import Hero from '../common/Hero';
import map from '../../images/map.jpeg';

const HomePage = props => {
  return (
    <Hero backgroundImage={map}>
      <ContentContainer>
        <h1>Welcome to the libGuide Portal</h1>
      </ContentContainer>
      {props.isAuthenticated ? (
        <Link to="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      ) : (
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
      )}
    </Hero>
  );
};

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(HomePage);
