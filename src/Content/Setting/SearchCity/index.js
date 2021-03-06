import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class SearchCity extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      results: [],
      message: "",
      value: ""
    }
  }

  handleChange = (e) => {
    const query = e.target.value;
    if (!query) {
      this.setState({ query, results: [], message: ""})
    } else {
      this.setState({ query, message: "" }, () => {
        this.fetchSearchResult(query)
      });
    }
  }

  fetchSearchResult = async (query) => {
    try {
      const url = "https://developers.zomato.com/api/v2.1/cities?q=" + query;
      const res = await fetch(url, {
        headers: {
          "user-key": process.env.REACT_APP_ZOMATO_API_KEY
        }
      });
      const json = await res.json();
      const results = json.location_suggestions.map((city) => {
        return { key: city.id, text: city.name, value: city.id }
      })
      this.setState({ results })
    } catch (err) {
      console.log(err)
    }
  }
  onChange = (e, { value }) => {
    this.props.changeCity(value)
    this.setState({ value })
  }
  render() {
    const { value } = this.state;
    return(
      <Dropdown
        search
        selection 
        loading={this.state.loading}
        placeholder='Searching...'
        onSearchChange={this.handleChange}
        options={this.state.results}
        value={value}
        onChange={this.onChange}
      />
    )
  }
}