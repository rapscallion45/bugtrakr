import { gql } from '@apollo/client';

const UPDATE_USER_BY_ID = gql`
  mutation UPDATE_USER_BY_ID($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
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
  }
`;

export default UPDATE_USER_BY_ID;
