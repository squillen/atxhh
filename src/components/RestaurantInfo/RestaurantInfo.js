import React from 'react';
import PropTypes from 'prop-types';
import './RestaurantInfo.scss'

function RestaurantInfo({ selectedRestaurant }) {
  return (
    <div className="restaurant-info__container">{selectedRestaurant.name}</div>
  );
}

RestaurantInfo.propTypes = {
  selectedRestaurant: PropTypes.object.isRequired,
};

export default React.memo(RestaurantInfo);
