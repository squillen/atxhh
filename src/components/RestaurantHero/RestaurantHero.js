import React from 'react';
import PropTypes from 'prop-types';
import './RestaurantHero.scss';
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails'
import BackgroundImageDiv from '../BackgroundImageDiv';

function RestaurantHero({ restaurant }) {
  const { id, image } = restaurant
  return (
    <div id={id} className="hero-container">
      <div className="hero-container--image">
        <BackgroundImageDiv image={image} />
      </div>
      <RestaurantDetails restaurant={restaurant} />
    </div>
  );
}

RestaurantHero.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

export default React.memo(RestaurantHero);
