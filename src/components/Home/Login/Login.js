import React, { Component } from "react";
import "./Login.css";
import styled from "styled-components";

export default class Login extends Component {
  render() {

    const login = (<a href="http://localhost:3001/auth">
      <div id="login">Login</div>
    </a>)

    const logout = (<a href="http://localhost:3001/auth/logout">
      <div id="login">Logout</div>
    </a>)

    return (
      <div className="login">
        {this.props.user?logout:login}
      </div>
    );
  }
}
