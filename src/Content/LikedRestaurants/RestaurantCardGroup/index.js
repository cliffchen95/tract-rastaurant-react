import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard';
import { Card, Segment } from 'semantic-ui-react';

export default class RestaurantCardGroup extends Component {
  constructor(){
    super();
  }

  render() {
    const cardItems = this.props.restaurants.map((restaurant, key) => {
      return <RestaurantCard restaurant={restaurant} key={key} />
    })
    console.log(this.props.city)
    return(
      <Segment>
        <h3>{this.props.city}</h3>
        <Card.Group itemsPerRow={3}>
          {cardItems}
        </Card.Group>
      </Segment>
    )
  }
}