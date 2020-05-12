import React, { Component } from 'react';
import { Form, Button, Header, Message } from 'semantic-ui-react';
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
      email: "",
      message: "",
      warning: false
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  changeCity = (city) => {
    this.setState({ city: city })
  }
  onRegister = async (e) => {
    e.preventDefault();
    try {
      if (this.state.checkpassword !== this.state.password) {
        this.setState({ 
          message: "your password does not match!", 
          warning: true
        })
        throw new Error("your password does not match!")
      } else {
        const result = await this.props.register({
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          city: this.state.city
        })
        if (result.status !== 201) {
          this.setState({ message: result.message, warning: true })
          throw new Error(result.message)
        }
      }
    } catch (err) {
        console.error(err)
    }
    
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
      <Form onSubmit={this.onRegister}>
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
          <label>Enter Password</label>
          <input 
            placeholder='Password' 
            type="password"
            name="password"
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Re-Enter Password</label>
          <input 
            placeholder='Password' 
            type="password"
            name="checkpassword"
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Enter City</label>
          <SearchCity changeCity={this.changeCity}/>
        </Form.Field>
        <Button type='submit' icon='signup' content='Register'/>
        <p>Already has an account? <a>Log in!</a></p>
      </Form>
    )
    const message = (
      <Message warning>
        <Message.Header>{this.state.message}</Message.Header>
      </Message>
    )
    return(
      <div className="login-register-form">
        {RegisterForm}
        {this.state.warning && message}
      </div>
    );
  }
}