import PropTypes from 'prop-types';
import './Checkbox.scss';

export default function Checkbox({
  labelRight,
  display,
  onClick,
  checkedTest,
}) {
  return (
    <div key={display} className="checkbox__selections--selection">
      {!labelRight && (
        <label className="checkbox--label" htmlFor={display}>
          {display}
        </label>
      )}
      <input
        onClick={onClick}
        checked={checkedTest(display)}
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
  onClick: PropTypes.func.isRequired,
  checkedTest: PropTypes.func.isRequired,
  labelRight: PropTypes.bool,
};

Checkbox.defaultProps = {
  labelRight: false,
};
