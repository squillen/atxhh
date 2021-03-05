import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { displayCuisines } from '../../utils/helpers';

function PopupInfo({ selectedRestaurant }) {
  return (
    <div className="restaurant-info__container">
      <div className="header">{selectedRestaurant.name}</div>
      <div className="info">{displayCuisines(selectedRestaurant.cuisine)}</div>
    </div>
  );
}

PopupInfo.propTypes = {
  selectedRestaurant: PropTypes.object.isRequired,
};

export default React.memo(PopupInfo);
