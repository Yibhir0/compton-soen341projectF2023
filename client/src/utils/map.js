

/**
 * Map configuration variables
 */

const MapConfig = {

  // eslint-disable-next-line max-len
  attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
  tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  center: [45.5017, -73.5673],

  // The format mapEvents.getBounds() returns
  bounds: {
    _southWest: {
      lat: 45.2222,
      lng: -73.1200
    },
    _northEast: {
      lat: 45.9111,
      lng: -73.9890
    }
  },
  minZoom: 1,
  maxZoom: 18,
  intitialZoom: 8
}

export default MapConfig;

