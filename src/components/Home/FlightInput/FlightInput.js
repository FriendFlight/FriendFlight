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

//Smooth Scroll
import scrollToComponent from 'react-scroll-to-component';
//Smooth Scroll

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
      height: 36px;
`
const DateSelect = FlightInputBox.extend`
      font-size:.9em;
`

const Input = styled.input`
      text-align: center;
      width: 100%;
      font-family: 'Lato', sans-serif;
      color: #616161;
`
const SubmitButton = styled.button`
      background-color: white;
      height: 5vh;
      width: 30vw;
      margin-top: 10px;
      border: 1px solid #616161;
      color: #616161;
      cursor: pointer;
      font-size: .75em;
      border-radius: 6px;
      -webkit-transition-duration: 0.4s; /* Safari */
      transition-duration: 0.4s;
      &:hover${SubmitButton}{
          background-color: #ff835d;
          border: 1px solid #ff835d;
          color: white;
      }
`
    const Spacer5 = styled.div`
    margin-top: 5vh;
    `
    const Spacer75 = styled.div`
    margin-top: 7.5vh;
    `
    const Spacer10 = styled.div`
    margin-top: 10vh;
    `

    
// const SubmitButtonHover: styled.hover`
//        background-color: #616161 ;
//        color: white;
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

// componentDidMount() {
//   window.scrollTo(0, 700)
// }

  render() {
//       scrollToComponent(this.refs.Scrolly, {
//     offset: 1000,
//     align: 'top',
//     duration: 1000
// });
    return (
      <div>
        <Padder>What's the final flight number?
          <FlightInputBox>
            <Input placeholder="Example: DL1234"  maxlength="10" onChange={(event) => { this.handleFlightNumberChange(event.target.value) }} />
          </FlightInputBox>
        </Padder>
          <Spacer75/>
        <Padder>What day does the flight land?
          <DateSelect>
            <Input type="date" placeholder="MM/DD/YYYY" onChange={(event) => { this.handleFlightDateChange(event.target.value) }} />
          </DateSelect>
        </Padder>
        <Spacer75/>
        <Padder>Can we use your location?
          <SubmitButton onClick={() => {
            if(!this.state.flightNumLetters || !this.state.flightWholeDate)
              return
            this.sendTripInfo()
            }}>Go for it!
          </SubmitButton>
        </Padder>
          <Spacer75/>
        <Padder>Or manually enter your address
          <FlightInputBox>
            <Input placeholder="Enter Address" onChange={(event) => { this.handleAddressChange(event.target.value) }} />
          </FlightInputBox>
        </Padder>
        <Padder>
          <SubmitButton onClick={() => {
            if(!this.state.flightNumLetters || !this.state.flightWholeDate)
              return
            this.sendTripInfo()}
          }>Submit
          </SubmitButton>
        </Padder>
      </div>
    );
  }
}
