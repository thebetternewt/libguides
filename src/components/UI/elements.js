import styled from 'styled-components';
import { COOL_WHITE, PRIMARY_BLUE } from './colors';

export const Box = styled.div`
  background-color: ${COOL_WHITE};
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  margin: ${props => props.margin || '15px 0'};
  padding: ${props => props.padding || '15px'};
  width: 100%;
`;

export const Button = styled.button`
  color: #fff;
  background-color: ${PRIMARY_BLUE};
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 0;
  font-family: 'Montserrat', helvetica, arial, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.8em 1.5em;
  text-transform: uppercase;
  transition: all 100ms ease-out;
  cursor: pointer;

  &:hover, &:active {
    color: ${PRIMARY_BLUE};
    background-color: #fff;
    outline 3px solid ${PRIMARY_BLUE};
  }
`;

export const Separator = styled.div`
  align-self: center;
  background-color: #111;
  border-radius: 3px;
  height: 2px;
  width: 90%;
`;

// TEXT

export const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  margin-top: 1em;
  align-self: center;
`;
