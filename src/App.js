import React, { Component } from 'react';
import './App.css';
import Title from './Title';
import LoginRegisterForm from './LoginRegisterForm';
import Content from './Content'
import { Grid } from 'semantic-ui-react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null
    }
  }

  register = async (info) => {
    try {
      const url = process.env.REACT_APP_API_URL + "api/v1/users/register";
      const res = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await res.json()
      if (json.status === 201) {
        this.setState({
          loggedIn: true,
          user: json.data,
        });
      }
      return json
    } catch (err) {
      console.log(err)
    }
  }

  logout = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "api/v1/users/logout"
      const res = await fetch(url, {
        credentials: 'include',
        method: 'GET'
      })
      const json = await res.json();
      this.setState({
        loggedIn: false,
        user: null
      })
    } catch (err) {
      console.log(err);
    }
  }

  login = async (info) => {
    const url = process.env.REACT_APP_API_URL + "api/v1/users/login"
    try {
      const res = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await res.json();
      if (json.status === 200) {
        this.setState({
          loggedIn: true,
          user: json.data,
        });
      }
      return json;
    } catch (err) {
      console.error(err);
    }
  }
  updateUser = (city) => {
    const { user } = this.state;
    user.city = city;
    this.setState({ user });
  }
  render() {
    const information = (
      <div>this is some information of the app</div>
    )
    return (
      <div className="App">
        {
          this.state.loggedIn 
          ? 
          <Content 
            user={this.state.user}
            updateUser={this.updateUser}
          />
          : 
          <React.Fragment>
            <Title />
            <LoginRegisterForm 
            register={this.register}
            login={this.login}
            logout={this.logout}
            />
            {information}
          </React.Fragment>
        }
        
      </div>
    );
  }
}

export default App;
