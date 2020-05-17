import React, { Component } from 'react';
import FriendList from './FriendList';

export default class FriendContainer extends Component {
  constructor() {
    super();
    this.state = {
      friends: []
    }
  }
  fetchFriend = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'api/v1/users/friends';
      const res = await fetch(url, { credentials: "include" });
      const json = await res.json();
      const friends = json.data;
      this.setState({ friends });
    } catch (err) {
      console.error(err);
    }
  }
  componentDidMount() {
    this.fetchFriend()
  }
  render() {
    console.log(this.state)
    const list = this.state.friends.map((friend, key) => {
      return <FriendList friend={friend} key={key} />
    })
    return (
      <div>
        {list}
      </div>
    )
  }
}