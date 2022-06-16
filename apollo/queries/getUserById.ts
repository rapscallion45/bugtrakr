import { gql } from '@apollo/client';

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      username
      description
      email
      contactInfo {
        address
        city
        country
        postcode
      }
      avatar {
        url
      }
    }
  }
`;

export default GET_USER_BY_ID;
