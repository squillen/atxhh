import PropTypes from 'prop-types';
import './styles.scss';

export default function Toggle({ onClick, toggle, showLabel, hideLabel }) {
  return (
    <div className="toggle" onClick={onClick}>
      <div className="toggle--icon">
        {toggle ? (
          <i className="fas fa-angle-up" />
        ) : (
          <i className="fas fa-angle-down" />
        )}
      </div>
      {showLabel && (
        <h3 className="toggle--label">{toggle ? hideLabel : showLabel}</h3>
      )}
    </div>
  );
}

Toggle.propTypes = {
  onClick: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
  showLabel: PropTypes.string,
  hideLabel: PropTypes.string,
};

Toggle.defaultProps = {
  showLabel: null,
  hideLabel: null,
};
