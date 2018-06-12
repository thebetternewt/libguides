import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Button } from '../UI/elements';

import bookImg from '../../images/notebooks-square.jpg';

const SearchItem = props => {
  const { id, name, description } = props.data;
  return (
    <li>
      <Book onClick={() => props.selectGuide(id)}>
        <Thumb>
          <img src={bookImg} alt="book icon" />
        </Thumb>
        <Content>
          <h4>{name}</h4>
          <p dangerouslySetInnerHTML={{ __html: description }} />
          <Button>Info</Button>
        </Content>
      </Book>
    </li>
  );
};

SearchItem.propTypes = {
  data: PropTypes.shape().isRequired,
  selectGuide: PropTypes.func.isRequired
};

export default SearchItem;

const Book = styled(Box)`
  display: flex;
  margin: 10px auto;
  align-items: center;
  cursor: pointer;
`;

export const Thumb = styled.div`
  background-color: #777;
  color: #fff;
  border-radius: 999px;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  position: relative;
  height: 80px;
  width: 80px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-radius: 999px;
  }
`;

const Content = styled.div`
  flex-grow: 1;
`;
