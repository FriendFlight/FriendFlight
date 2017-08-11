import React, {Component} from "react"
import GoogleMapsLoader from 'google-maps'



export default class GoogleMap extends Component {
  constructor() {
    super()
    this.state = {
      map: null,
    }
  }

  componentDidMount() {
    GoogleMapsLoader.load((google) => {
      console.log(this.props.to)
      const map = new google.maps.Map(this.refs.map,{
        center: this.props.to,
        zoom: 8
      })

      const directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
      });

      const request = {
        destination: this.props.from,
        origin: this.props.to,
        travelMode: 'DRIVING'
      }

      const directionsService = new google.maps.DirectionsService();
      directionsService.route(request, function(response, status) {
        if (status === 'OK') {
          // Display the route on the map.
          directionsDisplay.setDirections(response);
        }
      })

  })

  }

  render() {
    return(
      <div>
        <div ref="map" style={{width:500, height: 500, border: '1px solid black'}}>
          I should be a map!
        </div>
      </div>
    )
  }
}