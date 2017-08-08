import React, {Component} from 'react'
import axios from 'axios'

export default class Text extends Component {

  postTrip() {
    axios.post('/api/flight', {flightNumber: 'X473', currentUserID: '1'}).then(response => console.log(response.data))
  }

  render() {

    return(
      <div>
        This is a test
        <button onClick={this.postTrip}>clickitorticket</button>
      </div>)

  }
}