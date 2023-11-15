import React, { useState, useEffect } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,

} from "react-leaflet";

import { Icon } from "leaflet";

import MapConfig from "../../utils/map";


import MarkerClusterGroup from 'react-leaflet-cluster'
import "leaflet/dist/leaflet.css";

const icon = new Icon({
    iconUrl: "/home_tip.png",
    iconSize: [20, 20]
});


// import "react-leaflet-markercluster/dist/styles.min.css";

function PropertyMap(props) {

    return (

        <MapContainer style={{ height: "100vh", width: "100vw" }}
            center={MapConfig.center}
            zoom={MapConfig.intitialZoom}
            minZoom={MapConfig.minZoom}
            maxZoom={MapConfig.maxZoom}
            zoomControl={true}
            updateWhenZooming={false}
            updateWhenIdle={true}
            preferCanvas={true}
            scrollWheelZoom={false}>
            <TileLayer
                url={MapConfig.tileUrl}
                attribution={MapConfig.attribution} />
            <MarkerClusterGroup
                spiderfyOnMaxZoom={false}
                zoomToBoundsOnClick={true}
                showCoverageOnHover={true}
                removeOutsideVisibleBounds={false}
                disableClusteringAtZoom={MapConfig.maxZoom}
            >

                <Marker

                    position={[45.2222, -73.1200]}
                    icon={icon}

                />


            </MarkerClusterGroup>

        </MapContainer>
    )

}


export default PropertyMap;