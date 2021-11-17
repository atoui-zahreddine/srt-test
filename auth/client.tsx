import { createClient, dedupExchange, cacheExchange, fetchExchange, makeOperation, ssrExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { getToken } from './helpers/tokenHandler';
import { SSRExchange } from '@urql/core/dist/types/exchanges/ssr';


export const gqlClient = createClient({
  url: "https://serotana-test-rb.onrender.com/graphql", 
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      getAuth: async ({ authState }) => {
        
        if (!authState) {
          const token = getToken()
          if (token) {
            return { token };
          }
          return null;
        }
      
        return null;
      },
      addAuthToOperation: ({ authState, operation }) => {
        if (!authState || !authState.token) {
          return operation;
        }
      
        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};
      
        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: authState.token,
            },
          },
        });
      },
      willAuthError: ({ authState }) => {
        if (!authState) return true;
        // e.g. check for expiration, existence of auth etc
        return false;
      },
      didAuthError: ({ error }) => {
        // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
        return error.graphQLErrors.some(
          e => e.extensions?.code === 'FORBIDDEN',
        );
      },
      
    }),
    fetchExchange,
  ],
});

export const ssrGqlClient = (ssrCache : SSRExchange, token) => createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL!, 
  exchanges: [
    dedupExchange,
    cacheExchange,
    ssrCache,
    authExchange({
      getAuth: async ({ authState }) => {
        
        if (!authState) {
          if (token) {
            return { token };
          }
          
          return null;
        }
      
        return null;
      },
      addAuthToOperation: ({ authState, operation }) => {
        if (!authState || !authState.token) {
          return operation;
        }
      
        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};
      
        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: authState.token,
            },
          },
        });
      },
      willAuthError: ({ authState }) => {
        if (!authState) return true;
        // e.g. check for expiration, existence of auth etc
        return false;
      },
      didAuthError: ({ error }) => {
        // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
        return error.graphQLErrors.some(
          e => e.extensions?.code === 'FORBIDDEN',
        );
      },
      
    }),
    fetchExchange,
  ],
});