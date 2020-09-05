import React from 'react';
import { compose, withProps } from "recompose"
import { 
    GoogleMap, 
    withScriptjs, 
    withGoogleMap,
    Marker 
} from 'react-google-maps';

// import React from "react"

// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`,
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
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

class MyFancyComponent extends React.PureComponent {
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
// const Map = () => {
//     return(
//       <GoogleMap
//         defaultZoom={10} 
//         defaultCenter={{ lat: 137.090240, lng: -95.712891 }}>
//        </GoogleMap>
//     );
//   }
//   //container for map
  
//   const WrappedMap = withScriptjs(withGoogleMap(Map));
  
//   export default function MyMap() {
//        return(
//            <div style={{width: '100vw', height:'100vh' }}>
//              <WrappedMap
//               googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places10key=${process.env.REACT_APP_GOOGLE_KEY}`}
//               loadingElement={<div style={{ height: "100%" }} />}
//               containerElement={<div style={{ height: "100%" }} />}
//               mapElement={<div style={{ height: "100%" }} />}
//              />
//           </div>
//        );
//    }