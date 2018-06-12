import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

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
        {guide.description && (
          <p dangerouslySetInnerHTML={{ __html: guide.description }} />
        )}
        <small>Last updated on {guide.updated}</small>
        <h4>Pages</h4>
        <Separator />
        <PageList>
          {guide.pages &&
            guide.pages.map(page => (
              <li key={page.id}>
                <a href={page.url} target="_blank">
                  <PageLink>
                    {page.name} <i className="fal fa-chevron-circle-right" />
                  </PageLink>
                </a>
              </li>
            ))}
        </PageList>
        <FavButton data-tip="Save this guide!" data-for="favorite">
          <i className="fas fa-star fa-3x" />
        </FavButton>
        <ReactTooltip id="favorite" type="success" effect="solid" />
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
  overflow: scroll;

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
  h4 {
    font-weight: 300;
    font-size: 1.8rem;
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

const FavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 999px;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);

  background-color: orange;
  color: yellow;
  position: absolute;
  top: 10px;
  left: 10px;
  height: 60px;
  width: 60px;

  cursor: pointer;
  transition: all 200ms linear;

  i {
    display: block;
    animation: star-spin infinite 10s linear;

    @keyframes star-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  &:hover,
  &:focus {
    transform: scale(1.1);
    box-shadow: 3px 5px 12px rgba(0, 0, 0, 0.3);
  }
`;

const PageList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PageLink = styled.button`
  font-size: 1.5rem;
  display: block;
  outline: none;
  border: none;
  color: #fff;
  background-color: #660000;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 10px 0;
  width: 100%;
`;

const Separator = styled.div`
  align-self: center;
  background-color: #111;
  border-radius: 3px;
  height: 2px;
  width: 90%;
`;
