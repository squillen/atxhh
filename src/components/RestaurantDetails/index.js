import PropTypes from 'prop-types';
import Badge from '../Badge';
import './styles.scss';

const ratings = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
  SIX: '6',
  SEVEN: '7',
  EIGHT: '8',
  NINE: '9',
  TEN: '10',
};

export default function RestaurantDetails({ restaurant }) {
  const {
    menu,
    rating,
    description,
    when,
    cuisine,
    url,
    name,
    price,
    address,
  } = restaurant;
  const dollarSignsDisplay = [];
  for (let i = 0; i < 4; i++) {
    if (i + 1 > +price)
      dollarSignsDisplay.push(<span className="dollar-sign">$</span>);
    else dollarSignsDisplay.push(<span className="dollar-sign--green">$</span>);
  }
  const badgeLabel = rating ? (
    rating === 'NA' ? (
      <span className="na-rating">unrated</span>
    ) : (
      <span>
        <big className="rating">{ratings[rating]}</big>
        <span>
          <sub>/10</sub>
        </span>
      </span>
    )
  ) : null;
  return (
    <div className="restaurant-details-container">
      <div className="restaurant-details">
        <div className="restaurant-details__header">
          <div className="left">
            <h3 className="restaurant-details__header-main">
              <a target={`${name}-site`} rel="noreferrer" href={url}>
                {name}
              </a>
            </h3>
            <sub className="restaurant-details__header-sub">
              <div className="cuisines">
                {cuisine.map((el) => el.split('_').join(' ')).join(' / ')}
              </div>
              <div className="address">
                <a
                  target={`${name}-map`}
                  rel="noreferrer"
                  href={`https://www.google.com/maps/place/${address}`}
                >
                  {address}
                </a>
              </div>
              <div className="dollar-signs">{dollarSignsDisplay}</div>
            </sub>
          </div>
          <div className="right">
            {badgeLabel && <Badge label={badgeLabel} />}
          </div>
        </div>
        <div className="restaurant-details__info">
          <div className="detail">
            <div className="detail__header">When: </div>
            <div className="detail__text">{when}</div>
          </div>
          <div className="detail">
            <div className="detail__header">What: </div>
            <div className="detail__description">{description}</div>
          </div>
          {menu && (
            <div className="menu">
              <a href={menu} target="_blank" rel="noreferrer">
                see menu
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

RestaurantDetails.propTypes = {
  restaurant: PropTypes.object.isRequired,
};
