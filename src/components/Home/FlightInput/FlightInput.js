import React, { Component } from "react";
import axios from 'axios';
import config from '../../config'

//Styled Components
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import theme from '../../../components/Theme.js';
//Styled Components

//Semantic UI
import { Button, Icon } from 'semantic-ui-react';
//Semantic UI

const Padder = styled.div`
      max-width: 90vw;
      margin: 0 auto;
      text-align: center;
    `
const FlightInputBox = styled.div`
      background-color: white;
      border: 1px solid #616161;
      padding: 5px;
      width: 50vw;
      font-size: 1em;
      color: #616161;
      cursor: pointer;
      font-family: 'Lato', sans-serif;
      margin: 0 auto;
      margin-top: 10px;
      text-align: center;
      overflow: hidden;
`
const Input = styled.input`
      text-align: center;
      width: 100%;
      font-family: 'Lato', sans-serif;
      color: #616161;
`
// const Button = styled.button`

// `





export default class FlightInput extends Component {
  constructor() {
    super()
    this.state = {
      flightNumLetters: '',
      flightNumNums: '',
      flightYear: '',
      flightMonth: '',
      flightDay: '',
      flight: [],
    }
    this.handleFlightNumberChange = this.handleFlightNumberChange.bind(this);
    this.handleFlightDateChange = this.handleFlightDateChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.sendTripInfo = this.sendTripInfo.bind(this);
  }
  handleFlightNumberChange(value) {
    this.setState({
      flightNumLetters: value.substring(0, 2),
      flightNumNums: value.substring(2),
    })

  }
  handleAddressChange(value) {
    this.setState({
      location: value
    })
  }

  handleFlightDateChange(value) {
    let dateArray = value.split('-')
    this.setState({
      flightWholeDate: value,
      flightYear: dateArray[0],
      flightMonth: dateArray[1],
      flightDay: dateArray[2]
    })

  }
  sendTripInfo() {
    if (this.state.location) {
      this.props.flight(`/api/flightAPI/${this.state.flightNumLetters}/${this.state.flightNumNums}/${this.state.flightYear}/${this.state.flightMonth}/${this.state.flightDay}/${this.state.location}`);
    }
    else {
      axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${config.google}`)
        .then(res => {
          this.setState({
            location: `${res.data.location.lat},${res.data.location.lng}`
          })
          this.props.flight(`/api/flightAPI/${this.state.flightNumLetters}/${this.state.flightNumNums}/${this.state.flightYear}/${this.state.flightMonth}/${this.state.flightDay}/${this.state.location}`);
        })

  }

    }

  render() {
    return (
      <div>
        <br />
        <Padder>What's the final flight number for</Padder>
        <Padder> the friend you're picking up?
          <FlightInputBox>
            <Input placeholder="Example: DL1234"  maxlength="10" onChange={(event) => { this.handleFlightNumberChange(event.target.value) }} />
          </FlightInputBox>
        </Padder>
        <br />
        <br />
        <br />
        <Padder>What day are you going to pick up</Padder>
        <Padder> your friend from the airport?
        <FlightInputBox>
            <Input type="date" placeholder="MM/DD/YYYY" onChange={(event) => { this.handleFlightDateChange(event.target.value) }} />
          </FlightInputBox>
        </Padder>
        <br />
        <br />
        <br />
        <Padder>Click the button below so we can</Padder>
        <Padder>plan your trip to the airport.</Padder>
        <Button onClick={() => {
          this.props.show()
          this.sendTripInfo()
        }}>Use your location</Button>
        <br />
        <br />
        <br />
        <Padder>Or you can give us an address you</Padder>
        <Padder>want to start your pickup from?
          <FlightInputBox>
            <Input placeholder="Enter Address" onChange={(event) => { this.handleAddressChange(event.target.value) }} />
          </FlightInputBox>
        </Padder>
        <Button onClick={() => {
          this.props.show()
          this.sendTripInfo()
        }}>Submit</Button>
      </div>
    );
  }
}
