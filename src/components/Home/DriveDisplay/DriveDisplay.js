import React, {Component} from "react";

export default class DriveDisplay extends Component
{
  render()
  {
    return (
      <div style={{'display': `${this.props.display}`}}>
        <h1>Awesome, weve got everything we need to make sure you leave on time!</h1>
        <h1>We will be in touch!</h1>
        <h1>trip info</h1>
        <h2>It looks like your drive will take about (time) and be about (distance).</h2>
        <h2>Here is the fastest route to (airport) from your location. </h2>
        <div style={{"width": "100px", "height":"100px", "background":"lightblue"}} id="map">
        </div>
      </div>
    );
  }
}
