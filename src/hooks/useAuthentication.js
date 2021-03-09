import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { PROFILE_QUERY } from '../utils/graphql/queries';

export function useAuthentication(id, change) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (id) {
      const {
        client,
        data: { currentUser },
      } = useQuery(PROFILE_QUERY, {
        fetchPolicy: 'network-only',
        variables: { id },
      });
      if (client && change) client.resetStore();
      setUser(!!currentUser);
    }
  }, [id, change]);
  return user;
}
