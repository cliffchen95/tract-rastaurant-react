import React, { Component } from 'react';
import './App.css';
import Title from './Title';
import LoginRegisterForm from './LoginRegisterForm';

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
    return (
      <div className="App">
        <Title/>
        {information}
        <LoginRegisterForm/>
      </div>
    );
  }
}

export default App;
