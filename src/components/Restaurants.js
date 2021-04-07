import PropTypes from 'prop-types';
import RestaurantDetails from './RestaurantDetails';

export default function RestaurantsContainer({ data }) {
  return (
    <div className='restaurants-container'>
      <h2 className='restaurants-container__header'>
        {`${data.length} Restaurants:`}
      </h2>
      <div className='restaurants-container__restaurants'>
        {data.map((restaurant) => (
          <div key={restaurant.id} className='restaurant'>
            <div
              className='restaurant-image-div'
              onClick={() => window.open(restaurant.url, '_blank')}
              style={{
                background: `url(${restaurant.image}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            />
            <RestaurantDetails restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
}

RestaurantsContainer.propTypes = {
  data: PropTypes.array.isRequired,
};
