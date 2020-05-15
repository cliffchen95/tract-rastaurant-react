import React, { Component } from 'react';
import { Loader, Dimmer, Segment, Grid, Button } from 'semantic-ui-react';
import RestaurantInfo from './RestaurantInfo';
import CuisineForm from './CuisineForm';

export default class BrowseRestaurant extends Component {
  constructor() {
    super();
    this.state = {
      restaruantList: [],
      loading: true, 
      count: 0,
      index: 0,
      selectedCuisines: [],
      cuisines: []
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
  fetchCuisine = async () => {
    try {
      const url = `https://developers.zomato.com/api/v2.1/cuisines?city_id=${this.props.user.city}`
      const res = await fetch(url, {
        headers: {
          'user-key': process.env.REACT_APP_ZOMATO_API_KEY
        }
      })
      const json = await res.json();
      const cuisines = json.cuisines.map(({ cuisine }) => {
        return cuisine
      })
      this.setState({ cuisines })
    } catch (err) {
      console.error(err)
    }
  }
  addCuisine = (cuisine) => {
    const { selectedCuisines } = this.state;
    selectedCuisines.push(cuisine);
    this.setState({ selectedCuisines });
  }
  applySetting = async () => {
    const cuisines = this.state.selectedCuisines.map((cuisine) => {
      return cuisine.id
    })
    const str = cuisines.join(', ')
    const query = `?entity_id=${this.props.user.city}&entity_type=city&cuisines=` + str;
    try {
      await this.setState({ loading: true, count: 0, index: 0 });
      await this.fetchData(query);
    } catch (err) {
      console.error(err);
    }
  }
  removeCuisine = (index) => {
    const { selectedCuisines } = this.state;
    selectedCuisines.splice(index, 1);
    this.setState({ selectedCuisines });
  }
  async componentDidMount() {
    const query = `?entity_id=${this.props.user.city}&entity_type=city`;
    this.fetchCuisine();
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
    const selected = this.state.selectedCuisines.map((cuisine, key) => {
      return <Button 
        content={cuisine.name} 
        key={key} 
        onClick={ () => this.removeCuisine(key) }
      />
    })
    const style = {
      minHeight: "80vh"
    }
    return(
      <div>
        <Segment style={style}>
        {
          this.state.loading 
          ?
            <Dimmer active>
              <Loader>Loading</Loader>
            </Dimmer>
          :
          <Grid >
            <Grid.Row>
              <CuisineForm 
                addCuisine={this.addCuisine}
                cuisines={this.state.cuisines}
                apply={this.applySetting}
              />
              <Grid.Column stretched>
                <Button.Group>
                  {selected}
                </Button.Group>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <RestaurantInfo 
                restaurant={this.state.restaruantList[this.state.index]}
                viewNext={this.viewNext}
              />
            </Grid.Row>
          </Grid>
        }
        </Segment>
      </div>
    )
  }
}