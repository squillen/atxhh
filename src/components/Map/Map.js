import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MapGL, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import Pins from '../Pins/Pins';
import PopupInfo from '../PopupInfo/PopupInfo';
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

function Map({ data, onClick, selectedRestaurant }) {
  const [showPopup, setShowPopup] = useState(false);
  const firstCoords = (data[0] && data[0].coordinates) || {};
  const [viewport, setViewport] = useState({
    latitude: +firstCoords.lat || 30.2717852,
    longitude: +firstCoords.lng || -97.7681922,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  const handleClick = (arg) => {
    onClick(arg);
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    if (selectedRestaurant) setShowPopup(true);
  }, [selectedRestaurant]);

  return (
    <MapGL
      {...viewport}
      width="50vw"
      height="80vh"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={setViewport}
      zoom={10}
      mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
    >
      <Pins data={data} onClick={handleClick} />
      {selectedRestaurant && showPopup && (
        <Popup
          tipSize={5}
          anchor="top-left"
          longitude={+selectedRestaurant.coordinates.lng}
          latitude={+selectedRestaurant.coordinates.lat}
          closeOnClick={false}
          onClose={() => setShowPopup(false)}
        >
          <PopupInfo selectedRestaurant={selectedRestaurant} />
        </Popup>
      )}
      <GeolocateControl style={geolocateStyle} />
      <FullscreenControl style={fullscreenControlStyle} />
      <NavigationControl style={navStyle} />
      <ScaleControl style={scaleControlStyle} />
    </MapGL>
  );
}

Map.propTypes = {
  data: PropTypes.array.isRequired,
  selectedRestaurant: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(Map);
