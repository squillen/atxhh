import PropTypes from 'prop-types';

export default function Restaurant({ restaurant }) {
  return <div className="restaurant-container">{restaurant.name}</div>;
}

Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired,
};
