import React, { useState, useEffect } from 'react';
import * as Realm from 'realm-web';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import PropTypes from 'prop-types';
import { useRealmApp } from '../RealmApp';

const createRealmApolloClient = (app) => {
  const link = new HttpLink({
    uri: `https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/${app.id}/graphql`,
    fetch: async (uri, options) => {
      if (!app.currentUser) {
        try {
          await app.logIn(Realm.Credentials.anonymous());
        } catch (e) {
          console.error('REALM CONNECTION ERROR ::: ', e);
          throw new Error(`REALM CONNECTION ERROR ::: ${e}`);
        }
      }
      try {
        await app.currentUser.refreshCustomData();
        options.headers.Authorization = `Bearer ${app.currentUser._accessToken}`;
      } catch (e) {
        console.error('Refresh custom data error ::: ', e);
      }
      return fetch(uri, options);
    },
  });
  const cache = new InMemoryCache();
  return new ApolloClient({ link, cache });
};

export default function RealmApolloProvider({ children }) {
  const app = useRealmApp();
  const [client, setClient] = useState(createRealmApolloClient(app));
  useEffect(() => {
    setClient(createRealmApolloClient(app));
  }, [app]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

RealmApolloProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
