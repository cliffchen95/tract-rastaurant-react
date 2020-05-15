import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard';
import { Card, Segment, Button } from 'semantic-ui-react';

export default class RestaurantCardGroup extends Component {
  constructor(){
    super();
    this.state = {
      editToggle: false
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
      console.log(json)
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    const cardItems = this.props.restaurants.map((restaurant, key) => {
      return <RestaurantCard 
        restaurant={restaurant} 
        key={key}
        edit={this.state.editToggle}
        onRemove={this.onRemove} 
      />
    })
    console.log()
    return(
      <Segment>
        <h3>{this.props.city}</h3>
        <Button content="Toggle Edit" onClick={this.toggleEdit} />
        <Card.Group itemsPerRow={3}>
          {cardItems}
        </Card.Group>
      </Segment>
    )
  }
}