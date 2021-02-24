import React from 'react';
import PropTypes from 'prop-types';
import './PopupInfo.scss'

function PopupInfo({ selectedRestaurant }) {
  return (
    <div className="restaurant-info__container">{selectedRestaurant.name}</div>
  );
}

PopupInfo.propTypes = {
  selectedRestaurant: PropTypes.object.isRequired,
};

export default React.memo(PopupInfo);
