import { ObjectId } from 'bson';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const useRestaurants = (userQuery) => {
  const { restaurants, loading, error, refetch } = useAllRestaurants(userQuery);
  return {
    loading,
    restaurants,
    error,
    refetch,
  };
};
export default useRestaurants;

function useAllRestaurants(userQuery) {
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
          endTime
          happyHourDays
          image
          menu
          name
          percentOffDrinks
          percentOffFood
          price
          rating
          startTime
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
    { variables: userQuery },
  );
  if (error) {
    console.error(`Failed to fetch restaurants: ${error.message}`);
  }
  const restaurants = data?.restaurants ?? [];
  return { restaurants, loading, error, refetch };
}
