import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import Pins from './Pins';
import PopupInfo from './PopupInfo';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useWindowListeners } from '../hooks/helpers';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

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

const mobileCheck = window.innerWidth < 900;

function Map({ data, onClick, selectedRestaurant }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isDesktop, setIsDesktop] = useState(!mobileCheck);
  const [popupRestaurant, setPopupRestaurant] = useState(null);
  const firstCoords = (data[0] && data[0].coordinates) || {};
  const [viewport, setViewport] = useState({
    latitude: +firstCoords.lat || 30.2717852,
    longitude: +firstCoords.lng || -97.7681922,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });

  const handleClick = (arg) => {
    onClick(arg);
    setShowPopup(!showPopup);
  };

  const handleHover = (arg) => {
    setPopupRestaurant(arg);
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    if (selectedRestaurant) setShowPopup(true);
  }, [selectedRestaurant]);
  function handleResize() {
    const isMobile = mobileCheck;
    setIsDesktop(!isMobile);
  }
  useWindowListeners('resize', handleResize);
  return (
    <ReactMapGL
      {...viewport}
      width={isDesktop ? '50vw' : ''}
      height={isDesktop ? '80vh' : '50vh'}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      <Pins data={data} onHover={handleHover} onClick={handleClick} />
      {popupRestaurant && showPopup && (
        <Popup
          tipSize={5}
          anchor='top-left'
          longitude={+popupRestaurant.coordinates.lng}
          latitude={+popupRestaurant.coordinates.lat}
          closeOnClick={false}
          onClose={() => setShowPopup(false)}
        >
          <PopupInfo selectedRestaurant={popupRestaurant} />
        </Popup>
      )}
      <GeolocateControl style={geolocateStyle} />
      <FullscreenControl style={fullscreenControlStyle} />
      <NavigationControl style={navStyle} />
      <ScaleControl style={scaleControlStyle} />
    </ReactMapGL>
  );
}

Map.propTypes = {
  data: PropTypes.array.isRequired,
  selectedRestaurant: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(Map);
