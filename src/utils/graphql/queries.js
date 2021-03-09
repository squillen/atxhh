import { gql } from '@apollo/client';

export const RESTAURANTS_QUERY = gql`
  query GetFilteredRestaurants(
    $whatToGoFor: [GoFor!]
    $cuisines: [Cuisine!]
    $prices: [String!]
    $happyHourDays: [String!]
  ) {
    restaurants(
      whatToGoFor: $whatToGoFor
      cuisines: $cuisines
      prices: $prices
      happyHourDays: $happyHourDays
    ) {
      count
      results {
        id
        happyHourDays
        startTime
        endTime
        percentOffDrinks
        cuisine
        price
        percentOffFood
        coordinates {
          lat
          lng
        }
        whatToGoFor
        when
        rating
        warnings {
          WRONG_TIMES
          NO_LONGER_ACTIVE
        }
        active
        menu
        address
        url
        name
        image
        createdAt
        description
        createdBy {
          id
          name
        }
        votes {
          id
          user {
            name
            id
          }
        }
      }
    }
  }
`;

export const PROFILE_QUERY = gql`
  {
    currentUser {
      currentUser {
        name
        email
      }
    }
  }
`;
