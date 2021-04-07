import React from 'react';
import { Switch, Route } from 'react-router';
import Home from './Home';
import About from './About';

function App() {
  return (
    <div className='App'>
      <Header />
      <main className='main-container'>
        <Switch>
          <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
