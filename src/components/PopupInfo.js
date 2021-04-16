import React from 'react';
import PropTypes from 'prop-types';
import { displayCuisines, handleRating } from '../utils/helpers';

function PopupInfo({ selectedRestaurant }) {
  return (
    <div className='restaurant-info__container'>
      <div className='popup-header'>{selectedRestaurant.name}</div>
      <div className='info'>{displayCuisines(selectedRestaurant.cuisine)}</div>
      <div className='info'>
        <span>Our rating: {handleRating(selectedRestaurant.rating)}</span>
        <span>
          <sub>/10</sub>
        </span>
      </div>
    </div>
  );
}

PopupInfo.propTypes = {
  selectedRestaurant: PropTypes.object.isRequired,
};

export default React.memo(PopupInfo);
