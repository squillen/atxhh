import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
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