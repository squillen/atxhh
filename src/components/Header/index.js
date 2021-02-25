import { useState } from 'react';
import { useHistory } from 'react-router';
import {
  getUserIDFromLocalStorage,
  removeIDFromLocalStorage,
  removeAuthFromLocalStorage,
} from '../../utils/helpers';
import Login from '../Login';

import './styles.scss';

export default function Header() {
  const id = getUserIDFromLocalStorage();
  const [showLogin, setShowLogin] = useState(false);
  const history = useHistory();
  return (
    <>
      <header className="header-container">
        <nav className="nav">
          <ul className="nav__list">
            <li className="logo">
              <a href="/">ATXHH</a>
            </li>
            {id ? (
              <li
                className="login-btn"
                onClick={() => {
                  removeIDFromLocalStorage();
                  removeAuthFromLocalStorage();
                  history.push('/');
                }}
              >
                logout
              </li>
            ) : (
              <li className="login-btn" onClick={() => setShowLogin(true)}>
                login
              </li>
            )}
          </ul>
        </nav>
      </header>
      <Login showLogin={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
}
