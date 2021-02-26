import PropTypes from 'prop-types';
import './styles.scss';

export default function RestaurantDetails({ restaurant }) {
  const { description, when, cuisine, url, name, price } = restaurant;
  const dollarSignsDisplay = [];
  for (let i = 0; i < 4; i++) {
    if (i + 1> +price)
      dollarSignsDisplay.push(<span className="dollar-sign">$</span>);
    else dollarSignsDisplay.push(<span className="dollar-sign--green">$</span>);
  }
  return (
    <div className="restaurant-details-container">
      <div className="restaurant-details">
        <div className="restaurant-details__header">
          <h3 className="restaurant-details__header-main">
            <a href={url}>{name}</a>
          </h3>
          <sub className="restaurant-details__header-sub">
            {cuisine.map((el) => el.split('_').join(' ')).join(' / ')}
            <div>{dollarSignsDisplay}</div>
          </sub>
        </div>
        <div className="restaurant-details__info">
          <div className="detail">
            <span className="detail__header">When: </span>
            <span className="detail__text">{when}</span>
          </div>
          <div className="detail">
            <span className="detail__header">What: </span>
            <span className="detail__text">{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

RestaurantDetails.propTypes = {
  restaurant: PropTypes.object.isRequired,
};
