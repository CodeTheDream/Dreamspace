import React, { useState } from "react"
import * as mapData from "../Map/map.js"
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import crewDirectory from '../../containers/Directory'

// import styled from 'styled-components'

import { 
withScriptjs, 
withGoogleMap, 
GoogleMap, 
Marker,
InfoWindow
} from "react-google-maps";


// const Button = styled.button`
//   cursor: pointer;
//   background: transparent;
//   font-size: 16px;
//   border-radius: 3px;
//   color: palevioletred;
//   border: 2px solid palevioletred;
//   margin: 0 1em;
//   padding: 0.25em 1em;
//   transition: 0.5s all ease-out;
 
//   &:hover {
//     background-color: palevioletred;
//     color: white;
//   }
// `;

function Map() {
  const [selectedPerson, setSelectedPerson] = useState(null);
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
         lng: selectedPerson.geometry.coordinates[1],
         }}

         onCloseClick={() => {
         setSelectedPerson(null);
       }}    

       >
         <div>
            <p>{selectedPerson.individual.name}</p><br></br>
            {/* <p>{selectedPerson.individual.language}</p>  */}
            <img style={{width: `100px`, height: `100px`, padding: `#232741`}} 
            src={selectedPerson.individual.image} alt="uploaded images" /> 
            {/* <Button>Click for Profile</Button> */}
             <a
               className="App-link"
               href="https://airtable.com/tbl6BlIjU9xtYPc3h/viw8KgO9S6wm4O7Y8?blocks=bipZ12rnUhaJi0Q7F"
               target="_blank"
               rel="noopener noreferrer"
        >      <br></br>
               Click Profile</a>               
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



