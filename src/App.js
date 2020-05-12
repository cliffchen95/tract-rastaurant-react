import React, { Component } from 'react';
import './App.css';
import Title from './Title';
import LoginRegisterForm from './LoginRegisterForm';
import { Grid } from 'semantic-ui-react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
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
      return json
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const information = (
      <div>this is some information of the app</div>
    )
    console.log(process.env.REACT_APP_ZOMATO_API_KEY)
    return (
      <div className="App">
        <Title />
        <LoginRegisterForm register={this.register}/>
        {information}
      </div>
    );
  }
}

export default App;
