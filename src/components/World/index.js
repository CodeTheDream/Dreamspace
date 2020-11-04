import React, { Component } from 'react';
// import { GoogleMap } from 'react-google-maps'; 
import Map from "../Map";
import { 
  // GoogleMap, 
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
      console.log(this.props.projectAirTable);
    return (
    <div>
      <div className="map-toggle" onClick={this.props.toggleMap}>Toggle Map</div>
      <Map
        getClickOnPin = {this.getClickOnPin}
      />

    </div>
    )
  }
  
};

// const worldMap = () => {
//   return <GoogleMap
//             defaultZoom={10} 
//             defaultCenter={{ lat: 137.090240, long: -95.712891 }} />;
// }
export default World;