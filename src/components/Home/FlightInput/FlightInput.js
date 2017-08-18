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
const Manually = styled.div`
      max-width: 90vw;
      margin: 0 auto;
      text-align: center;
       @media (min-width : 1000px){
        font-size: .5em;
      }
    `


const FlightInputBox = styled.div`
      background-color: white;
      border: 1px solid #616161;
      padding: 5px;
      width: 50vw;
      font-size: 1em;
      color: #616161;
      font-family: 'Lato', sans-serif;
      margin: 0 auto;
      margin-top: 10px;
      text-align: center;
      overflow: hidden;
      height: 36px;
`
const Input = styled.input`
      text-align: center;
      width: 50vw;
      border: 1px solid #616161;
      padding: 5px;
      font-size: 1em;
      margin: 0 auto;
      margin-top: 10px;
      text-align: center;
      overflow: hidden;
      font-family: 'Lato', sans-serif;
      color: #616161;
      @media (min-width : 1000px){
        width: 27vw;
        margin-left: 3vw;
      }
`
const ManualContainer = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 10px;
      padding: 0 10px;
      @media (min-width : 1000px) {
        display: inline-block;
        padding: 0;
        margin: 0;
      }
  `
const ManualInput = styled.input`
      text-align: center;
      width: 50vw;
      border: 1px solid #616161;
      padding: 5px;
      font-size: 1em;
      margin: 0 auto;
      text-align: center;
      overflow: hidden;
      font-family: 'Lato', sans-serif;
      color: #616161;
      @media (min-width : 1000px){
        width: 12vw;
        font-size: .75em;
        margin-left:1vw;
        display: inline-block;
        height: 25px;
      }
`

const DateSelect = FlightInputBox.extend`
      font-size:.9em;
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
      @media( min-width: 1000px) {
        width:10vw;
        display: inline-block;
        margin-left: 3vw;
      }
`

const SubmitManualButton = styled.button`
      background-color: white;
      height: 5vh;
      width: 30vw;
      border: 1px solid #616161;
      color: #616161;
      cursor: pointer;
      font-size: .75em;
      border-radius: 6px;
      -webkit-transition-duration: 0.4s; /* Safari */
      transition-duration: 0.4s;
      &:hover${SubmitManualButton}{
          background-color: #ff835d;
          border: 1px solid #ff835d;
          color: white;
      }
      @media( min-width: 1000px) {
        width:8vw;
        display: inline-block;
        margin-left: 1vw;
        font-size: .75em;
        height: 3vh;
      }
      `




    const Spacer5 = styled.div`
    margin-top: 5vh;
    `
    const Spacer75 = styled.div`
    margin-top: 7.5vh;
    `
    const SpecialSpacer75 = styled.div`
    margin-top: 7.5vh;
    @media( min-width: 1000px) {
      margin-top: 3vh;
    }
    
    `
    const SpecialSpacer3 = styled.div`
    @media( min-width: 100px) {
      margin-top:3vh;

    }
    
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
      buttonDisabled: false
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
        <Padder >What's the final flight number?
            <Input placeholder="Example: DL1234"  maxlength="10" onChange={(event) => { this.handleFlightNumberChange(event.target.value) }} />
        </Padder>
          <Spacer75/>
        <Padder>What day does the flight land?
            <Input type="date" placeholder="MM/DD/YYYY" onChange={(event) => { this.handleFlightDateChange(event.target.value) }} />
        </Padder>
        <Spacer75/>
        <Padder>Can we use your location?
          <SubmitButton onClick={() => {
            if(!this.state.flightNumLetters || !this.state.flightWholeDate || this.props.buttonDisabled)
              return
            this.sendTripInfo()
            this.props.toggleButton()
            }}>Go for it
          </SubmitButton>
        </Padder>
        
          <SpecialSpacer75/>
        <Manually>Or manually enter your address.
          <ManualContainer>
            <ManualInput placeholder="Enter Address" onChange={(event) => { this.handleAddressChange(event.target.value) }} />
              <SubmitManualButton onClick={() => {
            if(!this.state.flightNumLetters || !this.state.flightWholeDate  || this.props.buttonDisabled)
              return
            this.sendTripInfo()
            this.props.toggleButton()
            }
          }>Submit
          </SubmitManualButton>
          </ManualContainer>
            
        </Manually>
        <Padder>
          <SpecialSpacer3/>
          
        </Padder>
      </div>
    );
  }
}
