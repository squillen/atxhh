import PropTypes from 'prop-types';
import Badge from './Badge';
import { handleRating } from '../utils/helpers';

export default function RatingBadge({ rating }) {
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
      <div className='rating-badge-container'>
        <Badge label={badgeLabel} />
        <div className='rating-text'>our rating</div>
      </div>
    )
  );
}

RatingBadge.propTypes = {
  rating: PropTypes.string.isRequired,
};
