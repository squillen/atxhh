import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './App';
import './styles/main.scss';

const { REACT_APP_GA_TRACKING_ID } = process.env;
ReactGA.initialize(REACT_APP_GA_TRACKING_ID);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
