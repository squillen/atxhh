import PropTypes from 'prop-types';

export default function Restaurant({ restaurant }) {
  const {
    description,
    when,
    cuisine,
    url,
    name,
    id,
    image,
    price,
  } = restaurant;
  const dollarSignsDisplay = [];
  for (let i = 0; i < 4; i++) {
    if (i > +price)
      dollarSignsDisplay.push(<span className="dollar-sign">$</span>);
    else dollarSignsDisplay.push(<span className="dollar-sign--green">$</span>);
  }
  return (
    <div className="restaurant-container">
      <div className="hero-container__header">
        {/* <div className="hero-container__header--text">
          <h3 className="hero-container__header--text--main">{name}</h3>
        </div> */}
        <div
          className="hero-container__header--image"
          style={{
            background: `url(${image}) center no-repeat`,
            backgroundSize: 'cover',
          }}
        />
      </div>
      <div className="hero-container__body">
        <div className="hero-container__body--header">
          <h3 className="hero-container__body--header-main">
            <a href={url}>{name}</a>
          </h3>
          <sub className="hero-container__body--header-sub">
            {cuisine.map((el) => el.split('_').join(' ')).join(' / ')}
            <div>{dollarSignsDisplay}</div>
          </sub>
        </div>
        <div className="hero-container__body--details">
          <div className="detail">
            <span className="detail--header">When: </span>
            <span className="detail--text">{when}</span>
          </div>
          <div className="detail">
            <span className="detail--header">What: </span>
            <span className="detail--text">{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired,
};
