import React, { Component } from 'react';
import { Grid, Image, Button, List, Segment } from 'semantic-ui-react';


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
          city: restaurant.address.city,
          picture: restaurant.image,
          url: restaurant.url,
          name: restaurant.name,
          cuisine: restaurant.cuisines
        }),
        headers: {
          'Content-Type': 'application/json',
          'like': 'true'
        }
      })
      const json = await res.json();
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
      
    } catch (err) {
      console.error(err);
    }
    this.props.viewNext();
  }

  render() {
    const restaurant = this.props.restaurant;
    const address = restaurant.address.address + ", " + restaurant.address.city
    const highlights = (
      <List bulleted>
        {restaurant.highlights.map((highlight, key) => {
          return <List.Item key={key}>{highlight}</List.Item>
        })}
      </List>
    )
    const style ={
      maxHeight: "60%"
    }
    return(
      <Grid columns='2' centered>
        <Grid.Row divided >
          <Grid.Column width={11}>
          <Segment>
            <Image src={restaurant.image} style={style} wrapped/>
            <h3>{restaurant.name}</h3>
            <h4>{restaurant.cuisines}</h4>
            <a href={restaurant.url} target="_blank">zomato link</a>
            <Button.Group fluid>
              <Button 
                icon="heart" 
                onClick={this.onLike} 
                primary
                content="like"
              />
              <Button 
                icon="close" 
                onClick={this.onDislike} 
                secondary
                content="dislike"
              />
            </Button.Group>
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
          <Segment>
            <h4>Highlights:</h4>
            {highlights}
            <h4>{address}</h4>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}