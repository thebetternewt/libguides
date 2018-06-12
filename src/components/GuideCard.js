import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Thumb } from './searchItems.js/SearchItem';
import bookImg from '../images/notebooks-square.jpg';

const GuideCard = props => {
  const { guide } = props;

  // TODO: pages

  return (
    <Backdrop onClick={() => props.dismiss()}>
      <Card>
        <CardIcon>
          <img src={bookImg} alt="book icon" />
        </CardIcon>
        <h3>{guide.name}</h3>
        <p>{guide.description}</p>
        <small>Last updated on {guide.updated}</small>
      </Card>
    </Backdrop>
  );
};

GuideCard.propTypes = {
  guide: PropTypes.shape().isRequired,
  dismiss: PropTypes.func.isRequired
};

export default GuideCard;

const Card = styled.div`
  border-radius: 5px 5px 0 0;
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 500px;
  max-width: 90vw;
  background-color: #eee;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  color: #111;
  position: fixed;
  bottom: 0;
  left: 50vw;
  z-index: 200;

  padding: 70px 20px 15px;

  transform: translateX(-50%);

  h3 {
    font-weight: 300;
    font-size: 2rem;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 1rem;
  }
  p {
    font-family: 'Raleway', Helvetica, Arial, sans-serif;
    text-align: center;
  }
  small {
    text-align: center;
    opacity: 0.6;
  }
`;

const CardIcon = styled(Thumb)`
  position: absolute;
  top: 0;
  left: 50%;
  height: 150px;
  width: 150px;

  transform: translate(-50%, -50%);
`;

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;
