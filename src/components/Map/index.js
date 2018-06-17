import React from 'react'
import { compose, withProps } from "recompose"
import { 
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from "react-google-maps"

import './Map.css';
import demoFancyMapStyles from "./mapStyle.json"

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCyUEm4QnIPQP7ggU9QUq21oPZO76P10Do",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="map" />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({zoomLevel}) => (
  <GoogleMap
    zoom={zoomLevel}
    defaultCenter={{ lat: 6.60184, lng: 3.35149 }}
    defaultOptions={{ styles: demoFancyMapStyles }}
  ></GoogleMap>
))

export default Map