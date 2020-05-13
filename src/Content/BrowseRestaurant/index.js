import React, { Component } from 'react';
import { Loader, Dimmer, Segment } from 'semantic-ui-react';
import RestaurantInfo from './RestaurantInfo';

export default class BrowseRestaurant extends Component {
  constructor() {
    super();
    this.state = {
      restaruantList: [],
      loading: true, 
      count: 0,
      index: 0
    }
  }
  viewNext = () => {
    const count = this.state.count + 1;
    const index = count % 20;
    this.setState({ count, index })
  }
  async componentDidMount() {
    try {
      const query = `?entity_id=${this.props.user.city}&entity_type=city`;
      const url = "https://developers.zomato.com/api/v2.1/search" + query;
      const res = await fetch(url, {
        headers: {
          "user-key": process.env.REACT_APP_ZOMATO_API_KEY
        }
      })
      const json = await res.json();
      console.log(json);
      const results = json.restaurants.map(({restaurant}) => {
        return {
          name: restaurant.name,
          address: restaurant.location,
          image: restaurant.featured_image,
          highlights: restaurant.highlights,
          url: restaurant.url,
          cuisines: restaurant.cuisines,
          id: restaurant.id
        }
      })
      this.setState({
        restaruantList: results,
        loading: false
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return(
      <div>
        {
          this.state.loading 
          ?
          <Segment>
            <Dimmer active>
              <Loader>Loading</Loader>
            </Dimmer>
          </Segment>
          :
          <RestaurantInfo 
            restaurant={this.state.restaruantList[this.state.index]}
            viewNext={this.viewNext}
          />
        }
      </div>
    )
  }
}