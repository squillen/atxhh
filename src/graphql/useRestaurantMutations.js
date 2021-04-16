import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

/// ADD ///
const AddRestaurantMutation = gql`
  mutation AddRestaurant($restaurant: RestaurantInsertInput!) {
    addedRestaurant: insertOneRestaurant(data: $restaurant) {
      _id
      name
    }
  }
`;

/// UPDATE ///
const UpdateRestaurantMutation = gql`
  mutation UpdatedRestaurant(
    $restaurantID: ObjectId!
    $updates: RestaurantUpdateInput!
  ) {
    updatedRestaurant: updateOneRestaurant(
      query: { _id: $restaurantID }
      set: $updates
    ) {
      _id
      name
    }
  }
`;

export function useUpdateRestaurant(handleCompleted, handleError) {
  const [updateRestaurantMutation] = useMutation(UpdateRestaurantMutation, {
    ignoreResults: true,
    onCompleted: handleCompleted,
    onError: (err) => handleError(err),
  });
  const updateRestaurant = async (restaurantID, updates) => {
    const { updatedRestaurant } = await updateRestaurantMutation({
      variables: { restaurantID, updates },
    });
    return updatedRestaurant;
  };
  return updateRestaurant;
}

/// DELETE ///
const DeleteRestaurantMutation = gql`
  mutation DeleteRestaurant($restaurantID: ObjectId!) {
    deletedRestaurant: deleteOneRestaurant(query: { _id: restaurantID }) {
      _id
      name
    }
  }
`;
