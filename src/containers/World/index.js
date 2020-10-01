import React, { Component } from 'react';
// import { GoogleMap } from 'react-google-maps'; 
import Map from "../../components/Map";
import { 
  GoogleMap, 
  withScriptjs, 
  withGoogleMap,

} from 'react-google-maps';


const Unimap = () => {
  return(
      <GoogleMap
        defaultZoom={13} 
        defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
        />
    );
  }

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
      <Map
      
        getClickOnPin = {this.getClickOnPin}
      />
    </div>
 
    )
  
  }
};


export default World;