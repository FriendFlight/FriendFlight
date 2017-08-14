import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps'
import './GoogleMap.css'

import Script from 'react-load-script'

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
      <div className="map" id="map"></div>
    </div>
  }
}
