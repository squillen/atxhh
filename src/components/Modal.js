import PropTypes from 'prop-types';

export default function Modal({ display, children, handleClose }) {
  return (
    display && (
      <div className='modal'>
        <div className='modal__children'>
          {handleClose && (
            <div onClick={handleClose} className='close-btn'>
              X
            </div>
          )}
          {children}
        </div>
      </div>
    )
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
};

Modal.defaultProps = {
  handleClose: () => {},
};
