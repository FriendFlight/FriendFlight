import React, {Component} from "react";
import axios from "axios";
import config from "../../config";

export default class FlightInput extends Component
{
constructor() {
  super()
  this.state = {flightNumLetters: '',
                flightNumNums: '',
                flightYear: '',
                flightMonth: '',
                flightDay: ''
            }
  this.handleFlightNumberChange=this.handleFlightNumberChange.bind(this);
  this.handleFlightDateChange=this.handleFlightDateChange.bind(this);
  this.sendTripInfo=this.sendTripInfo.bind(this);
}
  handleFlightNumberChange(value) {
    this.setState({
      flightNumLetters: value.substring(0,2),
      flightNumNums: value.substring(2),
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
    sendTripInfo(){
      axios.post('/api/flight', {flightNumber: this.state.flightNumLetters+this.state.flightNumNums,
         currentUserID: this.props.user.id, arrivalDate: this.state.flightWholeDate}).then(response => console.log(response.data))
      this.props.flight(`https://api.flightstats.com/flex/schedules/rest/v1/json/flight/${this.state.flightNumLetters}/${this.state.flightNumNums}/arriving/${this.state.flightYear}/${this.state.flightMonth}/${this.state.flightDay}?appId=${config.flightStats.appId}&appKey=${config.flightStats.key}`);
    }

  render()
  {
    return (
      <div>
        <h2>Enter the final flight number for the person that you are picking up</h2>
        <input placeholder="Flight Number EX: DL1234" onChange={(event)=> {this.handleFlightNumberChange(event.target.value)}}/>
        <input type="date" name="MM/DD/YYYY" onChange={(event)=> {this.handleFlightDateChange(event.target.value)}}/>
        <br />
        <h2>Go ahead and allow us to view your current location for travel planning.</h2>
        <button onClick={()=>{this.props.show()
          this.sendTripInfo()

          }}>Submit</button>
        <h3>Or you can give us an address you want to start your pickup from</h3>
        <input placeholder="Manually Enter Address" />
      </div>
    );
  }
}
