import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';
import SideDrawer from './SideDrawer';
import Footer from './Footer';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  };

  state = {
    sideDrawerOpen: false,
  };

  toggleSideDrawer = () => {
    this.setState(prevState => ({ sideDrawerOpen: !prevState.sideDrawerOpen }));
  };

  render() {
    return (
      <LayoutContainer>
        <Header toggleSideDrawer={this.toggleSideDrawer} />
        <SideDrawer
          toggle={this.toggleSideDrawer}
          open={this.state.sideDrawerOpen}
        />
        <LayoutBody>{this.props.children}</LayoutBody>
        <Footer />
      </LayoutContainer>
    );
  }
}

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LayoutBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 60px;
`;
