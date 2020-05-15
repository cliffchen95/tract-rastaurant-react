import React, { Component } from 'react';
import { Segment, Input, List } from 'semantic-ui-react';

export default class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      results: [],
      message: "",
      loading: false
    }
  }

  handleChange = (e) => {
    const query = e.target.value;
    if (!query) {
      this.setState({ query, results: [], message: ""})
    } else {
      this.setState({ query, message: "", loading: true }, () => {
        this.fetchSearchResult(query)
      });
    }
  }

  fetchSearchResult = async (query) => {
    try {
      const url = process.env.REACT_APP_API_URL + "api/v1/users/search?query=" + query;
      const res = await fetch(url, {
        credentials: 'include'
      });
      const json = await res.json();
      this.setState({ results: json.data, loading: false })
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
    console.log('this is in search')
    console.log(this.state)
    const results = this.state.results.map((result, key) => {
      return (
        <List.Item key={key}>
          <List.Icon name='user' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header>{result.username}</List.Header>
            <List.Description>{result.email}</List.Description>
          </List.Content>
        </List.Item>
      )
    })
    return(
      <Segment>
        <Input
          placeholder='Searching...'
          onChange={this.handleChange}
          value={this.state.query}
          loading={this.state.loading}
        />
        <List>{results}</List>
      </Segment>
    )
  }
}