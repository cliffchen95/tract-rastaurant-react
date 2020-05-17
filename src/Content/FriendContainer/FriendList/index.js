import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard';
import { Card, Segment, Button, Dropdown } from 'semantic-ui-react';

export default class FriendList extends Component {
  constructor(){
    super();
    this.state = {
      showMutual: true,
      mutualRestaurants: [],
      allRestaurants: [],
      showAll: false,
      mutualCities: [],
      allCities: [],
      selectedCity: ""
    }
  }
  componentDidMount() {
    this.fetchMutual()
    this.fetchAll()
  }
  toggleMutual = () => {
    const cities = this.state.showMutual ? this.state.allCities : this.state.mutualCities;
    this.setState({ showMutual: !this.state.showMutual, selectedCity: cities[0] })
  }
  toggleAll = () => {
    this.setState({ showAll: !this.state.showAll })
  }
  fetchMutual = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'api/v1/restaurants/friend/' + this.props.friend.id;
      const res = await fetch(url, {
        credentials: 'include'
      });
      const json = await res.json();
      const mutualRestaurants = json.data;
      const cities = [];
      for (let restaurant of mutualRestaurants) {
        if (!cities.includes(restaurant.city)) {
          cities.push(restaurant.city)
        }
      }
      this.setState({ mutualRestaurants, mutualCities: cities, selectedCity: cities[0] })
    } catch (err) {
      console.error(err)
    }
  }
  fetchAll = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'api/v1/restaurants/friend/' + this.props.friend.id + "/all";
      const res = await fetch(url, {
        credentials: 'include'
      });
      const json = await res.json();
      const cities = []
      const allRestaurants = json.data;
      for (let restaurant of allRestaurants) {
        if (!cities.includes(restaurant.city)) {
          cities.push(restaurant.city)
        }
      }
      this.setState({ allRestaurants, allCities: cities, selectedCity: cities[0] })
    } catch (err) {
      console.error(err)
    } 
  }
  changeCity = (e, { value }) => {
    this.setState({ selectedCity: value })
  }
  render() {
    const { mutualRestaurants, allRestaurants, showAll, selectedCity, showMutual } = this.state;
    const mutualIndex = showAll ? mutualRestaurants.length : 6;
    const allIndex = showAll ? allRestaurants.length : 6;
    const mutualItems = mutualRestaurants.filter(restaurant => restaurant.city == selectedCity)
    .slice(0, mutualIndex)
    .map((restaurant, key) => {
      return <RestaurantCard 
        restaurant={restaurant} 
        key={key}
      />
    })
    const allItems = allRestaurants.filter(restaurant => restaurant.city == selectedCity)
    .slice(0, allIndex)
    .map((restaurant, key) => {
      return <RestaurantCard 
        restaurant={restaurant} 
        key={key}
      />
    })
    const mutual = showMutual ? "Showing Mutual Likes" : "Showing All Likes";
    const moreThanSix = showMutual ? mutualItems.length > 5 : allItems.length > 5;
    const all = showAll ? "show less" : "...more";
    const options = (
      this.state.showMutual 
      ? this.state.mutualCities.map((city, key) => {
        return { key: key, text: city, value: city }
      })
      : this.state.allCities.map((city, key) => {
        return { key: key, text: city, value: city }
      }));
    return(
      <Segment>
        <h3>{this.props.friend.username}</h3>
        <Button secondary content={mutual} onClick={this.toggleMutual}/>
        <Dropdown floated='right' options={options} value={this.state.selectedCity} onChange={this.changeCity}/>
        <h4>{this.state.selectedCity}</h4>
        <Card.Group itemsPerRow={3}>
          { showMutual ? mutualItems : allItems }
        </Card.Group>
        {
          moreThanSix
          &&
          <React.Fragment>
            <a onClick={this.toggleAll}>{this.state.showAll || "...more"}</a>
            <a onClick={this.toggleAll}>{this.state.showAll && "showless"}</a>
          </React.Fragment>
        }
      </Segment>
    )
  }
}