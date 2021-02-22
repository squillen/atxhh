import { gql } from '@apollo/client';

export const CREATE_RESTAURANT_MUTATION = gql`
  mutation CreateMutation(
    $name: String!
    $url: String!
    $description: String!
    $happyHourDays: [String!]!
    $goFor: [String!]!
    $price: String!
    $when: String!
    $startTime: String!
    $endTime: String!
    $percentOffDrinks: Int
    $percentOffFood: Int
    $coordinates: [String!]!
    $address: String!
  ) {
    create(
      name: $name
      url: $url
      description: $description,
      happyHourDays: $happyHourDays
      startTime: $startTime
      endTime: $endTime
      percentOffDrinks: $percentOffDrinks
      percentOffFood: $percentOffFood
      coordinates: $coordinates
      address: $address
    ) {
      id
      url
      description
    }
  }
`;

export const VOTE_MUTATION = gql`
  mutation VoteMutation($restaurantID: ID!) {
    vote(restaurantID: $restaurantID) {
      id
      restaurant {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;
