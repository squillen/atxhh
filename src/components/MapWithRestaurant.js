import { useState } from 'react';
import PropTypes from 'prop-types';

import Map from './Map';
import RestaurantDetails from './RestaurantDetails';

export default function MapWithRestaurant({ restaurantData }) {
  if (!restaurantData || !restaurantData.length) return null;
  const [selectedRestaurant, setSelectedRestaurant] = useState(
    restaurantData[0],
  );
  return (
    <div className='map-section'>
      <div className='left-side'>
        {selectedRestaurant && (
          <div className='map'>
            <Map
              data={restaurantData}
              onClick={setSelectedRestaurant}
              selectedRestaurant={selectedRestaurant}
            />
          </div>
        )}
      </div>
      <div className='right-side'>
        {selectedRestaurant ? (
          <div className='hero-container'>
            <div
              onClick={() => window.open(selectedRestaurant.url, '_blank')}
              className='image-div'
              style={{
                background: `url(${selectedRestaurant.image}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            />
            <RestaurantDetails restaurant={selectedRestaurant} />
          </div>
        ) : (
          <div className='no-results'>no restaurant selected</div>
        )}
      </div>
    </div>
  );
}

MapWithRestaurant.propTypes = {
  restaurantData: PropTypes.array.isRequired,
};
