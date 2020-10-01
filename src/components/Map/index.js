import React, { Component } from "react"
import { compose, withProps } from "recompose"
import { 
  withScriptjs, 
  withGoogleMap, 
  GoogleMap, 
  Marker
  
} from "react-google-maps"


const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `700px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    
  >
  
   {props.isMarkerShown && 
    <Marker position={{ lat: -34.397, lng: 150.644 }} 
    onClick={props.onMarkerClick} />} 
    
  </GoogleMap>
)

class MyMapComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,

  }
  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <Map
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}


export default Map;





