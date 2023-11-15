// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import MarkerClusterGroup from 'react-leaflet-cluster'
import "leaflet/dist/leaflet.css";

import Bounds from "./Bounds";

import PropertyTooltip from "./PropertyTooltip";

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

function PropertyMap(props) {


  const [state, setState] = useState({
    propertyArr: [],
    selected: null,
  })


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/properties/polygon?neLat=` + props.bounds._northEast.lat
        + "&neLon=" + props.bounds._northEast.lng
        + "&swLon=" + props.bounds._southWest.lng
        + "&swLat=" + props.bounds._southWest.lat);

      if (response.ok) {
        const djson = await response.json();
        setState({
          propertyArr: djson,
        });
      }
    };
    fetchData();
  }, []);



  const setSelected = (selectedItem) => {
    setState(prevState => ({ ...prevState, selected: selectedItem }));
  };


  return (
    <div>
      <MapContainer
        center={props.center}
        zoom={props.zoom}
        minZoom={props.minZoom}
        maxZoom={props.maxZoom}
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
          url={props.tileUrl}
          attribution={props.attribution} />
        <MarkerClusterGroup
          spiderfyOnMaxZoom={false}
          zoomToBoundsOnClick={true}
          showCoverageOnHover={true}
          removeOutsideVisibleBounds={false}
          disableClusteringAtZoom={props.maxZoom}
        >
          {state.propertyArr?.map((item, index) =>
            <Marker
              key={index}
              position={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
              eventHandlers={{
                click: () => {
                  setState({ selected: item });
                },
              }}
              icon={icon}
            />
          )}

        </MarkerClusterGroup>

        {state.selected && (
          <Popup
            position={[state.selected.geometry.coordinates[1], state.selected.geometry.coordinates[0]]}
            onClose={() => setSelected(null)}
          >
            <PropertyTooltip property={state.selected} />
          </Popup>
        )}
        <Bounds action={props.action} />
      </MapContainer>
    </div>
  )
}


export default PropertyMap;