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
      border-radius: 6px;
      -webkit-transition-duration: 0.4s;
      transition-duration: 0.4s;
        &:hover${LoginButton}{
          background-color: #ff835d;
          border: 1px solid #ff835d;
          color: white;};
      @media (min-width : 500px){
        margin-top: 5vh;
        
      }
    `
const LogoutButton = LoginButton.extend`
      top: -55px;
      right: 10px;
      position: absolute; 
      font-size: 1em;
      -webkit-transition-duration: 0.4s;
      transition-duration: 0.4s;
      &:hover${LogoutButton}{
          background-color: #ff835d;
          border: 1px solid #ff835d;
          color: white;};
           @media (min-width : 500px){
             top: 15px;
             right: 25px;
             width: 10vw;
             margin-top: 0;
      }
    `



export default class Login extends Component {
  render() {
    const login = (<a href="http://localhost:3001/auth">
      <LoginButton>Login</LoginButton>
    </a>)

    const logout = (<a href="http://localhost:3001/auth/logout">
      <LogoutButton>Logout</LogoutButton>
    </a>)

    return (
      <ThemeProvider theme={theme}>
        <div>
          {this.props.user ? logout : login}
        </div>
      </ThemeProvider>
    );
  }
}

