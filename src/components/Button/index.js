import PropTypes from 'prop-types';
import './styles.scss';

export default function Button({ type, label, onClick }) {
  return (
    <button className="button-container" type={type} onClick={onClick}>
      {label}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  type: 'button',
};
