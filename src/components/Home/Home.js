import React, {Component} from "react";
import axios from 'axios'
import "./Home.css";
import config from '../config'

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
    user: "",
    flight:''
  }
  this.showNotifications = this.showNotifications.bind(this);
  this.showDrive = this.showDrive.bind(this);
  this.getFlight=this.getFlight.bind(this);
}

componentDidMount(){
  axios.get("/auth/me").then(response=>{
    this.setState({user:response.data})
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
getFlight(url)
{
  // axios.request({
  //   url: url,
  //   method: 'get',
  //   headers: { 'Access-Control-Allow-Origin': '*' }
  // })

  axios.get(url)
  .then(res =>
    {
    this.setState({
      flight: res.data
    });
    // axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${config.google}`)
    // .then(res=>
    // {
    //   console.log("location", res.data);
    // })
  })

  // .then(){
  //   axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${}=${}&arrival_time=${}&key=${}`)
  // }
}
  render()
  {

    const isLoggedIn = (
      <div>
        <h1>Hey, thanks for logging in {this.state.user.displayName}. Lets get some details so that we can make your trip as easy as possible!</h1>
        <br />
        <FlightInput user={this.state.user} show={this.showNotifications} getFlight={this.getFlight}/>
        <br />
        <NotificationPref display={this.state.displayNotifications} show={this.showDrive}/>
        <br />
        <DriveDisplay display={this.state.driveDisplay}/>
      </div>
    )
    console.log("flight", this.state.flight);
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
