import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import validate from 'validate.js';
import Helmet from 'react-helmet';

import { H1 } from '../UI';
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

  // Handle input value changes and init search on keystroke
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      loading: true,
      searched: true
    });
    this.search(this.state.searchString);
  };

  // Handle displaying  card for selected guide
  handleSelectGuide = guideId => {
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
    const searchUrl = `https://lgapi-us.libapps.com/1.1/guides?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6&search_terms=${
      this.state.searchString
    }&status=1&sort_by=count_hit&expand=pages`;

    axios
      .get(searchUrl)
      .then(res => {
        // Filter results by status = published
        const searchResults = res.data.filter(item => item.status === '1');
        this.setState({
          searchResults,
          loading: false
        });
      })
      .catch(err => console.log(err));
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
        <Helmet>
          <meta charSet="utf-8" />
          <title>Search | LibGuide Portal</title>
          <meta
            name="description"
            content="Search for guides within the MSU Library system."
          />
        </Helmet>
        <H1>Find a Guide</H1>
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
  border: 3px solid #660000;
  border-radius: 0;
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
  margin-top: 3rem;
`;
