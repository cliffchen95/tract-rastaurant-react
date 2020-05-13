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
  viewNext = async () => {
    const count = this.state.count + 1;
    const index = count % 20;
    if (index === 0) {
      const query = `?entity_id=${this.props.user.city}&entity_type=city&start=${count}`;
      await this.fetchData(query);
    }
    this.setState({ count, index })
  }
  async componentDidMount() {
    const query = `?entity_id=${this.props.user.city}&entity_type=city`;
    this.fetchData(query);
  }

  async fetchData(query) {
    try {
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