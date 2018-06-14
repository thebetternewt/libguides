import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { Thumb } from '../searchItems.js/SearchItem';
import bookImg from '../../images/notebooks-square.jpg';
import {
  saveGuide,
  deleteSavedGuide
} from '../../store/actions/accountActions';
import { Separator } from '../UI/elements';

const GuideCard = props => {
  const { guide, savedGuides, isAuthenticated } = props;

  const saved = savedGuides.filter(g => g.id === guide.id).length > 0;

  let favButton = (
    <FavButton
      data-tip="Login to save this guide"
      data-for="favorite"
      style={{ opacity: '0.3' }}
    >
      <i className="far fa-star fa-3x" />
    </FavButton>
  );

  if (isAuthenticated) {
    favButton = (
      <FavButton
        data-tip={saved ? "You've saved this guide!" : 'Save this guide!'}
        data-for={saved ? 'unfavorite' : 'favorite'}
        onClick={
          saved
            ? () => props.deleteSavedGuide(guide.id)
            : () => props.saveGuide(guide.id, guide.name, guide.url)
        }
      >
        {saved ? (
          <i className="fas fa-star fa-3x" style={{ color: '#fff200' }} />
        ) : (
          <i className="far fa-star fa-3x" />
        )}
      </FavButton>
    );
  }

  return (
    <Fragment>
      <Backdrop onClick={() => props.dismiss()} />
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
                <a href={page.url} target="_blank" rel="noopener noreferrer">
                  <PageLink>
                    {page.name} <i className="fal fa-chevron-circle-right" />
                  </PageLink>
                </a>
              </li>
            ))}
        </PageList>

        {favButton}
        <ReactTooltip id="favorite" type="success" effect="solid" />

        <CloseButton onClick={() => props.dismiss()}>
          <i className="fal fa-times fa-3x" />
        </CloseButton>
      </Card>
    </Fragment>
  );
};

GuideCard.propTypes = {
  guide: PropTypes.shape().isRequired,
  dismiss: PropTypes.func.isRequired,
  saveGuide: PropTypes.func.isRequired,
  deleteSavedGuide: PropTypes.func.isRequired,
  savedGuides: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  savedGuides: state.account.savedGuides,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { saveGuide, deleteSavedGuide }
)(GuideCard);

// Styled Components

const Card = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 75vh;
  width: 500px;
  max-width: 90vw;
  background-color: #eee;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.8);
  color: #111;
  position: fixed;
  bottom: 15px;
  left: 50vw;
  z-index: 200;
  padding: 70px 20px 15px;
  transform: translateX(-50%);

  animation: slide-in-bottom forwards 400ms cubic-bezier(0, 0, 0, 1.4);

  @keyframes slide-in-bottom {
    from {
      bottom: -100vh;
    }
    to {
      bottom: 15px;
    }
  }

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
    font-size: 1.5rem;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 0.8rem;
  }
  p {
    font-family: 'Raleway', Helvetica, Arial, sans-serif;
    text-align: center;
  }
  small {
    text-align: center;
    opacity: 0.6;
  }

  @media (max-width: 800px) {
    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    h4 {
      font-size: 1.1rem;
    }
    p {
      font-size: 0.7rem;
    }
  }
`;

const CardIcon = styled(Thumb)`
  box-shadow: 3px 5px 12px rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 50%;
  height: 150px;
  width: 150px;

  transform: translate(-50%, -50%);

  @media (max-width: 800px) {
    width: 80px;
    height: 80px;
  }
`;

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`;

const FavButton = styled.button`
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 999px;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);

  background-color: #660000;
  color: #fff;
  position: absolute;
  top: 10px;
  left: 10px;
  height: 60px;
  width: 60px;

  cursor: pointer;
  transition: all 200ms linear;

  &:hover,
  &:focus {
    transform: scale(1.1);
    box-shadow: 3px 5px 12px rgba(0, 0, 0, 0.3);
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  position: absolute;
  top: 10px;
  right: 10px;
  height: 60px;
  width: 60px;
  cursor: pointer;
`;

const PageList = styled.ul`
  display: block;
  list-style: none;
  padding: 0;
  overflow: scroll;
  margin-top: 0;
`;

const PageLink = styled.button`
  font-size: 1.2rem;
  display: block;
  outline: none;
  border: none;
  color: #fff;
  background-color: #660000;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  cursor: pointer;

  @media (max-width: 800px) {
    font-size: 0.9rem;
  }
`;
