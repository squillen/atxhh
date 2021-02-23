import { useState } from 'react';
import PropTypes from 'prop-types';
import MapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import Pins from '../Pins/Pins';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  const firstCoords = (data[0] && data[0].coordinates) || {};
  const [viewport, setViewport] = useState({
    latitude: +firstCoords.lat || 30.2717852,
    longitude: +firstCoords.lng || -97.7681922,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });
  return (
    <MapGL
      {...viewport}
      width="50vw"
      height="80vh"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={setViewport}
      zoom={11}
      mapboxApiAccessToken={
        process.env.MAPBOX_TOKEN ||
        'pk.eyJ1Ijoic3F1aWxsZW44OCIsImEiOiJja2xjc25xbWUwdHh6MnBvMzE3czJ4eTI4In0.TNmrTPWKzbsvaJeXjLTSww'
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

Map.propTypes = {
  data: PropTypes.array.isRequired,
};
