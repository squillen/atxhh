import { useState } from 'react';
import PropTypes from 'prop-types';
import Badge from './Badge';
import Modal from './Modal';
import ReportProblems from './ReportProblems';
import { displayCuisines, handleRating } from '../utils/helpers';

export default function RestaurantDetails({ restaurant }) {
  const [showProblemModal, setShowProblemModal] = useState(false);
  const {
    id,
    menu,
    rating,
    description,
    when,
    cuisine,
    url,
    name,
    price,
    address,
    warnings,
  } = restaurant;
  const dollarSignsDisplay = [];
  for (let i = 0; i < 4; i++) {
    if (i + 1 > +price)
      dollarSignsDisplay.push(
        <span key={i} className="dollar-sign">
          $
        </span>
      );
    else
      dollarSignsDisplay.push(
        <span key={i} className="dollar-sign--green">
          $
        </span>
      );
  }
  const badgeLabel = rating ? (
    rating === 'NA' ? (
      <span className="na-rating">unrated</span>
    ) : (
      <span>
        <span className="rating">{handleRating(rating)}</span>
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
              <div className="cuisines">{displayCuisines(cuisine)}</div>
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
            <div
              className="report-problem"
              onClick={() => setShowProblemModal(true)}
            >
              report a problem
            </div>
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
      <Modal
        display={showProblemModal}
        handleClose={() => setShowProblemModal(false)}
      >
        <ReportProblems
          restaurantID={id}
          warnings={warnings}
          handleClose={() => setShowProblemModal(false)}
        />
      </Modal>
    </div>
  );
}

RestaurantDetails.propTypes = {
  restaurant: PropTypes.object.isRequired,
};
