import { gql } from '@apollo/client';

export const SIGN_IN = gql`
query Signin($email: String, $secret: String) {
  userLogin(email: $email, secret: $secret) {
    id_token
    refresh_token
  }
}

`;

export const SIGN_UP = gql`
 mutation Signup($email: String, $secret: String) {
  userRegister(email: $email, secret: $secret) {
    id
    id_token
    refresh_token
  }
}
`;




