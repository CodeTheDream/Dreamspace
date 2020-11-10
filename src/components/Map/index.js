import React, { useState } from "react"
import * as mapData from "../Map/map.js"
import { Link } from 'react-router-dom';




// import styled from 'styled-components'

import { 
withScriptjs, 
withGoogleMap, 
GoogleMap, 
Marker,
InfoWindow
} from "react-google-maps";


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
         <p>{selectedPerson.individual.name}</p>
         <img style={{width: `100px`, height: `100px`, padding: `#232741`}} 
          src={selectedPerson.individual.image} alt="uploaded images" /> 

         <a href="https://api.airtable.com/v0/appQSPi3XUdUMbM1m/Projects" class="image_links" data-image="leaves/Map/image/practiceimage.jpg">Picture 1 In modal dialog</a><br></br>
         {/* +
      '<a href="#" class="image_links" data-image="https://www.gstatic.com/webp/gallery3/1.sm.png">Picture 2 In modal dialog</a>';
         
         <a href="https://api.airtable.com/v0/appQSPi3XUdUMbM1m/Projects" class="image_links" data-image="https://www.pexels.com/photo/frosted-leaves-3906084/">Picture 1 In modal dialog</a><br></br> */}
      {/* <a href="#" class="image_links" data-image="https://www.gstatic.com/webp/gallery3/1.sm.png">Picture 2 In modal dialog</a>; */}

            
            
           
                      
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



