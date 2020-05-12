import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

export default class Title extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <Header as='h1' textAlign='center'>
        <Header.Content>Title</Header.Content>
      </Header>
    );
  }
}