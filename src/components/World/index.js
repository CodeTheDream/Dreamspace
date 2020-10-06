import React, { Component } from 'react';
// import { GoogleMap } from 'react-google-maps'; 
<<<<<<< HEAD:src/containers/World/index.js
import Map from "../../components/Map";

=======
import Map from "../Map";
>>>>>>> 974c0e0a60cedb6d48d5300ce933348c0d5d20bc:src/components/World/index.js
import { 
  GoogleMap, 
  withScriptjs, 
  withGoogleMap 
} from 'react-google-maps';


// const Unimap = () => {
//   return(
//       <GoogleMap
//         defaultZoom={10} 
//         defaultCenter={{ lat: 137.090240, lng: -95.712891 }} 
//         />
//     );
//   }

  const myMap = withScriptjs(withGoogleMap(Map));


class World extends Component {
  state = {
    
    pinClick: false,
  };
  getClickOnPin = () => {
    this.setState(
      prevState => ({pinClick:!prevState.pinClick}), 
      () => console.log(this.state.pinClick)
    );
  }

    render () {
    return (
    <div>
      <div className="map-toggle" onClick={this.props.toggleMap}>Toggle Map</div>
      <Map
        getClickOnPin = {this.getClickOnPin}
      />

    </div>
<<<<<<< HEAD:src/containers/World/index.js

 
    )
 
=======
    )
>>>>>>> 974c0e0a60cedb6d48d5300ce933348c0d5d20bc:src/components/World/index.js
  }
  
};

// const worldMap = () => {
//   return <GoogleMap
//             defaultZoom={10} 
//             defaultCenter={{ lat: 137.090240, long: -95.712891 }} />;
// }
export default World;