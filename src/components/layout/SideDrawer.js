import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavigationItems from './NavigationItems';

const SideDrawer = props => (
  <Fragment>
    {props.open && <Backdrop onClick={props.toggle} />}
    <Container open={props.open} onClick={props.toggle}>
      <NavigationItems />
    </Container>
  </Fragment>
);

SideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default SideDrawer;

const Container = styled.div`
  background-color: #cfcfcf;
  position: fixed;
  width: auto;
  max-width: 70%;
  min-width: 210px;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 200;
  background-color: #fff;
  padding: 0;
  box-sizing: border-box;
  transition: transform 300ms ease-out;
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(100%)')};

  @media (min-width: 800px) {
    display: none;
  }
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);

  @media (min-width: 800px) {
    display: none;
  }
`;
