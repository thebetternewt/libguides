import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import NavigationItem from './NavigationItem';
import ProfileImage from '../ProfileImage';

const NavigationItems = props => (
  <Nav>
    <NavigationItem link="/guides">Search Guides</NavigationItem>
    {props.isAuthenticated ? (
      <Fragment>
        <NavigationItem link="/dashboard">
          <ProfileLink>
            <ProfileImage size={36} />
            <span>My Dashboard</span>
          </ProfileLink>
        </NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Fragment>
    ) : (
      <NavigationItem link="/login">Log In</NavigationItem>
    )}
  </Nav>
);

NavigationItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(NavigationItems));

const Nav = styled.ul`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 800px) {
    align-items: center;
    flex-direction: row;
    height: 100%;
  }
`;

const ProfileLink = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 6px;
  }
`;
