import React, {Component} from "react";

export default class FlightInput extends Component
{
  render()
  {
    return (
      <div>
        <h2>Enter the final flight number for the person that you are picking up</h2>
        <input placeholder="Flight Number" />
        <input placeholder="Arrival Date" />
        <br />
        <h2>Go ahead and allow us to view your current location for travel planning.</h2>
        <button onClick={this.props.show}>Allow location access</button>
        <h3>Or you can give us an address you want to start your pickup from</h3>
        <input placeholder="Manually Enter Address" />
      </div>
    );
  }
}
