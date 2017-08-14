import React, {Component} from "react";
import axios from 'axios'
import moment from 'moment'
export default class NotificationPref extends Component {

  constructor ()
  {
    super()
    this.state={
      phoneNumNum: "",
      valEmail:""
    }
    this.validateEmail=this.validateEmail.bind(this);
    this.validate=this.validate.bind(this);
    this.validPhone=this.validPhone.bind(this);
    this.handleNumNumChange=this.handleNumNumChange.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
    this.adaptiveParagraph=this.adaptiveParagraph.bind(this);
  }

  validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
    axios.post('/api/send-text', {date: date, phoneNumber: `+1${this.state.phoneNumNum.join('')}`})
      .then(response => console.log(response.data))
  }

  sendScheduledEmail(date) {
    axios.post('/api/send-email', {date: date, email:this.state.valEmail})
      .then(response => console.log(response.data))
  }

  finalizeInfo(sendMorningOf) {
    axios.post('/api/flight', {
      isFinalData: true,
      phoneNumber: this.state.phoneNumNum.join(''),
      email: this.state.valEmail,
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
    if(this.state.phoneNumNum)
      this.sendScheduledText(date)
    if(this.state.valEmail)
      this.sendScheduledEmail(date)
  }

  render()
  {
    const messageParagraph=(<div>
      <h2>Awesome! We'll message you via{this.adaptiveParagraph()}10 minutes before you should
        leave for the airport. Would you like a reminder to be sent the morning of
        the pickup as well? </h2>
      <button onClick={() => {
        this.props.show()
        this.finalizeInfo(true)}}>Yes</button>
      <button onClick={() => {
        this.props.show()
        this.finalizeInfo(false)}}>No</button>
    </div>)

    return (
      <div style={{'display': `${this.props.display}`}}>
        <h1>How do you want us to send you a reminder for the pickup?</h1>
        <h2>Do you want us to send you a text? If so give us a number to use.</h2>
        <input onChange={(e)=>{this.handleNumNumChange(e.target.value)}} placeholder="888-888-8888"/>{this.state.phoneNumNum?this.state.valPhone:null}
        <h2>Would you like an email as a reminder? We can do that too!</h2>
        <input onChange={(e)=>{this.handleEmailChange(e.target.value)}} placeholder="example@email.com"/>{this.state.email ? this.state.valEmail:null}
        <br />
        {this.validPhone(this.state.phoneNumNum)|| this.validateEmail(this.state.email)? messageParagraph:null}

      </div>
    );
  }
}
