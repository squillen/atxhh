import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './styles.scss';

export default function Dropdown({ children, headerTitle, active, setActive }) {
  const [toggleList, setToggleList] = useState(active === headerTitle);
  useEffect(() => {
    if (active !== headerTitle) setToggleList(false);
  }, [active]);
  return (
    <div className="dd-wrapper">
      <button
        type="button"
        className="dd-btn"
        onClick={() => {
          setToggleList(!toggleList);
          setActive(headerTitle);
        }}
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
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
};
