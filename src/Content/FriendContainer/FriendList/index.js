import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard';
import { Card, Segment, Button } from 'semantic-ui-react';

export default class FriendList extends Component {
  constructor(){
    super();
    this.state = {
      showMutual: true,
      mutualRestaurants: [],
      allRestaurants: [],
      showAll: false
    }
  }
  componentDidMount() {
    this.fetchMutual()
    this.fetchAll()
  }
  toggleMutual = () => {
    this.setState({ showMutual: !this.state.showMutual })
  }
  fetchMutual = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'api/v1/restaurants/friend/' + this.props.friend.id;
      const res = await fetch(url, {
        credentials: 'include'
      });
      const json = await res.json();
      const mutualRestaurants = json.data;
      this.setState({ mutualRestaurants })
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
      const allRestaurants = json.data;
      this.setState({ allRestaurants })
    } catch (err) {
      console.error(err)
    } 
  }
  render() {
    const mutualItems = this.state.mutualRestaurants.map((restaurant, key) => {
      return <RestaurantCard 
        restaurant={restaurant} 
        key={key}
      />
    })
    const allItems = this.state.allRestaurants.map((restaurant, key) => {
      return <RestaurantCard 
        restaurant={restaurant} 
        key={key}
      />
    })
    const mutual = this.state.showMutual ? "Showing Mutual Likes" : "Showing All Likes";
    const all = this.state.showAll ? "show less" : "...more";
    return(
      <Segment>
        <h3>{this.props.friend.username}</h3>
        <Button secondary content={mutual} onClick={this.toggleMutual}/>
        <a>{this.state.showAll && "showless"}</a>
        <Card.Group itemsPerRow={3}>
          { this.state.showMutual ? mutualItems : allItems }
        </Card.Group>
        <a>{this.state.showAll || "...more"}</a>
      </Segment>
    )
  }
}