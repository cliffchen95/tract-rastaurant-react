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
  render() {
    const information = (
      <div>this is some information of the app</div>
    )
    console.log(process.env.REACT_APP_ZOMATO_API_KEY)
    return (
      <div className="App">
        <Title />
        <LoginRegisterForm />
        {information}
      </div>
    );
  }
}

export default App;
