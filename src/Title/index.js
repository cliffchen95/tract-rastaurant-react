import React, { Component } from 'react';


export default class Title extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div style={{paddingTop: '10px'}}>
        <h1 className="title">RestaurantFinder</h1>
      </div>
    );
  }
}