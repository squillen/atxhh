import { gql } from '@apollo/client';

export const RESTAURANTS_QUERY = gql`
  query GetFilteredRestaurants(
    $whatToGoFor: [String!]
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
export const ALL_RESTAURANTS_QUERY = gql`
  {
    restaurants {
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
