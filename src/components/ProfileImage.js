import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import gravatarUrl from 'gravatar-url';

import userPlaceHolder from '../images/user.png';

const Image = styled.div`
  align-self: center;
  background-color: #777;
  background-image: url(${props => props.imgUrl});
  background-size: cover;
  border-radius: 999px;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
`;

const ProfileImage = props => {
  let profileImageUrl = userPlaceHolder;
  if (props.user) {
    profileImageUrl = gravatarUrl(props.user.email, {
      size: props.size * 2,
      default: 'retro'
    });
  }

  return <Image size={props.size} imgUrl={profileImageUrl} />;
};

ProfileImage.propTypes = {
  size: PropTypes.number,
  user: PropTypes.shape().isRequired
};

ProfileImage.defaultProps = {
  size: 200,
  user: null
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(ProfileImage);
