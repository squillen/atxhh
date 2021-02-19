import { gql } from '@apollo/client';

export const RESTAURANTS_QUERY = gql`
  {
    restaurants {
      restaurants {
        id
        url
        name
        createdAt
        description
        createdBy {
          id
          name
        }
        votes {
          id
          user {
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
