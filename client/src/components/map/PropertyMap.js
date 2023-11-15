// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import MarkerClusterGroup from 'react-leaflet-cluster'
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

import Bounds from "./Bounds";

import PropertyTooltip from "./PropertyTooltip";

import "leaflet/dist/leaflet.css";

import { Icon } from "leaflet";

const icon = new Icon({
  iconUrl: "/favicon.png",
  iconSize: [20, 20]
});

const PropertyMap = (props) => {
  const [propertyArr, setPropertyArr] = useState([]);
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/properties/polygon?neLat=` +
          props.bounds._northEast.lat +
          "&neLon=" + props.bounds._northEast.lng +
          "&swLon=" + props.bounds._southWest.lng +
          "&swLat=" + props.bounds._southWest.lat);

        if (response.ok) {
          const djson = await response.json();
          setPropertyArr(djson);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAll();
  }, [props.bounds]);

  const getPopUpPosition = () => {
    if (selected !== null) {
      return [selected.geometry.coordinates[1], selected.geometry.coordinates[0]];
    }
  };

  const changeSelectedState = (item) => {
    setSelected(item);
  };

  const handleModal = (item) => {
    setSelected(null);
  };

  const handleVisible = () => {
    navigate(`/properties/${selected._id}`);
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
          attribution={props.attribution}
        />
        <MarkerClusterGroup
          spiderfyOnMaxZoom={false}
          zoomToBoundsOnClick={true}
          showCoverageOnHover={true}
          removeOutsideVisibleBounds={false}
          disableClusteringAtZoom={props.maxZoom}
        >
          {propertyArr?.map((item, index) =>
            <Marker
              key={index}
              position={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
              eventHandlers={{
                click: () => {
                  changeSelectedState(item);
                },
              }}
              icon={icon}
            />
          )}
        </MarkerClusterGroup>
        {selected !== null &&
          <Popup
            position={getPopUpPosition()}
            onClose={() => setSelected(null)}

          >
            <PropertyTooltip property={selected} handleVisible={handleVisible} handleModal={handleModal} />
          </Popup>
        }
        <Bounds action={props.action} />
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
