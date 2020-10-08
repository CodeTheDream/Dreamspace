import React, { useState } from "react"
// import { compose, withProps } from "recompose"
import * as mapData from "../Map/map.json"
import { 
withScriptjs, 
withGoogleMap, 
GoogleMap, 
Marker,
InfoWindow
  
} from "react-google-maps"


function Map() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  return(
    <GoogleMap 
      defaultZoom={13}
      defaultCenter={{ lat: 20.516960, lng: -100.800262}} 
        > 
       {mapData.markers.map((person) => (
      <Marker 
      key={person.individual.person_id} 
      position={{
        lat: person.geometry.coordinates[0],
        lng: person.geometry.coordinates[1]
      }}
      onClick={() => {
        setSelectedPerson(person);
      }}
      />
      ))}
      {selectedPerson && (
        <InfoWindow
        position={{
        lat: selectedPerson.geometry.coordinates[0],
        lng: selectedPerson.geometry.coordinates[1]
      }}
      onCloseClick={() => {
        setSelectedPerson(null);
      }}
      >
          <div>
          {/* <h3>Hola!</h3> */}
          <p>{selectedPerson.individual.greeting}</p>
           <p>{selectedPerson.individual.name}</p>
            
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
      );
}
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function MapInit() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <WrappedMap 
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`} 
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
       mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}


// const Map = compose(
//   withProps({
//     googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`,
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `890px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap
// )((props) => 


//   <GoogleMap
//     defaultZoom={10}
//     defaultCenter={{ lat: 20.516960, lng: -100.800262 }}
    
//   >
  
//    {mapData.markers.map((person) => (
//      <Marker 
//      key={person.individual.person_id} 
//      position={{
//        lat: person.geometry.coordinates[0],
//        lng: person.geometry.coordinates[1]
//       }}

//       />
      
//     ))}
    
//   </GoogleMap>
// )

// class MyMapComponent extends React.PureComponent {
//   state = {
//     isMarkerShown: false,

//   }
//   componentDidMount() {
//     this.delayedShowMarker()
//   }

//   delayedShowMarker = () => {
//     setTimeout(() => {
//       this.setState({ isMarkerShown: true })
//     }, 3000)
//   }

//   handleMarkerClick = () => {
//     this.setState({ isMarkerShown: false })
//     this.delayedShowMarker()
//   }

//   render() {
//     return (
//       <Map
//         isMarkerShown={this.state.isMarkerShown}
//         onMarkerClick={this.handleMarkerClick}
//       />
     
//     )

//   }

// }


// export default Map;





