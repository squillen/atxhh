import { useState } from 'react';
import MapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import Pins from '../Pins/Pins';

const geolocateStyle = {
  top: 0,
  left: 0,
  padding: '10px',
};

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: '10px',
};

const navStyle = {
  top: 72,
  left: 0,
  padding: '10px',
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: '10px',
};

export default function Map({ data }) {
  const [viewport, setViewport] = useState({
    latitude: 30.2717852,
    longitude: -97.7681922,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });
  return (
    <MapGL
      {...viewport}
      width="90vw"
      height="50vh"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={setViewport}
      mapboxApiAccessToken={
        process.env.MAPBOX_TOKEN
      }
    >
      <Pins data={data} onClick={() => {}} />
      <GeolocateControl style={geolocateStyle} />
      <FullscreenControl style={fullscreenControlStyle} />
      <NavigationControl style={navStyle} />
      <ScaleControl style={scaleControlStyle} />
    </MapGL>
  );
}
