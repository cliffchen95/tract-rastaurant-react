import React, { Component } from 'react';
import { Image, Header } from 'semantic-ui-react';

export default class Title extends Component {
  constructor() {
    super();
  }

  render() {
    const style = {
      fontFamily: "'Bad Script', cursive",
      textAlign: 'center',
      fontSize: '2.5em'
    }
    return(
      <Header as='h1' style={style}>
        <Image circular bordered src='https://filacoahuila.com/wp-content/uploads/2019/11/fried-chicken-or-turkey-icon-cartoon-style-Chicken-Turkey-Fried-PNG-and-Vector-has-pretty.jpg' /> RestaurantFinder
      </Header>
    );
  }
}