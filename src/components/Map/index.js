import React, { useState } from "react"
import * as mapData from "../Map/map.js"
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { 
withScriptjs, 
withGoogleMap, 
GoogleMap, 
Marker,
InfoWindow
} from "react-google-maps";

const Button = styled.button`
  cursor: pointer;
  background: blue;
  font-size: 10px;
  border-radius: 22px;
  color: white;
  border: 2px blue;  
  margin: 0 1em;
  padding: .5em 1em;
  transition: 0.5s all ease-out;
  background-color: blue;
  font-weight: bold;
  
  &:hover {
    background-color: orange;
    color: white;
  
  }
`;

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
         lat: selectedPerson.geometry.coordinates[0], lng: selectedPerson.geometry.coordinates[1], }}

         onCloseClick={() => {
         setSelectedPerson(null);
        
       }}    
       >
         <div>
            <p style={{ color: `black`, fontSize: `18px`, fontWeight: `bold`,}}
            >{selectedPerson.individual.name}</p><br></br>

            <p style={{ color: `black`, fontSize: `15px`, fontWeight: `bold`, }}
            >{selectedPerson.individual.language}</p><br></br>

            <p style={{ color: `black`, fontSize: `15px`, fontWeight: `bold`, }}
            >{selectedPerson.individual.stack}</p> 

            <img style=
            {{ width: `100px`, height: `100px`, padding: `5px`, marginTop: `10px`, background: `blue`, }} 
            src={selectedPerson.individual.image} alt="uploaded images" /><br></br><br></br>

            <Button className="Btn" onClick='profile'>View Profile</Button> <br /><br />

            <i style= {{ color: `orange`, padding:` 5px`, }} className="fa fa-envelope fa-7px"/> 

            <i style= {{ color: `orange`, padding: `5px`, }} className="fab fa-github-square fa-7px"></i>

            <i style= {{ color: `orange`, padding: `5px`, }} className="fab fa-linkedin fa-7px"></i>          
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



