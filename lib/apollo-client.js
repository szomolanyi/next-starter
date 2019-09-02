import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';

import { typeDefs, resolvers } from './client-schema';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, { getToken }) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_URI, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        Cookie: token || null,
      },
    };
  });

  const errLink = onError((errObject) => {
    console.log({ errObject });
  });

  const cache = new InMemoryCache().restore(initialState || {});
  const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([errLink, authLink, httpLink]),
    cache,
    typeDefs,
    resolvers,
  });

  cache.writeData({
    data: {
      appMessage: {
        __typename: 'AppMessage',
        isOpened: false,
        messageId: null,
      },
    },
  });

  return client;
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
