import PropTypes from 'prop-types';

export default function Checkbox({
  labelRight,
  display,
  onChange,
  checked,
  type,
}) {
  return (
    <div
      onClick={onChange}
      key={display}
      className='checkbox__selections--selection'
    >
      {!labelRight && (
        <label className='checkbox--label' htmlFor={display}>
          {display}
        </label>
      )}
      <input
        onChange={onChange}
        checked={checked}
        className='checkbox--input'
        type={type}
        name={display}
        value={display}
      />
      {labelRight && (
        <label className='checkbox--label' htmlFor={display}>
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
  type: PropTypes.string,
  labelRight: PropTypes.bool,
};

Checkbox.defaultProps = {
  labelRight: false,
  type: 'checkbox',
};
