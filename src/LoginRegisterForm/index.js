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
      city: "",
      email: ""
    }
  }

  render() {
    const LoginForm = (
      <Form>
        <Header size='medium' textAlign='center'>Log in</Header>
        <Form.Field>
          <label>Username</label>
          <input placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' type="password"/>
        </Form.Field>
        <Button type='submit' icon='sign-in' content='Log in'/>
        <p>Does not have an account? <a>Register!</a></p>
      </Form>
    )
    const RegisterForm = (
      <Form>
        <Header size='medium' textAlign='center'>Register</Header>
        <Form.Field>
          <label>Enter Username</label>
          <input placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Enter Email</label>
          <input placeholder='Email' type="email"/>
        </Form.Field>
        <Form.Field>
          <label>Enter Password</label>
          <input placeholder='Password' type="password"/>
        </Form.Field>
        <Form.Field>
          <label>Enter Password Again</label>
          <input placeholder='Password' type="password"/>
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <SearchCity />
        </Form.Field>
        <Button type='submit' icon='signup' content='Register'/>
        <p>Does not have an account? <a>Register!</a></p>
      </Form>
    )
    return(
      <div className="login-register-form">
        {RegisterForm}
      </div>
    );
  }
}