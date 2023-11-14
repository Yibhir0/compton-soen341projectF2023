import {
  useMapEvents,
} from "react-leaflet";

/**
 * React-leaflet hook provided by Professor Jaya.
 * The hook invokes the callback in the props everytime the map
 * is panned or zoomed. When the new bounds are retrieved (mapEvents.getBounds()),
 * the bounds state in the main app are set to new bounds. 
 * @param {*} props 
 * @returns 
 */
function Bounds(props) {
  const mapEvents = useMapEvents({
    "moveend": () => {
      props.action(mapEvents.getBounds());
    },
    "zoom": () => {
      props.action(mapEvents.getBounds());
    },
  });
  return null
}

export default Bounds;

