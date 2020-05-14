import React, { Component } from 'react';
import SearchCity from './SearchCity';
import CuisineForm from './CuisineForm';
import { Form, Button } from 'semantic-ui-react';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.user.city,
      cuisines: [],
      selectedCuisines: []
    }
  }
  componentDidMount() {
    this.fetchCuisine()
  }
  fetchCuisine = async () => {
    try {
      const url = `https://developers.zomato.com/api/v2.1/cuisines?city_id=${this.state.city}`
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
  changeCity = async (city) => {
    await this.setState({ city, selectedCuisines: [] })
    this.fetchCuisine();
  }
  render() {
    console.log(this.state)
    const selected = this.state.selectedCuisines.map((cuisine, key) => {
      return <Button content={cuisine.name} key={key}/>
    })
    return(
      <div>
        <Form>
          <Form.Field>
            <label>Change location:</label>
            <SearchCity changeCity={this.changeCity} />
          </Form.Field>
          <Form.Field>
            <label>Cuisines:</label>
            <CuisineForm 
              cuisines={this.state.cuisines}
              addCuisine={this.addCuisine}
            />
          </Form.Field>
          {selected}
          <Button type='submit' content='Save' />
        </Form>
      </div>
    )
  }
}