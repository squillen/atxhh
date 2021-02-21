import PropTypes from 'prop-types';
import { useState } from 'react';
import './Dropdown.scss';

export default function Dropdown({ children, headerTitle }) {
  const [toggleList, setToggleList] = useState(false);
  return (
    <div className="dd-wrapper">
      <button
        type="button"
        className="dd-btn"
        onClick={() => setToggleList(!toggleList)}
      >
        <div className="dd-header--title">{headerTitle}</div>
        {toggleList ? (
          <i className="fas fa-angle-up" />
        ) : (
          <i className="fas fa-angle-down" />
        )}
      </button>
      {toggleList && (
        <div role="list" className="dd-list">
          {children}
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  headerTitle: PropTypes.string.isRequired,
};
