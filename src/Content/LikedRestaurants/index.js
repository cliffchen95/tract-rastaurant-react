import React, { Component } from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import RestaurantCardGroup from './RestaurantCardGroup';

export default class LikedRestaurants extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      likedRestaurants: [],
      cities: []
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
      const cities = this.state.cities;
      const likedRestaurants =json.data.like_restaurants;
      for (let restaurant of likedRestaurants) {
        if (!cities.includes(restaurant.city)) {
          cities.push(restaurant.city)
        }
      }
      this.setState({
        loading: false,
        likedRestaurants,
        cities
      })
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    console.log(this.state)
    const { cities, likedRestaurants } = this.state
    const result = cities.map((city, key) => {
      return (
        <RestaurantCardGroup 
          city={city} 
          restaurants={likedRestaurants.filter((restaurant) => {
            return restaurant.city == city
            })
          }
          key={key}
        />
      )
    })
    return(
      <div>
        <React.Fragment>
        {
          this.state.loading 
          ?
            <Segment>
              <Dimmer active>
                <Loader>Loading</Loader>
              </Dimmer>
            </Segment>
          :
          <React.Fragment>
            {result}
          </React.Fragment>
        }
        </React.Fragment>
      </div>
    )
  }
} 