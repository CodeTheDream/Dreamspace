import React, { useState } from "react"
import * as mapData from "../Map/map.json"
import cruzstate from './cruzstate.jpg'

import { 
withScriptjs, 
withGoogleMap, 
GoogleMap, 
Marker,
InfoWindow
} from "react-google-maps"
// import { faParking } from "@fortawesome/free-solid-svg-icons";


function Map() {
const [selectedPerson, setSelectedPerson] = useState(null);
// // let markers = mapData.markers.map((person, index) => { 
// // let geometry = person.geometry;
  
return(

     <GoogleMap 
       defaultZoom={13}
       defaultCenter={{ 
         lat: 20.516960, 
         lng: -100.800262 }} 
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
         lng: selectedPerson.geometry.coordinates[1] }}

       onCloseClick={() => {
         setSelectedPerson(null);
       }}
       >
          <div>
            <p>{selectedPerson.individual.name}</p>
            <p>{selectedPerson.individual.language}</p>
            <img src={cruzstate} alt="uploaded images"></img>           
          </div>                    
      </InfoWindow>
      )} 
    </GoogleMap>
  );

  }

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function MapInit() {
   return (
     <div style={{ width: "100vw", height: "100vh" }}
     >
       <WrappedMap 
       googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`} 
       loadingElement={<div style={{ height: `100%` }} />}
       containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
       />
     </div>
   ); 
}





//       onClick={() => {
//         setSelectedPerson(person);
//       }}

//       />
//       ))}
//       {selectedPerson && (
//         <InfoWindow
//         position={{
//         lat: selectedPerson.geometry.coordinates[0],
//         lng: selectedPerson.geometry.coordinates[1]

//       }}
//       onCloseClick={() => {
//         setSelectedPerson(null);
//       }}
//       >
//           <div>
//            <p>{selectedPerson.individual.name}</p>
//            <p>{selectedPerson.individual.language}</p>
//            <img src={cruzstate} alt="uploaded images"></img>


//             {/* <img src="../images/cruzstate.jpg" margin="auto" alt="cruzstate"></img>    */}
//            </div>



//             {/* <img src="../images/cruzstate.jpg" margin="auto" alt="cruzstate"></img>  */} 



                      
//          </InfoWindow>
//       )} 




