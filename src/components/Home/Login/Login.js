import React, { Component } from "react";
// import "./Login.css";
import styled from "styled-components";
import { ThemeProvider } from 'styled-components';
import theme from '../../../components/Theme.js';

const LoginButton = styled.div`
      background-color: white;
      border: 1px solid #616161;
      padding: 7px;
      width: 30vw;
      font-size: 1.50em;
      color: #616161;
      cursor: pointer;
      font-family: lato;
      margin: 0 auto;
      text-align: center;
      margin-top: 10vh; 
    `
const LogoutButton = LoginButton.extend`
      top: -55px;
      right: 10px;
      position: absolute; 
      font-size: 1em;
    `



export default class Login extends Component {
  render() {
console.log("this is logged!", this.props.user);
    const login = (<a href="http://localhost:3001/auth">
      <LoginButton id="login">Login</LoginButton>
    </a>)

    const logout = (<a href="http://localhost:3001/auth/logout">
      <LogoutButton id="login">Logout</LogoutButton>
    </a>)

    return (
      <ThemeProvider theme={ theme }>
        <div>
          {this.props.user?logout:login}
        </div>
      </ThemeProvider>
    );
  }
}
