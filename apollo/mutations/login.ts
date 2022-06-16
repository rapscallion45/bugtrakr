import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation LOGIN($input: LoginInput!) {
    login(input: $input) {
      authToken
      refreshToken
      user {
        id
        username
        email
        firstName
        lastName
      }
    }
  }
`;

export default LOGIN;
