import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Map extends Component {
  render() {
    return (
      <GoogleMap
        onClick={this.props.mapHandleClick}
        defaultZoom={4}
        defaultCenter={{ lat: 44.9742, lng: -93.234200 }}>
          <Marker onDragEnd={this.props.mapHandleClick} draggable={true} position={this.props.marker} />
      </GoogleMap>
    );
  }
}

export default withGoogleMap(Map);
