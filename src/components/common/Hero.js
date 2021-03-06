import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Hero = props => (
  <HeroWrapper backgroundImage={props.backgroundImage}>
    <Filter />
    <ContentContainer>{props.children}</ContentContainer>
  </HeroWrapper>
);

Hero.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Hero;

const HeroWrapper = styled.div`
  background-image: url('${props => props.backgroundImage}');
  background-position: center bottom;
  background-size: cover;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  min-height: 300px;
  position: relative;
  text-align: center;
  width: 100vw;

  h1 {
    color: #fff;
    font-family: 'Roboto Slab', 'sans-serif';
    font-size: 2.8rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }


`;

const Filter = styled.div`
  /* background-color: rgba(70, 129, 181, 0.7); */
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const ContentContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  width: 100%;
  z-index: 2;
`;
