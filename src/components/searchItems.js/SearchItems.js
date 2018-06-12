import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SearchItem from './SearchItem';

const SearchItems = props => (
  <SearchList>
    {props.searchResults.map(item => (
      <SearchItem key={item.id} data={item} selectGuide={props.selectGuide} />
    ))}
  </SearchList>
);

SearchItems.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectGuide: PropTypes.func.isRequired
};

export default SearchItems;

const SearchList = styled.ul`
  list-style: none;
  padding: 0;
`;
