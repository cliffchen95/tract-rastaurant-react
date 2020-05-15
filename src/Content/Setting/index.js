import React, { Component } from 'react';
import SearchCity from './SearchCity';
import { Form, Button, Message } from 'semantic-ui-react';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.user.city
    }
  }
  changeCity = async (city) => {
    await this.setState({ city })
  }
  onSubmit = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "api/v1/users/update";
      const res = await fetch(url, {
        credentials: 'include',
        method: 'PATCH',
        body: JSON.stringify({
          city: this.state.city
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await res.json();
      this.props.updateUser(this.state.city);
      this.setState({message: "Your preference has been updated"})
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    return(
      <div>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Change location:</label>
            <SearchCity changeCity={this.changeCity} currentCity={this.props.user.city} />
          </Form.Field>
          <Button type='submit' content='Save' />
        </Form>
        {
          this.state.message 
          && 
          <Message content={this.state.message} />
        }
      </div>
    )
  }
}