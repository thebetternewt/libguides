import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  align-items: ${props => props.align || 'center'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 800px;
  padding: 0 15px;
  width: 100%;
  z-index: 2;
`;

const ContentContainer = props => (
  <Container align={props.align}>{props.children}</Container>
);

export default ContentContainer;
