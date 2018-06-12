import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import userPlaceHolder from '../images/user.png';

const Image = styled.div`
  align-self: center;
  background-color: #777;
  background-image: url(${props => props.imgUrl});
  background-size: cover;
  border-radius: 999px;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  height: ${props => props.size};
  width: ${props => props.size};
`;

const ProfileImage = props => <Image size={props.size} imgUrl={props.imgUrl} />;

ProfileImage.propTypes = {
  size: PropTypes.string,
  imgUrl: PropTypes.string
};

ProfileImage.defaultProps = {
  size: '200px',
  imgUrl: userPlaceHolder
};

export default ProfileImage;
