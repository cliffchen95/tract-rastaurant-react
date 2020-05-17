import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

export default function RestaurantCard(props) {
  const restaurant = props.restaurant;
  return(
    <Card>
      <Image src={restaurant.picture} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{restaurant.name}</Card.Header>
        <Card.Meta>{restaurant.cuisine}</Card.Meta>
        <Card.Description>
          {restaurant.address}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href={restaurant.url} target="_blank">Link</a>
      </Card.Content>
    </Card>
  )
}