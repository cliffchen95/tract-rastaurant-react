import React, { Component } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import SearchCity from './SearchCity';

export default class LoginRegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      register: false,
      username: "",
      password: "",
      checkpassword: "",
      city: "",
      email: ""
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  changeCity = (city) => {
    this.setState({ city: city })
  }
  render() {
    const LoginForm = (
      <Form>
        <Header size='medium' textAlign='center'>Log in</Header>
        <Form.Field>
          <label>Username</label>
          <input 
            placeholder='Username'
            name="username"
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input 
            placeholder='Password' 
            type="password"
            name="password"
            onChange={this.onChange}
          />
        </Form.Field>
        <Button type='submit' icon='sign-in' content='Log in'/>
        <p>Does not have an account? <a>Register!</a></p>
      </Form>
    )
    const RegisterForm = (
      <Form>
        <Header size='medium' textAlign='center'>Register</Header>
        <Form.Field>
          <label>Username</label>
          <input 
            placeholder='Username'
            name="username"
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Enter Email</label>
          <input 
            placeholder='Email' 
            type="email"
            name="email"
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input 
            placeholder='Password' 
            type="password"
            name="password"
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input 
            placeholder='Password' 
            type="password"
            name="checkpassword"
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <SearchCity changeCity={this.changeCity}/>
        </Form.Field>
        <Button type='submit' icon='signup' content='Register'/>
        <p>Does not have an account? <a>Register!</a></p>
      </Form>
    )
    console.log(this.state)
    return(
      <div className="login-register-form">
        {RegisterForm}
      </div>
    );
  }
}