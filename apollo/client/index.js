import { useMemo } from 'react';
import { ApolloClient } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { cache } from './cache';

let apolloClient;

// function createIsomorphLink() {
//   if (typeof window === 'undefined') {
//     const { SchemaLink } = require('@apollo/client/link/schema');
//     const { schema } = require('../schema');
//     return new SchemaLink({ schema });
//   } else {
//     const { HttpLink } = require('@apollo/client/link/http');
//     const token = process.env.NEXT_PUBLIC_TOKEN_SECRET || null;
//     // console.log('Log ~ file: index.js ~ line 16 ~ createIsomorphLink ~ process.env.NEXT_PUBLIC_TOKEN_SECRET', process.env.NEXT_PUBLIC_TOKEN_SECRET)
//     return new HttpLink({
//       uri: 'https://api.apito.io/secured/graphql',
//       credentials: 'same-origin',
//       headers: {
//         authorization: token ? `Bearer ${token}` : null,
//       }
//     });
//   }
// }

const httpLink = createHttpLink({
  uri: 'https://api.apito.io/secured/graphql',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = process.env.NEXT_PUBLIC_TOKEN_SECRET || null;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
