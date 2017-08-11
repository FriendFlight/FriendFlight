import React, {Component} from "react";
import GoogleMap from './GoogleMap';

export default class DriveDisplay extends Component
{
  render()
  {
    return (
      <div style={{'display': `${this.props.display}`}}>
        {this.props.flight?(<div>
                              <h1>Awesome, weve got everything we need to make sure you leave on time!</h1>
                              <h1>We will be in touch!</h1>
                              <h1>trip info</h1>
                              <h2>It looks like your drive will take about {this.props.flight.directions.routes[0].legs[0].duration.text} and be about {this.props.flight.directions.routes[0].legs[0].distance.text}.</h2>
                              <h2>Here is the fastest route to {this.props.flight.info[0].appendix.airports[1].name} from your location. </h2>
                              <GoogleMap from={{lat: 41.85, lng: -87.65}} to={{lat: 39.79, lng: -86.14}}/>
                            </div>):null}
      </div>
    );
  }
}
