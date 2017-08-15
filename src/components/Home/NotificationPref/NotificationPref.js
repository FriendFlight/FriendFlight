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
    `
    
const ContactInputBox = styled.div`
      background-color: white;
      border: 1px solid #616161;
      padding: 5px;
      max-width: 75vw;
      max-height: 45px; 
      font-size: 1em;
      color: #616161;
      cursor: pointer;
      font-family: 'Lato', sans-serif;
      margin: 0 auto;
      margin-top: 10px;
      text-align: center;
      overflow: hidden;
`

const YesNoButton = styled.button`
      background-color: white;
      height: 5vh;
      width: 40vw;
      margin-top: 10px;
      border: 1px solid #616161;
      color: #616161;
      cursor: pointer;
      font-size: .75em;
`

export default class NotificationPref extends Component {
  constructor ()
  {
    super()
    this.state={
      phoneNumNum: "",
      valEmail:"",
      email: "",
      shortURL: ""
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
    if(this.validPhone(this.state.phoneNumNum)&& this.validateEmail(this.state.email))
    {
      return " text and email "
    }
    else if(this.validPhone(this.state.phoneNumNum))
    {
      return " text "
    }
    else if(this.validateEmail(this.state.email))
    {
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
        leave for the airport. Would you like a reminder to be sent the morning of
        the pickup as well? </h2>
      <YesNoButton onClick={() => {
        this.props.show()
        this.finalizeInfo(true)}}>Yes</YesNoButton>
      <YesNoButton onClick={() => {
        this.props.show()
        this.finalizeInfo(false)}}>No</YesNoButton>
    </div>)

    return (
      <Padder style={{'display': `${this.props.display}`}}>
        <h1>How do you want us to send you a reminder for the pickup?</h1>
        <h2>Do you want us to send you a text? If so give us a number to use.</h2>
        <ContactInputBox>
          <input onChange={(e)=>{this.handleNumNumChange(e.target.value)}} placeholder="888-888-8888"/>{this.state.phoneNumNum?this.state.valPhone:null}
        </ContactInputBox>
        <h2>Would you like an email as a reminder? We can do that too!</h2>
        <ContactInputBox>
          <input onChange={(e)=>{this.handleEmailChange(e.target.value)}} placeholder="example@email.com"/>{this.state.email ? this.state.valEmail:null}
        </ContactInputBox>
        <br />
        {this.validPhone(this.state.phoneNumNum)|| this.validateEmail(this.state.email)? messageParagraph:null}

      </Padder>
    );
  }
}
