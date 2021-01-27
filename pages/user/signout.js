import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';
import { gql } from '@apollo/client'
import {logout} from "../../utils/authContainer";

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`;

function SignOut() {
  const client = useApolloClient();
  const router = useRouter();
  // const [signOut] = useMutation(SignOutMutation);

  useEffect(() => {
        logout()
        router.push('/user/login');
  }, [ router, client]);

  return <p>Signing out...</p>;
}

export default SignOut;
