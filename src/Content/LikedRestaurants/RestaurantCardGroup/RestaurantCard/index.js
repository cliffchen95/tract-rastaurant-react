import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default function RestaurantCard(props) {
  const restaurant = props.restaurant
  return(
    <Card>
      <Image src={restaurant.picture} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{restaurant.name}</Card.Header>
        <Card.Description>
          {restaurant.address}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href={restaurant.url} target="_blank">
          Link
        </a>
      </Card.Content>
    </Card>
  )
}