import React, { Component } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

export default class CuisineForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      message: "",
      value: "",
      cuisines: props.cuisines
    }
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
    if (this.props.cuisines !== prevProps.cuisines) {
      this.setState({ cuisines: this.props.cuisines })
    }
  }
  handleChange = (e) => {
    const query = e.target.value;
    if (!query) {
      this.setState({ query, results: [], message: ""})
    } else {
      this.setState({ query, message: "" });
    }
  }
  onChange = (e, { value }) => {
    const result = { id: value, name: e.target.textContent }
    this.setState({ value })
    this.props.addCuisine(result)
  }
  render() {
    const cuisines = this.state.cuisines.map((cuisine, key) => {
      return { 
        key: key, 
        text: cuisine.cuisine_name, 
        value: cuisine.cuisine_id,
      }
    });
    const { value } = this.state;
    const style = {
      paddingLeft: "20px"
    }
    return(
      <div style={style}>
        <Dropdown
          search
          selection 
          placeholder='Searching...'
          onSearchChange={this.handleChange}
          options={cuisines}
          value={value}
          onChange={this.onChange}
        />
        <Button onClick={this.props.apply} content="Apply" color='purple'/>
      </div>
    )
  }
}