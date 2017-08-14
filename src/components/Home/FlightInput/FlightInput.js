import React, { Component } from "react";
import axios from 'axios';
import config from '../../config'

import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import theme from '../../../components/Theme.js';

const Padder = styled.div`
      max-width: 90vw;
      margin: 0 auto;
      text-align: center;
    `
const FlightInputBox = styled.div`
      background-color: white;
      border: 1px solid black;
      padding: 5px;
      width: 50vw;
      font-size: 1em;
      color: black;
      cursor: pointer;
      font-family: lato;
      margin: 0 auto;
      text-align: center;
`




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
            <input placeholder="Example: DL1234" onChange={(event) => { this.handleFlightNumberChange(event.target.value) }} />
          </FlightInputBox>
        </Padder>
        <br />
        <br />
        <br />
        <Padder>What day are you going to pick up</Padder>
        <Padder> your friend from the airport?
        <FlightInputBox>
            <input type="date" name="MM/DD/YYYY" onChange={(event) => { this.handleFlightDateChange(event.target.value) }} />
          </FlightInputBox>
        </Padder>
        <br />
        <br />
        <br />
        <Padder>Click the button below so we can</Padder>
        <Padder>plan your trip to the airport.</Padder>
        <button onClick={() => {
          this.props.show()
          this.sendTripInfo()
        }}>Submit</button>
        <br />
        <br />
        <br />
        <Padder>Or you can give us an address you</Padder>
        <Padder>want to start your pickup from?
           <FlightInputBox>
            <input placeholder="Manually Enter Address" onChange={(event) => { this.handleAddressChange(event.target.value) }} />
          </FlightInputBox>
        </Padder>
        <button onClick={() => {
          this.props.show()
          this.sendTripInfo()
        }}>Submit</button>
      </div>
    );
  }
}
