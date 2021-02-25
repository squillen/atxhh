import React from 'react';
import '../styles/App.css';
import { Switch, Route } from 'react-router';
import Home from './Home';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-container">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
