import PropTypes from 'prop-types';
import './Checkbox.scss';

export default function Checkbox({
  labelRight,
  display,
  onChange,
  checked,
}) {
  return (
    <div key={display} className="checkbox__selections--selection">
      {!labelRight && (
        <label className="checkbox--label" htmlFor={display}>
          {display}
        </label>
      )}
      <input
        onChange={onChange}
        checked={checked}
        className="checkbox--input"
        type="checkbox"
        name={display}
        value={display}
      />
      {labelRight && (
        <label className="checkbox--label" htmlFor={display}>
          {display}
        </label>
      )}
    </div>
  );
}

Checkbox.propTypes = {
  display: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  labelRight: PropTypes.bool,
};

Checkbox.defaultProps = {
  labelRight: false,
};
