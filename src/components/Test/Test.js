import React, {Component} from 'react'
import axios from 'axios'

export default class Text extends Component {

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
      </div>)
  }
}