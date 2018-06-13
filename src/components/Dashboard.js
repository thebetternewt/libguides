import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { validate as v } from 'validate.js';
import ReactTooltip from 'react-tooltip';

import { Box, H1, Separator } from './UI';

import ContentContainer from './common/ContentContainer';
import Spinner from './common/Spinner';
import { getSavedGuides } from '../store/actions/accountActions';

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getSavedGuides();
  };

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    const { user, savedGuides } = this.props;
    const firstName = user.name && user.name.split(' ')[0];
    const savedGuideLinks = savedGuides.map(guide => (
      <li key={guide.id}>
        <GuideLink href={guide.url} target="_blank">
          {guide.name} <i className="fal fa-chevron-circle-right" />
        </GuideLink>
        <DeleteButton data-tip="Delete saved guide" data-for="delete">
          <i className="far fa-times" />
        </DeleteButton>
        <ReactTooltip id="delete" type="warning" />
      </li>
    ));

    return (
      <ContentContainer>
        <Box>
          <H1>Welcome, {firstName}!</H1>
          <h3>My Guides</h3>
          <Separator />
          {v.isEmpty(savedGuideLinks) ? (
            <h4>
              You don't have any guides yet.{' '}
              <Link to="/guides">Go find some!</Link>
            </h4>
          ) : (
            <GuideLinks>{savedGuideLinks}</GuideLinks>
          )}
        </Box>
      </ContentContainer>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.shape().isRequired,
  savedGuides: PropTypes.arrayOf(PropTypes.shape()),
  loading: PropTypes.bool.isRequired,
  getSavedGuides: PropTypes.func.isRequired
};

Dashboard.defaultProps = {
  savedGuides: []
};

const mapStateToProps = state => ({
  user: state.auth.user,
  savedGuides: state.account.savedGuides,
  loading: state.auth.loading || state.account.loading
});

export default connect(
  mapStateToProps,
  { getSavedGuides }
)(Dashboard);

// Styled Components
const GuideLinks = styled.ul`
  display: block;
  list-style: none;
  padding: 0;
  overflow: scroll;
  width: 80%;

  li {
    display: flex;
  }
`;

const GuideLink = styled.a`
  font-size: 1.5rem;
  display: block;
  outline: none;
  border: none;
  color: #fff;
  background-color: #660000;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 10px 20px 10px 10px;
  width: 100%;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: 2px solid #660000;
    background-color: #fff;
    color: #660000;
  }

  i {
    margin-left: 10px;
  }
`;

const DeleteButton = styled.button`
  font-size: 1.5rem;
  display: block;
  outline: none;
  border: none;
  border-radius: 3px;
  color: #fff;
  background-color: red;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  height: 50px;
  width: 50px;
  margin: 10px 20px 10px 10px;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: 2px solid red;
    background-color: #fff;
    color: red;
  }
`;