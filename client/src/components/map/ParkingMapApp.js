// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import ParkingMap from "./ParkingMap";
import MapConfig from "../../utils/map";


/**
 * Main app component has the bounds in its state and binds
 * a method that will be used as a callback to change the bounds.
 * The Class renders the map component given map configuration
 * parameters as props as well as the callBack to change its state.
 */
class ParkingMapApp extends Component {

  constructor(props) {
    super(props)
    this.state = { bounds: MapConfig.bounds }
    this.setBounds = this.setBounds.bind(this);
  }

  setBounds(newBounds) {
    this.setState({ bounds: newBounds });
  }

  render() {
    return (
      <ParkingMap
        attribution={MapConfig.attribution}
        tileUrl={MapConfig.tileUrl}
        center={MapConfig.center}
        zoom={MapConfig.intitialZoom}
        minZoom={MapConfig.minZoom}
        maxZoom={MapConfig.maxZoom}
        action={this.setBounds}
        bounds={this.state.bounds}
      />
    )
  }
}

export default ParkingMapApp;