import React from 'react';
import { Switch, Route } from 'react-router';

// PAGES
import Home from './Home';
import About from './About';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
      </Switch>
    </div>
  );
}

export default App;
