import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';

// REALM
import RealmApolloProvider from './graphql/RealmApolloProvider';
import { RealmAppProvider } from './RealmApp';

// PAGES
import Home from './pages/Home';
import About from './pages/About';

// COMPONENTS
import LoginScreen from './components/LoginScreen';

export const APP_ID = process.env.REACT_APP_REALM_ID;

function App() {
  return (
    <RealmAppProvider appId={APP_ID}>
      <RealmApolloProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/login' component={LoginScreen} />
          </Switch>
        </BrowserRouter>
      </RealmApolloProvider>
    </RealmAppProvider>
  );
}

export default App;