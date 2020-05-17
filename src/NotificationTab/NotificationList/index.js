import React, { Component } from 'react';
import { List, Button } from 'semantic-ui-react';

export default class NotificationList extends Component {
  constructor() {
    super();
  }

  clickYes = async (id) => {
    try {
      const url = process.env.REACT_APP_API_URL + 'api/v1/users/request/' + id;
      const res = await fetch(url, {
        credentials: 'include',
        headers: {
          'accept': 'true'
        },
        method: 'POST'
      });
      const json = await res.json();
      console.log(json)
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    console.log(this.props.requests)
    const requests = this.props.requests.map((request, key) => {
      return (
        <List.Item key={key} >
          <List.Content floated='right' verticalAlign='middle'>
            <Button icon='check' circular positive onClick={() => this.clickYes(request.id)}/>
            <Button icon='close' circular secondary/>
          </List.Content>
          <List.Icon name='user' />
          <List.Content>
            <List.Header>Friend Request</List.Header>
            {request.userFrom} wants to add you as friend!
          </List.Content>
        </List.Item>
      )
    })
    return(
      <List divided verticalAlign='middle'>
        {requests}
      </List>
    )
  }
}