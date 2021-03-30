import PropTypes from 'prop-types';
import './styles.scss';

export default function Button({ type, label, onClick, styles }) {
  return (
    <button
      className="button-container"
      type={type}
      style={styles}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  styles: PropTypes.object,
};

Button.defaultProps = {
  type: 'button',
  styles: {},
};
