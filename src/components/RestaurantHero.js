import React from 'react';
import PropTypes from 'prop-types';
import RestaurantDetails from './RestaurantDetails';
import BackgroundImageDiv from './BackgroundImageDiv';

function RestaurantHero({ restaurant }) {
  const { id, images } = restaurant;
  return (
    <div id={id} className='hero-container'>
      <div className='hero-container--image'>
        <BackgroundImageDiv images={images} />
      </div>
      <RestaurantDetails restaurant={restaurant} />
    </div>
  );
}

RestaurantHero.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

export default React.memo(RestaurantHero);
