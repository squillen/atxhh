import PropTypes from 'prop-types';

export default function Badge({ label }) {
  return <div className='badge-container'>{label}</div>;
}

Badge.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};
