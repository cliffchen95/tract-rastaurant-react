import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard';
import { Card } from 'semantic-ui-react';

export default class RestaurantCardGroup extends Component {
  constructor(){
    super();
  }

  render() {
    const cardItems = this.props.restaurants.map((restaurant, key) => {
      return <RestaurantCard restaurant={restaurant} key={key} />
    })
    return(
      <Card.Group>
        {cardItems}
      </Card.Group>
    )
  }
}