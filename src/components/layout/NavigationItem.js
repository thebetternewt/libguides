import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const NavigationItem = props => (
  <NavItem>
    <NavigationLink to={props.link}>{props.children}</NavigationLink>
  </NavItem>
);

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavigationItem;

const NavItem = styled.li`
  height: 100%;
  margin: 0;
  width: 100%;

  @media (min-width: 800px) {
    width: auto;
  }
`;

const NavigationLink = styled(NavLink)`
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: flex-start;
  padding: 0 30px 0 30px;
  position: relative;
  width: 100%;

  &:after {
    background-color: #43a7ff;
    bottom: 50%;
    left: 0;
    height: 0;
    width: 10px;
    content: '';
    display: block;
    position: absolute;
    transition: height 200ms ease-out;
    transform: translateY(50%);
  }
  &.active {
    background-color: #eee;
    &:after {
      height: 100%;
    }
  }

  @media (min-width: 800px) {
    height: 100%;
    justify-content: center;
    padding: 0 15px;
    width: auto;

    &:after {
      background-color: #43a7ff;
      bottom: 0;
      content: '';
      display: block;
      height: 5px;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      transition: width 200ms ease-out;
      width: 0;
    }
    &.active {
      background-color: transparent;
      &:after {
        height: 5px;
        width: 100%;
      }
    }
  }
`;
