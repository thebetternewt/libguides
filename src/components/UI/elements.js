import styled from 'styled-components';
import { COOL_WHITE, MAROON } from './colors';

export const Box = styled.div`
  /* background-color: ${COOL_WHITE}; */
  background-color: #fff;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  margin: ${props => props.margin || '15px 0'};
  padding: ${props => props.padding || '15px'};
  width: 100%;
`;

export const Button = styled.button`
  color: #fff;
  background-color: ${MAROON};
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
    color: ${MAROON};
    background-color: #fff;
    outline 3px solid ${MAROON};
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
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  font-size: 2.5rem;
  font-weight: 300;
  margin: 2rem auto;
  align-self: center;
`;
export const H2 = styled.h2`
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 300;
  margin: 1rem auto;
  align-self: center;
`;
export const H3 = styled.h3`
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  font-size: 1.9rem;
  font-weight: 300;
  margin: 1rem auto;
  align-self: center;
`;
export const H4 = styled.h4`
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: 300;
  margin: 1rem auto;
  align-self: center;
`;
