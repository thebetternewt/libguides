import React from 'react';
import PropTypes from 'prop-types';
import SearchItem from './SearchItem';

const SearchItems = props => (
  <ul>
    {props.searchResults.map(item => <SearchItem key={item.id} data={item} />)}
  </ul>
);

SearchItems.propTypes = {
  searchResults: PropTypes.arrayOf(SearchItem).isRequired
};

export default SearchItems;
