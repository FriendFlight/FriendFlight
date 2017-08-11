import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'

export default class Text extends Component {

  constructor() {
    super()
    this.state = {
      phoneNumber: '',
      message: '',
      scheduledPhoneNumber: '',
      scheduledMessage: '',
      email: '',
    }

    this.sendText = this.sendText.bind(this)
    this.sendScheduledText = this.sendScheduledText.bind(this)
    this.sendEmail = this.sendEmail.bind(this)
  }

  componentWillMount() {
    console.log(this)
  }

  postTrip() {
    axios.post('/api/flight', {flightNumber: 'X473', arrivalDate: '2017-08-09', currentUserID: '1'}).then(response => console.log(response.data))
  }

  postDriverLocation() {
    axios.post('/api/location', {latitude: 71.999888, longitude: -65.002244, currentUserID: '1'}).then(response => console.log(response.data))
  }

  //getCommuteData()

  updateNotificationPref() {
    //tripID should come from state
    //updateNotificationPref should either be a toggle, or should wait until moving on to be updated
    axios.put('/api/notification-pref', {tripID: 1, morningOfNotification: false}).then(response => console.log(response.data))
  }

  sendText() {
    axios.post('/api/send-text', {phoneNumber: `+1${this.state.phoneNumber}`, message: this.state.message }).then(response => console.log(response.data))
  }

  sendScheduledText() {
    const date = new Date('2017-08-11T14:45:00.000');
    axios.post('/api/send-text/scheduled', {date: date, phoneNumber: `+1${this.state.phoneNumber}`, message: this.state.message }).then(response => console.log(response.data))
  }

  handleNumberChange(value) {

    this.setState({
      phoneNumber: value,
    })
  }

  handleMessageChange(value) {
    this.setState({
      message: value
    })
  }
  handleScheduledNumberChange(value) {

    this.setState({
      phoneNumber: value,
    })
  }

  handleScheduledMessageChange(value) {
    this.setState({
      message: value
    })
  }

  handleEmailChange(value) {
    this.setState({
      email: value
    })
  }

  sendRealNotification(notificationType) {
    //use this.props.flight to calculate date and time to send message
    let timeFromAirline = new Date('2017-08-11T16:50:00.000')
    let tripDurationInSeconds = 2700 + 300
    const date = moment(timeFromAirline).subtract(tripDurationInSeconds, 'seconds').toDate()

    if(notificationType === "EMAIL") {
      axios.post('/api/send-email/scheduled', {email:'jordan@cooperplanet.com', date: date}).then(response => console.log(response.data))
    }
    else {
      axios.post('/api/send-text/scheduled', {phoneNumber:'+18018376861', date: date, message: 'Time ta go!'}).then(response => console.log(response.data))
    }
  }

  sendEmail() {
    axios.post('/api/send-email', {email:this.state.email}).then(response => console.log(response.data))
  }

  render() {  
    return(
      <div>
        <div>
          Post Trip
          <button onClick={this.postTrip}>Ryuu ga waga teki wu kurao!</button>
        </div>
        <div>
          Post Driver Location
          <button onClick={this.postDriverLocation}>I need healing</button>
        </div>
        <div>
          Update Trip
          <button onClick={this.updateNotificationPref}>Mada mada</button>
        </div>
        <div>
          Send a Text
          <input placeholder="Number" onChange={(e)=> {this.handleNumberChange(e.target.value)}}/>
          <input placeholder="Message" onChange={(e)=> {this.handleMessageChange(e.target.value)}}/>
          <button onClick={this.sendText}>Let the dargon consume you</button>
        </div>
        <div>
          Send a Text in 5 minutes
          <input placeholder="Number" onChange={(e)=> {this.handleScheduledNumberChange(e.target.value)}}/>
          <input placeholder="Message" onChange={(e)=> {this.handleScheduledMessageChange(e.target.value)}}/>
          <button onClick={this.sendScheduledText}>The dargon becomes you</button>
        </div>
        <div>
          Send an email
          <input placeholder="yourMom.com" onChange={(e)=> {this.handleEmailChange(e.target.value)}}/>
          <button onClick={this.sendEmail}>See through the dARGons i's</button>
        </div>
        <div>
          Send the REAL text
          <button onClick={() => {this.sendRealNotification("TEXT")}}>is that a pro gunjo</button>
        </div>
      </div>)
  }
}