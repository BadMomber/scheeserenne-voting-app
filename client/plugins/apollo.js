import Vue from "vue";
import VueApollo from "vue-apollo";

import { ApolloClient } from "apollo-client";
// import { ApolloLink } from "apollo-link"

// import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory";
// import { onError } from "apollo-link-error"
const { createUploadLink } = require("apollo-upload-client");

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// Cache implementation
const cache = new InMemoryCache();

const uri =
  process.env.NODE_ENV === "production"
    ? "/graphql"
    : "http://localhost:4000/graphql";

const uploadLink = createUploadLink({
  uri,
  headers: {
    "keep-alive": "true"
  }
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: uploadLink,
  cache
});

Vue.use(VueApollo);

export default ({ app }, inject) => {
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient
  });

  // inject("mooo", () => ({ lol: true, rofl: e => console.log(e) }))

  // Allow access to the provider in the context
  app.apolloProvider = apolloProvider;

  inject("apolloHelpers", {
    onLogin: async (
      token,
      apolloClient = apolloProvider.defaultClient /*, tokenExpires = AUTH_TOKEN_EXPIRES */
    ) => {
      // websockets are lazy and only used on the track/release edit pages
      // if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
      try {
        await apolloClient.resetStore();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(
          "%cError on cache reset (login)",
          "color: orange;",
          e.message
        );
      }
    },
    onLogout: async (apolloClient = apolloProvider.defaultClient) => {
      // websockets are lazy and only used on the track/release edit pages
      // if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
      if (apolloClient.wsClient) apolloClient.wsClient.close(true);
      try {
        await apolloClient.resetStore();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(
          "%cError on cache reset (logout)",
          "color: orange;",
          e.message
        );
      }
    },
    onUnauthenticated: async (
      token,
      apolloClient = apolloProvider.defaultClient /*, tokenExpires = AUTH_TOKEN_EXPIRES */
    ) => {
      // websockets are lazy and only used on the track/release edit pages
      // if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
      try {
        await apolloClient.cache.reset();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(
          "%cError on cache reset (unauthenticated)",
          "color: orange;",
          e.message
        );
      }
    }
  });
};
