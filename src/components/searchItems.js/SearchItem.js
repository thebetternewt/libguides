import React from 'react';
import PropTypes from 'prop-types';

const SearchItem = props => {
  const { id, name } = props.data;
  return (
    <li>
      {id}: {name}
    </li>
  );
};

SearchItem.propTypes = {
  data: PropTypes.shape().isRequired
};

export default SearchItem;
