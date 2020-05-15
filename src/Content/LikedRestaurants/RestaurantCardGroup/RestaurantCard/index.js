import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

export default function RestaurantCard(props) {
  const restaurant = props.restaurant;
  const buttons = (
    props.edit
    ?
    <div>
    <a href={restaurant.url} target="_blank">
      Link
    </a>
    <Button 
    icon='close' 
    circular 
    primary 
    floated='right' 
    size='small'
    onClick={() => {props.onRemove(restaurant.id)}}
    />
    </div>
    :
    <a href={restaurant.url} target="_blank">
      Link
    </a>
  )
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
        {buttons}
      </Card.Content>
    </Card>
  )
}