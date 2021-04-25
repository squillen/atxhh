import { ObjectId } from 'bson';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const useRestaurants = (userQuery) => {
  const { restaurants, loading, error, refetch } = findRestaurants(userQuery);
  return {
    loading,
    restaurants,
    error,
    refetch,
  };
};

function findRestaurants(query) {
  const { data, loading, error, refetch } = useQuery(
    gql`
      query GetRestaurants($query: RestaurantQueryInput) {
        restaurants(query: $query) {
          _id
          active
          address
          coordinates {
            lat
            lng
          }
          cuisine
          description
          startTime
          endTime
          happyHourDays
          images {
            img
            title
          }
          menu
          name
          percentOffDrinks
          percentOffFood
          price
          rating
          url
          warnings {
            WRONG_TIMES
            BROKEN_LINK
            NO_LONGER_ACTIVE
          }
          whatToGoFor
          when
        }
      }
    `,
    { variables: { query } },
  );
  if (error) {
    throw new Error(`Failed to fetch restaurants: ${error.message}`);
  }
  const restaurants = data?.restaurants ?? [];
  return { restaurants, loading, error, refetch };
}
