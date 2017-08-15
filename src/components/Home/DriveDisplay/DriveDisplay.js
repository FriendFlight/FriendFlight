import React, {Component} from "react";
import GoogleMap from './GoogleMap';

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

    
export default class DriveDisplay extends Component
{
  render()
  {
    let googleMap = null
    if(this.props.display === 'block') {
      googleMap = (<GoogleMap to={`${this.props.flight.directions.routes[0].legs[0].start_location.lat}, ${this.props.flight.directions.routes[0].legs[0].start_location.lng}`}
                              from={`${this.props.flight.directions.routes[0].legs[0].end_location.lat}, ${this.props.flight.directions.routes[0].legs[0].end_location.lng}`}/>)
    }
    return (
      <div style={{'display': `${this.props.display}`}}>
        {this.props.flight?(<div>
          <Padder>Awesome, weve got everything we need to make sure you leave on time!</Padder>
          <Padder>We will be in touch!</Padder>
          <br/>
          <Padder>It looks like your drive will take about {this.props.flight.directions.routes[0].legs[0].duration.text} and be about {this.props.flight.directions.routes[0].legs[0].distance.text}.</Padder>
          <Padder>Here is the fastest route to {this.props.flight.info[0].appendix.airports[this.props.airportIndex].name} from your location. </Padder>
          {googleMap}
        </div>):null}
      </div>
    );
  }
}
