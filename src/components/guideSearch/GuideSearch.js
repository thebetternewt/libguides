import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import validate from 'validate.js';

import SearchItems from '../searchItems.js/SearchItems';
import Spinner from '../common/Spinner';
import ContentContainer from '../common/ContentContainer';
import GuideCard from '../GuideCard';

class GuideSearch extends Component {
  state = {
    searchString: '',
    searchResults: [],
    searched: false,
    loading: false,
    selectedGuide: null
  };

  // Handle input value changes
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      loading: true,
      searched: true
    });
    this.search(this.state.searchString);
  };

  handleSelectGuide = guideId => {
    console.log(guideId);

    let selectedGuide = null;
    if (guideId) {
      [selectedGuide] = this.state.searchResults.filter(
        item => item.id === guideId
      );
    }

    this.setState({ selectedGuide });
  };

  // Handle search hitting libguide API with axios
  search = () => {
    axios
      .get(
        `https://lgapi-us.libapps.com/1.1/guides?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6&search_terms=${
          this.state.searchString
        }&status=1&sort_by=count_hit&expand=owner`
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          searchResults: res.data,
          loading: false
        });
      })
      .catch(err => console.log(err));

    console.log();
  };

  render() {
    const { loading, searched, searchResults, selectedGuide } = this.state;

    let searchItems;
    if (loading) {
      searchItems = <Spinner />;
    } else if (validate.isEmpty(searchResults)) {
      searchItems = (
        <NoneFound>
          {searched ? 'No guides found' : 'Begin typing to search'}
        </NoneFound>
      );
    } else {
      searchItems = (
        <SearchItems
          searchResults={searchResults}
          selectGuide={this.handleSelectGuide}
        />
      );
    }

    return (
      <ContentContainer>
        <SearchInput
          type="text"
          name="searchString"
          placeholder="Type to search for guides..."
          value={this.state.searchString}
          onChange={this.handleChange}
        />
        {searchItems}
        {selectedGuide && (
          <GuideCard guide={selectedGuide} dismiss={this.handleSelectGuide} />
        )}
      </ContentContainer>
    );
  }
}

export default GuideSearch;

const SearchInput = styled.input`
  outline: none;
  align-self: center;
  font-size: 1.8rem;
  width: 80%;
  padding: 15px;
  border: 2px solid lightblue;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 2rem auto;

  &::placeholder {
    opacity: 0.5;
  }
`;

const NoneFound = styled.h3`
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  opacity: 0.6;
  text-transform: uppercase;
  margin-top: 5rem;
`;