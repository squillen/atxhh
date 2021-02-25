import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Modal from '../Modal';

import './styles.scss';

export default function Error({ onClick, error, label }) {
  const [showError, setShowError] = useState(true);
  const handleClick = () => {
    onClick();
    setShowError(false);
  };
  return (
    <Modal display={showError}>
      <div className="error-container">
        <div className="error-container__upper">
          <div className="error-container__upper--text">
            Party foul! There was an error.
          </div>
          <div className="error-container__upper--text">{error.toString()}</div>
        </div>
        <div className="error-container__bottom">
          <Button label="Close" onClick={handleClick} />
        </div>
      </div>
    </Modal>
  );
}

Error.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.any.isRequired,
  onClick: PropTypes.func,
};

Error.defaultProps = {
  onClick: () => {},
};
