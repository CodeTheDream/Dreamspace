import React, { useState } from "react"
import * as mapData from "./map"
import personpin from './personpin.svg'


import { 
withScriptjs, 
withGoogleMap, 
GoogleMap, 
Marker,
InfoWindow
} from "react-google-maps"
// import { faParking } from "@fortawesome/free-solid-svg-icons";




export const Map = (props) => {
const [selectedPerson, setSelectedPerson] = useState(null);

console.log('mapProps', props)
  
return(
     <GoogleMap 
       defaultZoom={3}
       defaultCenter={{ 
         lat: 20.516960, 
         lng: -100.800262 }} 
      > 
      {props.mapAPI.map((person) => (
        
        <Marker
          icon={personpin}
          key={person.id}
          position={{
            lat: person.fields.latitude,
            lng: person.fields.longitude
          }}
  
      onClick={() => {
        console.log('person', person.fields.Image)
        setSelectedPerson(person);
      }}
      />
      ))}
       
       {selectedPerson && (
         <InfoWindow
         position={{
         lat: selectedPerson.fields.latitude,
         lng: selectedPerson.fields.longitude }}

       onCloseClick={() => {
         setSelectedPerson(null);
       }}
       >
          <div>
            <p>{selectedPerson.fields.Name}</p>
            <p>{selectedPerson.fields.languages}</p>
            <img style={{width:'200px', height:'200px'}} src={selectedPerson.fields.Image[0].url} alt="uploaded images" />
          </div>                    
      </InfoWindow>
      )} 
    </GoogleMap>
  );

  }

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function MapInit(props) {
//console.log('MapInit', props)
   return (
     <div style={{ width: "100vw", height: "100vh" }}
     >
       <WrappedMap 
       googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`} 
       loadingElement={<div style={{ height: `100%` }} />}
       containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        mapAPI = {props.mapAPI}
       />
     </div>
   ); 
}



