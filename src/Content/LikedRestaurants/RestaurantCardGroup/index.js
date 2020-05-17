import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard';
import { Card, Segment, Button } from 'semantic-ui-react';

export default class RestaurantCardGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
      editToggle: false,
      showMore: false,
      moreThanSix: props.restaurants.length > 5,
      restaurants: props.restaurants
    }
  }
  toggleEdit = () => {
    this.setState({ editToggle: !this.state.editToggle })
  }
  onRemove = async (id) => {
    try {
      this.props.removeLiked(id);
      const url = process.env.REACT_APP_API_URL + 'api/v1/restaurants/' + id;
      const res = await fetch(url, {
        credentials: 'include',
        method: 'DELETE'
      })
      const json = await res.json();
      return json;
    } catch (err) {
      console.error(err)
    }
  }
  toggleShow = () => {
    this.setState({ showMore: !this.state.showMore})
  }
  render() {
    const restaurants = (this.state.moreThanSix && !this.state.showMore) ? this.state.restaurants.slice(0, 6) : this.state.restaurants;

    const cardItems = restaurants.map((restaurant, key) => {
      return <RestaurantCard 
        restaurant={restaurant} 
        key={key}
        edit={this.state.editToggle}
        onRemove={this.onRemove} 
      />
    })
    return(
      <Segment>
        <h3>{this.props.city}</h3>
        <Button content="Toggle Edit" onClick={this.toggleEdit} />
        <Card.Group itemsPerRow={3}>
          {cardItems}
        </Card.Group>
        { (!this.state.showMore && this.state.moreThanSix) && <a onClick={this.toggleShow}>...more</a> }
        { this.state.showMore && <a onClick={this.toggleShow}>show less</a> }
      </Segment>
    )
  }
}