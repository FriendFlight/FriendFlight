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
      font-color: #616161;
    `
    const Padder = styled.div`
      max-width: 90vw;
      margin: 0 auto;
      text-align: center;
    `
    const Spacer5 = styled.div`
    margin-top: 5vh;
    `
    const Spacer10 = styled.div`
    margin-top: 10vh;
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
    let userFirstName
    if (this.state.user.name){
        userFirstName = this.state.user.name.givenName
      }
    const isLoggedIn = (
      <Text>
        <Padder>You're logged in, {userFirstName}. 
          <br/>
          Let's plan your trip!
        </Padder>
        <Spacer10/>
        <FlightInput user={this.state.user} show={this.showNotifications} flight={this.getFlight}/>
        <Spacer10/>
        <NotificationPref user={this.state.user}
                          flight={this.state.flight}
                          display={this.state.displayNotifications}
                          airportIndex={this.state.airportIndex}
                          show={this.showDrive}/>
        <Spacer10></Spacer10>

        <DriveDisplay flight={this.state.flight}
                      display={this.state.driveDisplay}
                      airportIndex={this.state.airportIndex}/>
      </Text>

    )
    return (
      <div className="home">
        <Logo src={logo}></Logo>
        <Spacer5/>
          <Padder>
            <Text>Ridemindur gets you to the airport just in time to pick them up. Get to the airport right on time, every time.</Text > 
             <Spacer10/>
          </Padder>
        <Login user= {this.state.user}/>
        {this.state.user?isLoggedIn:null}
      </div>
    );
  }
}
