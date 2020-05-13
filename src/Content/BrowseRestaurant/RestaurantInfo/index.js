import React, { Component } from 'react';
import { Grid, Image, Button, List } from 'semantic-ui-react';


export default class RestaurantInfo extends Component {
  constructor() {
    super()
    this.setState = {
      loading: true
    }
  }

  onLike = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "api/v1/restaurants/"
      const restaurant = this.props.restaurant
      const address = restaurant.address.address + ", " + restaurant.address.city
      const res = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          id: restaurant.id,
          address: address,
          picture: restaurant.image,
          url: restaurant.url,
          name: restaurant.name
        }),
        headers: {
          'Content-Type': 'application/json',
          'like': 'true'
        }
      })
      const json = await res.json();
      console.log(json)
    } catch (err) {
      console.error(err);
    }
    this.props.viewNext();
  }
  onDislike = async() => {
    try {
      const url = process.env.REACT_APP_API_URL + "api/v1/restaurants/"
      const restaurant = this.props.restaurant
      const address = restaurant.address.address + ", " + restaurant.address.city
      const res = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          id: restaurant.id,
        }),
        headers: {
          'Content-Type': 'application/json',
          'like': 'false'
        }
      })
      const json = await res.json();
      console.log(json)
    } catch (err) {
      console.error(err);
    }
    this.props.viewNext();
  }

  render() {
    const restaurant = this.props.restaurant;
    const address = restaurant.address.address + ", " + restaurant.address.city
    console.log(restaurant)
    const highlights = (
      <List bulleted>
        {restaurant.highlights.map((highlight, key) => {
          return <List.Item key={key}>{highlight}</List.Item>
        })}
      </List>
    )
    return(
      <Grid columns={2} divided>
        <Grid.Column width={8}>
          <Image src={restaurant.image} />
          <h3>{restaurant.name}</h3>
          <h4>{restaurant.cuisines}</h4>
          <a href={restaurant.url} target="_blank">link</a>
          <Button content="like" onClick={this.onLike} />
          <Button content="dislike" onClick={this.onDislike} />
        </Grid.Column>
        <Grid.Column width={4}>
          <h4>Highlights:</h4>
          {highlights}
          <h4>{address}</h4>
        </Grid.Column>
      </Grid>
    )
  }

}