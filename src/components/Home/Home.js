import React, {Component} from "react";
import axios from 'axios'
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
    driveDisplay: 'none',
    user: '',
    flight: ''
  }
  this.showNotifications = this.showNotifications.bind(this);
  this.showDrive = this.showDrive.bind(this);
  this.getFlight=this.getFlight.bind(this);
}

componentDidMount(){
  axios.get("/auth/me").then(response=>{
    this.setState({
      user:response.data
    })
  })

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
getFlight(url){
  axios.get(url)
  .then(res=>
  {
    this.setState({
        flight:res.data
    })
  })
}

  render()
  {
    console.log('flight',this.state.flight)

    const isLoggedIn = (
      <div>
        <h1>Hey, thanks for logging in {this.state.user.displayName}. Lets get some details so that we can make your trip as easy as possible!</h1>
        <br />
        <FlightInput user={this.state.user} show={this.showNotifications} flight={this.getFlight}/>
        <br />
        <NotificationPref flight={this.state.flight} display={this.state.displayNotifications} show={this.showDrive}/>
        <br />
        <DriveDisplay flight={this.state.flight} display={this.state.driveDisplay}/>
      </div>
    )
    return (
      <div className="home">
        <h1 id="title">Future logo</h1>
        <h2>Intro stuff, two sentences</h2>
        <br />
        <br />
        <Login user= {this.state.user}/>
        {this.state.user?isLoggedIn:null}
      </div>
    );
  }
}
