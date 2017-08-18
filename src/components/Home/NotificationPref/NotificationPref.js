import React, {Component} from "react";
import axios from 'axios'
import moment from 'moment'


//Styled Components
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import theme from '../../../components/Theme.js';
//Styled Components

const Padder = styled.div`
      max-width: 90vw;
      margin: 0 auto;
      text-align: center;
      @media ( min-width: 1000px ) {
        padding-top: 5vw;
      }
    `
    
const ContactInputBox = styled.input`
      background-color: white;
      border: 1px solid #616161;
      padding: 5px;
      max-width: 75vw;
      max-height: 45px; 
      font-size: 1em;
      color: #616161;
      font-family: 'Lato', sans-serif;
      margin: 0 auto;
      margin-top: 10px;
      text-align: center;
      overflow: hidden;
      margin-bottom: 10vh;
`

const YesNoButton = styled.button`
      background-color: white;
      height: 5vh;
      width: 40vw;
      margin: 10px;
      margin-top: 20px;
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
      // @media ( min-width: 1000px ) {
      //   max-width: 10vw;
      // }
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
      @media ( min-width: 1000px ) {
        max-width: 10vw;
        margin-left: 1vw;
        margin-right: 1vw;
      }
`

const Spacer5 = styled.div`
    margin-top: 5vh;
    `
const Spacer75 = styled.div`
    margin-top: 7.5vh;
    `
const SpacerH7 = styled.div`
    height: 11vh;
    `
const SpacerH30 = styled.div`
    height: 30vh;
    width: 100%;
`



export default class NotificationPref extends Component {
  constructor ()
  {
    super()
    this.state={
      phoneNumNum: "",
      valEmail:"",
      email: "",
      shortURL: "",
      showSpacer: 'block'
    }
    this.validateEmail=this.validateEmail.bind(this)
    this.validate=this.validate.bind(this)
    this.validPhone=this.validPhone.bind(this)
    this.handleNumNumChange=this.handleNumNumChange.bind(this)
    this.handleEmailChange=this.handleEmailChange.bind(this)
    this.adaptiveParagraph=this.adaptiveParagraph.bind(this)
  }

  validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }

  validate(email)
  {
    if (this.validateEmail(email))
    {
      //valid
      this.setState({
        valEmail:"✔"
      })
    }
    else
    {
      this.setState({
        valEmail:"X"
      })
    }
    return false;
  }

  validPhone(value)
  {
    if(value)
    {
      if(value.length>9)
      {
        return true
      }
      else
      {
        return false
      }
    }
  }
  valPhone(value)
  {
    if(this.validPhone(value))
    {
      this.setState({
        valPhone:"✔"
      })
    }
    else
    {
      this.setState({
        valPhone:"X"
      })
    }
  }

  handleNumNumChange(value)
  {
    this.setState({
      phoneNumNum: value.match(/\d/g)
    })
    this.valPhone(value.match(/\d/g))
  }

  handleEmailChange(value)
  {
    this.setState({
      email: value
    })
    this.validate(value)
  }

  adaptiveParagraph()
  {
    if(this.validPhone(this.state.phoneNumNum)&& this.validateEmail(this.state.email)) {
      return " text and email "
    }
    else if(this.validPhone(this.state.phoneNumNum)) {
      return " text "
    }
    else if(this.validateEmail(this.state.email)) {
      return " email "
    }
  }

  sendScheduledText(date) {
    axios.post('/api/send-text', {date: date, phoneNumber: `+1${this.state.phoneNumNum.join('')}`, googleURL: this.props.shortURL})
      .then(response => console.log(response.data))
  }

  sendScheduledEmail(date) {
    axios.post('/api/send-email', {date: date, email:this.state.email, googleURL: this.props.shortURL})
      .then(response => console.log(response.data))
  }

  finalizeInfo(sendMorningOf) {
    let finalPhoneNumber
    if(this.state.phoneNumNum) {
      finalPhoneNumber = this.state.phoneNumNum.join('')
    }
    else {
      finalPhoneNumber = this.state.phoneNumNum
    }

    axios.post('/api/flight', {
      isFinalData: true,
      phoneNumber: finalPhoneNumber,
      email: this.state.email,
      flightNumber: this.props.flight.info[0].scheduledFlights[0].carrierFsCode + this.props.flight.info[0].scheduledFlights[0].flightNumber,
      arrivalDate: this.props.flight.info[0].scheduledFlights[0].arrivalTime.substring(0, 10),
      currentUserID: this.props.user.id,
      morningOfNotification: sendMorningOf,
      airportName: this.props.flight.info[0].appendix.airports[this.props.airportIndex].name,
      arrivalTime: this.props.flight.info[0].scheduledFlights[0].arrivalTime,
      userLatitude: this.props.flight.directions.routes[0].legs[0].start_location.lat,
      userLongitude: this.props.flight.directions.routes[0].legs[0].start_location.lng
      }).then(response => console.log(response))

    const date = moment(this.props.flight.info[0].scheduledFlights[0].arrivalTime)
      .subtract(this.props.flight.directions.routes[0].legs[0].duration.value + 300, 'seconds').toDate()
    if(finalPhoneNumber && finalPhoneNumber.length !== 0) {
      console.log("will fire sendScheduledText",this.state.phoneNumNum)
      this.sendScheduledText(date)
    }
    if(this.state.email) {
      console.log("will fire sendScheduledEmail",this.state.email)
      this.sendScheduledEmail(date)
    }
  }

  render()
  {
    const messageParagraph=(<div>
      <h2>Awesome! We'll message you via{this.adaptiveParagraph()}10 minutes before you should
        leave. Want a reminder the morning of as well? </h2>
      <SubmitButton onClick={() => {
        this.props.show()
        this.finalizeInfo(true)}}>Sure!</SubmitButton>
      <SubmitButton onClick={() => {
        this.props.show()
        this.finalizeInfo(false)}}>Meh...</SubmitButton>
        <SpacerH7/>
    </div>)

    return (
      <Padder style={{'display': `${this.props.display}`}}>
        <h2>For text notifications provide a number.</h2>
        <ContactInputBox onChange={(e)=>{this.handleNumNumChange(e.target.value)}} placeholder="888-888-8888" />{this.state.phoneNumNum?this.state.valPhone:null}
        <h2>For email notifications provide an email.</h2>
        <ContactInputBox onChange={(e)=>{this.handleEmailChange(e.target.value)}} placeholder="example@email.com"/>{this.state.email ? this.state.valEmail:null}
        {/*<SpacerH30 style={{'display': `${this.state.showSpacer}`}}/>*/}
        
  
        
        <br />
        {this.validPhone(this.state.phoneNumNum)|| this.validateEmail(this.state.email)? messageParagraph:(<SpacerH30/>)}        
      </Padder>
    );
  }
}
