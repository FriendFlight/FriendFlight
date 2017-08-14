import React, {Component} from "react";
import axios from 'axios'
// import "./Home.css";

import Login from './Login/Login';
import FlightInput from './FlightInput/FlightInput';
import DriveDisplay from './DriveDisplay/DriveDisplay';
import NotificationPref from './NotificationPref/NotificationPref';
import styled from 'styled-components';

import { ThemeProvider } from 'styled-components';
import theme from '../../components/Theme.js';

import logo from './ridemindurLogo.png';

    const Logo = styled.img`
      height: 19em;
      margin: 0 auto;
      display: block;

    `
    const Text = styled.text`
      margin: 0 auto;
      font-size: 1.25em;
    `
    const Padder = styled.div`
      max-width: 90vw;
      margin: 0 auto;
      text-align: center;
      margin-top: 5vh;
    `
export default class Home extends Component
{
constructor() {
  super()
  this.state = {
    displayNotifications: 'none',
    driveDisplay: 'none',
    user: '',
    flight: '',
    airportIndex: 0
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
    if((res.data.directions.routes[0].legs[0].distance.value / 1760) > 100) {
      console.log("It's too long.")
      this.setState({
        airportIndex: this.state.airportIndex + 1
      })
      axios.get(`/api/new-location/${res.data.location}/${res.data.info[0].appendix.airports[this.state.airportIndex].name}`)
        .then(newResponse => {
          console.log("Old", res.data)
          let newFlight = Object.assign({}, res.data, newResponse.data)

          console.log("new", newFlight)
          this.setState({
            flight: newFlight
          })
        })
    }
    else {
      this.setState({
        flight:res.data
      })
    }
  })
}

  render()
  {
    // console.log('flight',this.state.flight)
    const isLoggedIn = (
      <Text>
        <Padder>Hey, thanks for logging in {this.state.user.displayName}. Lets get some details so that we can make your trip as easy as possible!</Padder>
        <br />
        <FlightInput user={this.state.user} show={this.showNotifications} flight={this.getFlight}/>
        <br />
        <NotificationPref user={this.state.user}
                          flight={this.state.flight}
                          display={this.state.displayNotifications}
                          airportIndex={this.state.airportIndex}
                          show={this.showDrive}/>
        <br />

        <DriveDisplay flight={this.state.flight}
                      display={this.state.driveDisplay}
                      airportIndex={this.state.airportIndex}/>
      </Text>

    )
    return (
      <div className="home">
        <Logo src={logo}></Logo>
          <Padder>
            <Text>Ridemindur is a simple solution to planning your trip to the airport.</Text > 
            <br/>
            <Text>Get to the airport right on time, every time.</Text > 
          </Padder>
        <Login user= {this.state.user}/>
        {this.state.user?isLoggedIn:null}
      </div>
    );
  }
}
