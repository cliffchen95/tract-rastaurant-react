import React, { Component } from 'react'
import Title from '../Title'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import BrowseRestaurant from './BrowseRestaurant';
import LikedRestaurants from './LikedRestaurants';

export default class MenuExampleTabularOnLeft extends Component {
  state = { activeItem: 'browse' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name='browse'
              active={activeItem === 'browse'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='saved'
              active={activeItem === 'saved'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='companies'
              active={activeItem === 'companies'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='links'
              active={activeItem === 'links'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            <Title />
            {
              activeItem == "browse" 
              && 
              <BrowseRestaurant 
                user={this.props.user}
              />
            }
            {
              activeItem == "saved" 
              && 
              <LikedRestaurants 
                user={this.props.user}
              />
            }
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}