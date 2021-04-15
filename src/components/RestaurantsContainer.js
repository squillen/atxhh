import PropTypes from 'prop-types';
import BackgroundImageDiv from './BackgroundImageDiv';
import RestaurantDetails from './RestaurantDetails';

export default function RestaurantsContainer({ restaurantData }) {
  if (!restaurantData || !restaurantData.length) return null;
  return (
    <div className='restaurants-container'>
      <h2 className='restaurants-container__header'>
        {`${restaurantData.length} Restaurants:`}
      </h2>
      <div className='restaurants-container__restaurants'>
        {restaurantData.map((restaurant) => (
          <div key={restaurant._id} className='restaurant'>
            <BackgroundImageDiv images={restaurant.images} />
            <RestaurantDetails restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
}

RestaurantsContainer.propTypes = {
  restaurantData: PropTypes.array.isRequired,
};
