import React from 'react';
import { 
    GoogleMap, 
    withScriptjs, 
    withGoogleMap 
} from 'react-google-maps';


const Map = () => {
    return(
      <GoogleMap
        defaultZoom={10} 
        defaultCenter={{ lat: 137.090240, lng: -95.712891 }} 
        />
    );
  }
  //container for map
  const WrappedMap = withScriptjs(withGoogleMap(Map));
  
  export default function MyMap() {
      return(
          <div style={{width: '100vw', height:'100vh' }}>
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places10key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "100%" }} />}
              />
          </div>
      );
  }

// //   const Column = () =>{ 
// //     return(
// //   <div className="column-container">
// //     <section class="columns">
// //         <div class="column">
// //             <h2>1st Content Area</h2>
// //             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ratione architecto necessitatibus cum praesentium dolor totam voluptatibus recusandae?</p>
// //         </div>
  
// //         <div class="column">
// //             <h2>2nd Content Area</h2>
// //             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ratione architecto necessitatibus cum praesentium dolor totam voluptatibus recusandae? Illo quod nemo ratione itaque dolores laudantium error vero laborum blanditiis nostrum.</p>
// //         </div>
  
// //         <div class="column">
// //             <h2>3rd Content Area</h2>
// //             <p>Illo quod nemo ratione itaque dolores laudantium error vero laborum blanditiis nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ratione architecto cum praesentium voluptatibus recusandae?</p>
// //         </div>
// //     </section>	
// //   </div>
//     )
//   }

