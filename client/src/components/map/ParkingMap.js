// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

import Bounds from "./Bounds";

import ParkingTooltip from "./ParkingTooltip";

import { Icon } from "leaflet";

const icon = new Icon({
  iconUrl: "/home_tip.png",
  iconSize: [20, 20]
});



/**
 * Class component renders react-leaftlet map component.
 * The Component's state contains a list of parking streets
 * in the city of montreal and the selected street. When the component
 * is initially invoked, react lifecycle method componentdidMount
 * fetches data within the initial bounds the parent sent as props.
 * After that react lifecycle method componentdidUpdate will fetche data
 * and setState whenever the bounds change. The data retrieved from the server
 * will be used for markers attributes and the tooltip display.
 */

class ParkingMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      propertyArr: [],
      selected: null,
    }
  }

  /**
   * Fetch all data when component mounts. 
   */
  async componentDidMount() {

    await this.fetchAll();

  }

  /**
   * Fetch data when component updates
   * @param {*} prevProps 
   */
  async componentDidUpdate(prevProps) {
    if (prevProps.bounds !== this.props.bounds) {
      await this.fetchAll();
    }
  }

  /**
   * Fetch all the data within a certain bounds
   */
  async fetchAll() {

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/properties/polygon?neLat=` + this.props.bounds._northEast.lat
      + "&neLon=" + this.props.bounds._northEast.lng
      + "&swLon=" + this.props.bounds._southWest.lng
      + "&swLat=" + this.props.bounds._southWest.lat);

    if (response.ok) {
      const djson = await response.json();
      this.setState({
        propertyArr: djson,
      });
    }
  }
  /**
   * Helper method returns the position of
   * the popUp attribute.
   * @returns array of latitude and longtitude.
   */
  getPopUpPosition() {
    if (this.state.selected !== null) {
      return [this.state.selected.geometry.coordinates[1], this.state.selected.geometry.coordinates[0]];


    }
  }

  /**
   * This method checks if the selected street is not
   * null and returns the popUp component. The popUp contains
   * a custom toolTip component that displays data given as props.
   * @returns PopUp component
   */
  popUp() {

    if (this.state.selected !== null) {

      return <Popup
        position={this.getPopUpPosition()}
        onClose={() => this.setState({ selected: null })}
      >
        <ParkingTooltip property={this.state.selected} />
      </Popup >
    }

  }

  /**
   * Method returns a MapContainer with all other components
   * (TileLayer, Markers, ToolTip and the Bounds)needed to render a map.
   * @returns map
   */
  render() {
    return (
      <div>
        <MapContainer
          center={this.props.center}
          zoom={this.props.zoom}
          minZoom={this.props.minZoom}
          maxZoom={this.props.maxZoom}
          zoomControl={false}
          updateWhenZooming={false}
          updateWhenIdle={true}
          preferCanvas={true}
          style={{
            width: "100%",
            position: "absolute",
            top: 0,
            bottom: 0,
            zIndex: -1
          }}
        >
          <TileLayer
            url={this.props.tileUrl}
            attribution={this.props.attribution} />
          <MarkerClusterGroup
            spiderfyOnMaxZoom={false}
            zoomToBoundsOnClick={true}
            showCoverageOnHover={true}
            removeOutsideVisibleBounds={false}
            disableClusteringAtZoom={this.props.maxZoom}
          >
            {this.state.parkingArr.map((item, index) =>
              <Marker
                key={index}
                position={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
                eventHandlers={{
                  click: () => {
                    this.setState({ selected: item });
                  },
                }}
                icon={icon}
              />
            )}

          </MarkerClusterGroup>

          {this.popUp()}
          <Bounds action={this.props.action} />
        </MapContainer>
      </div>
    )
  }
}

export default ParkingMap;