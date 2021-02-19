import { gql } from '@apollo/client';

export const RESTAURANTS_QUERY = gql`
  {
    restaurants {
      restaurants {
        id
        happyHourDays
        startTime
        endTime
        percentOffDrinks
        percentOffFood
        coordinates {
          lat
          lng
        }
        goFor
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
