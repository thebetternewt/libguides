import React from 'react';
import styled from 'styled-components';

const Tag = styled.span`
  align-items: center;
  background-color: ${props => props.bgColor};
  border-radius: 50px;
  /* box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3); */
  display: inline-flex;
  height: 30px;
  margin: 3px 5px 3px 0;
  padding: 0 15px;
`;

export default props => <Tag bgColor={props.bgColor}>{props.text}</Tag>;
