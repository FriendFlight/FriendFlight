import React, {Component} from "react";
import "./Home.css";

import Login from './Login/Login';
import FlightInput from './FlightInput/FlightInput';
import DriveDisplay from './DriveDisplay/DriveDisplay';
import NotificationPref from './NotificationPref/NotificationPref';

export default class Home extends Component
{
constructor() {
  super() 
  this.state = {
    displayNotifications: 'none',
    driveDisplay: 'none'
  }
  this.showNotifications = this.showNotifications.bind(this)
  this.showDrive = this.showDrive.bind(this)
}

showNotifications(){
  this.setState({
    displayNotifications:'block'
  })
}
showDrive(){
  this.setState({
    driveDisplay:'block'
  })
}
  render()
  {
    return (
      <div className="home">
        <h1 id="title">Future logo</h1>
        <h2>Intro stuff, two sentences</h2>
        <br />
        <br />
        <Login />
        <h1>Hey, thanks for logging in (name). Lets get some details so that we can make your trip as easy as possible!</h1>
        <br />
        <FlightInput show={this.showNotifications}/>
        <br />
        <NotificationPref display={this.state.displayNotifications} show={this.showDrive}/>
        <br />
        <DriveDisplay display={this.state.driveDisplay}/>
      </div>
    );
  }
}
