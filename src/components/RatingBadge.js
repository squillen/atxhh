import { useState } from 'react';
import PropTypes from 'prop-types';
import Badge from './Badge';
import { handleRating } from '../utils/helpers';
import Modal from './Modal';

export default function RatingBadge({ name, rating }) {
  const [showRating, setShowRating] = useState(false);
  const badgeLabel = rating ? (
    rating === 'NA' ? (
      <span className='na-rating'>unrated</span>
    ) : (
      <span>
        <span className='rating'>{handleRating(rating)}</span>
        <span>
          <sub>/10</sub>
        </span>
      </span>
    )
  ) : null;

  return (
    badgeLabel && (
      <>
        <div className='rating-badge-container'>
          <Badge label={badgeLabel} />
          <div
            onClick={() => setShowRating(!showRating)}
            className='rating-text'
          >
            our rating
          </div>
        </div>
        <Modal display={showRating} handleClose={() => setShowRating(false)}>
          <div className='rating-explanation-container'>
            <div className='rating-explanation-header-container'>
              <h2 className='rating-explanation-header'>Rating for {name}</h2>
              <Badge label={badgeLabel} />
            </div>
            <div>
              <p>
                This is our rating on the quality of the happy hour itself, not
                on the quality of the food/drinks. If we think the food is bad,
                we&apos;ll say that in the description, don&apos;t worry 😉.
              </p>
              <p>
                This is not a scientific rating, just our gut feeling. Honestly,
                don&apos;t even listen to us. We&apos;re idiots. Go, determine
                for yourself, and let us know if you agree with our rating or
                not.
              </p>
            </div>
          </div>
        </Modal>
      </>
    )
  );
}

RatingBadge.propTypes = {
  rating: PropTypes.string.isRequired,
};
