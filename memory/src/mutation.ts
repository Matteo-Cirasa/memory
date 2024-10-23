import { gql } from '@apollo/client';

export const UPDATE_SESSION = gql`
  mutation UpdateSession($username: String!, $token: String!, $expiration: Int!) {
    updateSession(username: $username, token: $token, expiration: $expiration) {
      success
      message
    }
  }
`;