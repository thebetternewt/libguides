import React, { Component } from 'react';
import axios from 'axios';

import SearchItems from '../searchItems.js/SearchItems';
import Spinner from '../common/Spinner';
import ContentContainer from '../common/ContentContainer';

class GuideSearch extends Component {
  state = {
    searchString: '',
    searchResults: [],
    loading: false
  };

  // Handle input value changes
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      loading: true
    });
    this.search(this.state.searchString);
  };

  // Handle search hitting libguide API with axios
  search = searchString => {
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
    let searchItems;
    if (this.state.loading) {
      searchItems = <Spinner />;
    } else {
      searchItems = <SearchItems searchResults={this.state.searchResults} />;
    }

    return (
      <ContentContainer>
        <input
          type="text"
          name="searchString"
          placeholder="Type to begin searching for guides"
          value={this.state.searchString}
          onChange={this.handleChange}
        />
        {searchItems}
      </ContentContainer>
    );
  }
}

export default GuideSearch;
