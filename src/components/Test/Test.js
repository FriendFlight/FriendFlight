import React, {Component} from 'react'
import axios from 'axios'

export default class Text extends Component {

  postTrip() {
    axios.post('/api/flight', {flightNumber: 'X473', currentUserID: '1'}).then(response => console.log(response.data))
  }

  postDriverLocation() {
    axios.post('/api/location', {latitude: 71.999888, longitude: -65.002244, currentUserID: '1'}).then(response => console.log(response.data))
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
      </div>)

  }
}