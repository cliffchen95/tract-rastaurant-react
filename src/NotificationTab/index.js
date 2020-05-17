import React, { Component } from 'react';
import NotificationList from './NotificationList'

export default class NotificationTab extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      requestsTo: []
    }
  }
  onClick = (e) => {
    if (e.target == e.currentTarget) {
      this.setState({ open: !this.state.open })
      this.fetchRequests()
    }
  }
  removeRequest = (index) => {
    const { requestsTo } = this.state;
    requestsTo.splice(index, 1);
    this.setState({ requestsTo })
  }
  fetchRequests = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'api/v1/users/requests';
      const res = await fetch(url, {
        credentials: 'include'
      });
      const json = await res.json();
      const requestsTo = json.data.requests_to.map((request) => {
        return { info: request.info, userFrom: request.user_from.username, id: request.id }
      })
      this.setState({ requestsTo })
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    const style = {
      backgroundColor: "#fa744f",
      position: "-webkit-sticky",
      position: "sticky",
      bottom: '0px',
      width: 'auto'
    }
    return (
      <div style={style} onClick={this.onClick} >
        Notification
        { this.state.open && <NotificationList requests={this.state.requestsTo} removeRequest={this.removeRequest} />}
      </div>
    )
  }
}