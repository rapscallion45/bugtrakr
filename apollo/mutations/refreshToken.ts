import { gql } from '@apollo/client';

const REFRESH_TOKEN = gql`
  mutation REFRESH_TOKEN($input: RefreshJwtAuthTokenInput!) {
    refreshJwtAuthToken(input: $input) {
      authToken
    }
  }
`;

export default REFRESH_TOKEN;
