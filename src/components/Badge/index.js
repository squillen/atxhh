import PropTypes from 'prop-types';
import './styles.scss';

export default function Badge({ label }) {
  return <div className="badge-container">{label}</div>;
}

Badge.propTypes = {
  label: PropTypes.string.isRequired,
};
