import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import ReportProblems from './ReportProblems';
import { displayCuisines } from '../utils/helpers';
import RatingBadge from './RatingBadge';

export default function RestaurantDetails({ restaurant }) {
  const [showProblemModal, setShowProblemModal] = useState(false);
  const {
    _id,
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
        <span key={i} className='dollar-sign'>
          $
        </span>,
      );
    else
      dollarSignsDisplay.push(
        <span key={i} className='dollar-sign--green'>
          $
        </span>,
      );
  }

  return (
    <div className='restaurant-details-container'>
      <div className='restaurant-details'>
        <div className='restaurant-details__header'>
          <div className='restaurant-details__header--left'>
            <h3 className='restaurant-details__header-main'>
              <a target={`${name}-site`} rel='noreferrer' href={url}>
                {name}
              </a>
            </h3>
            <sub className='restaurant-details__header-sub'>
              <div className='cuisines'>{displayCuisines(cuisine)}</div>
              <div className='address'>
                <a
                  target={`${name}-map`}
                  rel='noreferrer'
                  href={`https://www.google.com/maps/place/${address}`}
                >
                  {address}
                </a>
              </div>
              <div className='dollar-signs'>{dollarSignsDisplay}</div>
            </sub>
          </div>
          <div className='restaurant-details__header--right'>
            <RatingBadge rating={rating} />
          </div>
        </div>
        <div className='restaurant-details__info'>
          <div className='description-container'>
            <div className='detail'>
              <div className='detail__header'>When: </div>
              <div className='detail__text'>{when}</div>
            </div>
            <div className='detail'>
              <div className='detail__header'>What: </div>
              <div className='detail__description'>{description}</div>
            </div>
          </div>
          <div className="links">
            {menu && (
              <div className='menu'>
                <a href={menu} target='_blank' rel='noreferrer'>
                  see menu
                </a>
              </div>
            )}
            <div
              className='report-problem'
              onClick={() => setShowProblemModal(true)}
            >
              report a problem
            </div>
          </div>
        </div>
      </div>
      <Modal
        display={showProblemModal}
        handleClose={() => setShowProblemModal(false)}
      >
        <ReportProblems
          restaurantID={_id}
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
