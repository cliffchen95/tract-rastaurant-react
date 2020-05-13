import React, { Component } from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import RestaurantCardGroup from './RestaurantCardGroup';

export default class LikedRestaurants extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      LikedRestaurants: []
    }
  }
  async componentDidMount() {
    try {
      const url = process.env.REACT_APP_API_URL + "api/v1/restaurants/"
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
      })
      const json = await res.json();
      this.setState({
        loading: false,
        LikedRestaurants: json.data.like_restaurants
      })
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    console.log(this.state)
    return(
      <div>
        <Segment>
        {
          this.state.loading 
          ?
            <Dimmer active>
              <Loader>Loading</Loader>
            </Dimmer>
          :
          <RestaurantCardGroup restaurants={this.state.LikedRestaurants}/>
        }
        </Segment>
      </div>
    )
  }
} 