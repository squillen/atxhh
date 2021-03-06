import React, { useState, createContext, useContext } from 'react';
import * as Realm from 'realm-web';
import PropTypes from 'prop-types';

const RealmAppContext = createContext();

export const useRealmApp = () => {
  const app = useContext(RealmAppContext);
  if (!app) {
    throw new Error(
      `You must call useRealmApp() inside of a <RealmAppProvider />`,
    );
  }
  return app;
};

export const RealmAppProvider = ({ appId, children }) => {
  const [app, setApp] = useState(new Realm.App(appId));
  const [currentUser, setCurrentUser] = useState(null);
  React.useEffect(() => {
    setApp(new Realm.App(appId));
  }, [appId]);

  async function logIn(credentials) {
    try {
      await app.logIn(credentials);
      setCurrentUser(app.currentUser);
    } catch (e) {
      console.error(e);
    }
  }

  async function logOut() {
    try {
      await app.currentUser.logOut();
      setCurrentUser(app.currentUser);
    } catch (e) {
      console.error('Unable to log out of Realm ::', e);
    }
  }

  const wrapped = { ...app, currentUser, logIn, logOut };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};

RealmAppProvider.propTypes = {
  appId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
