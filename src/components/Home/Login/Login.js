import React, {Component} from "react";
import "./Login.css";


export default class Login extends Component
{
  render()
  {
    return (
      <div className="login">
        <a href="http://localhost:3001/auth">
          <div id="login">Login</div>
        </a>
      </div>
    );
  }
}
