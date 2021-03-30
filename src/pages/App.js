import React from 'react';
import { Switch, Route } from 'react-router';
import Home from './Home';
import Header from '../components/Header';
import Footer from '../components/Footer';

function App() {
  return (
    <div className='App'>
      <Header />
      <main className='main-container'>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
