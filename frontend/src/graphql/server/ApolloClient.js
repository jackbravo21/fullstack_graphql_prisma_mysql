// src/graphql/ApolloClient.js
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({ uri: 'http://localhost:9000/' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  //uri: 'http://localhost:9000/',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const ApolloProviderWrapper = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);