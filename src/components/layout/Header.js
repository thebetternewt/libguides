import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavigationItems from './NavigationItems';

const Header = props => (
  <HeaderWrapper>
    <Container>
      <Link to="/">
        <Brand>
          <i className="fal fa-book fa-2x" />
          <span>LibGuides</span>
        </Brand>
      </Link>
      <nav>
        <NavigationItems />
      </nav>
      <MenuButton className="menu-button" onClick={props.toggleSideDrawer}>
        <i className="fal fa-bars fa-3x" />
      </MenuButton>
    </Container>
  </HeaderWrapper>
);

Header.propTypes = {
  toggleSideDrawer: PropTypes.func.isRequired
};

export default Header;

const HeaderWrapper = styled.div`
  background-color: #333;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.5);
  display: flex;
  height: 60px;
  justify-content: center;
  left: 0;
  max-width: 100vw;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  nav {
    display: none;
  }

  @media (min-width: 800px) {
    .menu-button {
      display: none;
    }

    nav {
      display: block;
      height: 100%;
    }
  }
`;

const Container = styled.div`
  align-items: center;
  color: #fff;
  display: flex;

  height: 100%;
  justify-content: space-between;
  max-width: 1200px;
  padding: 0 15px;
  width: 100%;
`;

const Brand = styled.div`
  align-items: center;
  display: flex;
  height: 80%;

  span {
    font-family: 'Roboto Slab', 'sans-serif';
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-left: 15px;
  }

  @media (min-width: 800px) {
    span {
      font-size: 24px;
    }
  }
`;

const MenuButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
`;
