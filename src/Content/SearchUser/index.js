import React, { Component } from 'react';
import { Segment, Input, List, Button } from 'semantic-ui-react';

export default class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      results: [],
      message: "",
      loading: false, 
      requestFromUser: [],
      friendList: []
    }
  }
  componentDidMount() {
    this.fetchRequests();
    this.fetchFriends();
  }
  fetchRequests = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'api/v1/users/requests';
      const res = await fetch(url, {
        credentials: 'include'
      });
      const json = await res.json();
      const requestFromUser = json.data.requests_from.map((request) => {
        return request.user_to.id
      })
      this.setState({ requestFromUser })
      return json;
    } catch (err) {
      console.error(err)
    }
  }
  fetchFriends = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'api/v1/users/friends';
      const res = await fetch(url, {
        credentials: 'include'
      });
      const json = await res.json();
      const friendList = json.data.map(user => user.id)
      this.setState({ friendList })
    } catch (err) {
      console.error(err)
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
  sendRequest = async (id) => {
    try {
      const url = process.env.REACT_APP_API_URL + 'api/v1/users/send/' + id;
      const res = await fetch(url, {
        credentials: 'include',
        method: 'POST'
      });
      const json = await res.json();
      const { requestFromUser } = this.state;
      requestFromUser.push(id);
      await this.setState({ requestFromUser });
      return json;
    } catch (err) {
      console.log(err)
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
    const results = this.state.results.map((result, key) => {
      return (
        <List.Item key={key}>
          <List.Icon name='user' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header>{result.username}</List.Header>
            <List.Description>{result.email}</List.Description>
            { 
              this.state.friendList.includes(result.id)
              ||
              (
              this.state.requestFromUser.includes(result.id)
              ?
              <Button content="Pending" active={false} floated='right'/>
              :
              <Button content="Add Friend" floated="right" onClick={ () => this.sendRequest(result.id) }/>
              )
            }
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
          fluid
        />
        <List>{results}</List>
      </Segment>
    )
  }
}