import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  background-color: #333;
  box-shadow: 0 3px 12px rgba(100, 100, 100, 0.7);
  display: flex;
  justify-content: center;
  max-width: 100vw;
  padding: 20px 0;
  width: 100%;

  img {
    width: 100px;
  }
`;

const Container = styled.div`
  align-items: center;
  color: #fff;
  display: flex;
  height: 100%;
  justify-content: center;
  max-width: 1200px;
  padding: 0 15px;
  text-align: center;
  width: 100%;
`;

const Footer = () => (
  <FooterWrapper>
    <Container>
      <Link to="/">
        {/* <img src={logo} alt="gcp-logo" /> */}
        <p>
          <i className="fal fa-copyright" /> {new Date().getFullYear()}{' '}
          LibGuides
        </p>
        <p style={{ fontSize: '0.7em', opacity: 0.6 }}>Created by Chris Eady</p>
      </Link>
    </Container>
  </FooterWrapper>
);

export default Footer;
