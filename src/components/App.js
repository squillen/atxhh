import React from 'react';
import '../styles/App.scss';
import { Switch, Route } from 'react-router';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-container">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
