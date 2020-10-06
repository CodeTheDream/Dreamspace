import React from "react"
import { compose, withProps } from "recompose"
import * as mapData from "../Map/map.json"
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
    containerElement: <div style={{ height: `890px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
<<<<<<< HEAD
    defaultZoom={10}
    defaultCenter={{ lat: 20.516960, lng: -100.800262 }}
=======
    defaultZoom={3}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
>>>>>>> 974c0e0a60cedb6d48d5300ce933348c0d5d20bc
    
  >
  
   {mapData.markers.map((person) => (
     <Marker 
     key={person.individual.person_id} 
     position={{
       lat: person.geometry.coordinates[0],
       lng: person.geometry.coordinates[1]
      }}/>
    ))}
    
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
  //  <Legend />
  }

}


export default Map;





