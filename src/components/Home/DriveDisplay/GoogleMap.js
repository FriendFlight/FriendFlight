import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps'
// import './GoogleMap.css'

import Script from 'react-load-script'

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

const Map = styled.div`
      
      max-width: 600px;
      height:50vh;
      margin: 10px;
      margin-top:20px;
    `
export default class GoogleMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      googleMapsLoaded: false
    }
  }

  initMap() {
    const google = window.google
    const map = new google.maps.Map(document.getElementById('map'), {
      center: this.props.to,
      scrollwheel: false,
      zoom: 7
    });

    const directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    });

    // Set destination, origin and travel mode.
    const request = {
      destination: this.props.from,
      origin: this.props.to,
      travelMode: 'DRIVING'
    };

    // Pass the directions request to the directions service.
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        // Display the route on the map.
        directionsDisplay.setDirections(response);
      }
    });
  }


  render() {
    return <div>
      <Script
        url="https://maps.googleapis.com/maps/api/js"
        onLoad={this.initMap.bind(this)}
      />
      <Map className="map" id="map"></Map>
    </div>
  }
}
