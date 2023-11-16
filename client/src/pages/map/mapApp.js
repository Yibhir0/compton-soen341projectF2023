// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropertyMap from "../../components/map/PropertyMap";
import MapConfig from "../../utils/map";


const PropertyMapApp = () => {

    const [state, setState] = useState({
        bounds: MapConfig.bounds
    })

    // Change the state when search is trigered
    const setBounds = (newBounds) => {
        changeState(newBounds);
    }

    // Change the state when search is trigered
    const changeState = (newBounds) => {
        setState({ bounds: newBounds });
    }


    return (
        <PropertyMap
            attribution={MapConfig.attribution}
            tileUrl={MapConfig.tileUrl}
            center={MapConfig.center}
            zoom={MapConfig.intitialZoom}
            minZoom={MapConfig.minZoom}
            maxZoom={MapConfig.maxZoom}
            action={setBounds}
            bounds={state.bounds}
        />
    )
}

export default PropertyMapApp

