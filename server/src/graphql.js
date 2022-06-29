import { ApolloServer, gql } from "apollo-server-express";
import { merge } from "lodash";

import userDirectives from "./user/directive";

import context from "./context.js";

import {
  typeDefs as UserTypes,
  resolvers as userResolvers,
} from "./user/index.js";

import {
  typeDefs as scheeseTypes,
  resolvers as scheeseResolvers,
} from "./scheese/index.js";

import {
  typeDefs as voterTypes,
  resolvers as voterResolvers,
} from "./voter/index.js";

import {
  typeDefs as voteTypes,
  resolvers as voteResolvers,
} from "./vote/index.js";

const localDefs = gql`
  """
  An object with an ID
  """
  interface Node {
    """
    The id of the object.
    """
    id: ID!
  }

  """
  An edge in a connection.
  """
  interface Edge {
    cursor: String!
    """
    The item at the end of the edge.
    """
    node: Node
  }

  """
  A connection to a list of items.
  """
  interface Connection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [Edge]
  }

  """
  Information about pagination in a connection.
  """
  type PageInfo {
    """
    When paginating forwards, are there more items?
    """
    hasNextPage: Boolean!
    """
    When paginating backwards, are there more items?
    """
    hasPreviousPage: Boolean!
    """
    When paginating backwards, the cursor to continue.
    """
    startCursor: String
    """
    When paginating forwards, the cursor to continue.
    """
    endCursor: String
  }

  type Response {
    code: String
    # success: Boolean
    message: String!
  }
`;

export const typeDefs = [
  localDefs,
  UserTypes,
  scheeseTypes,
  voterTypes,
  voteTypes,
];

export const resolvers = merge(
  {
    Query: {},
    Mutation: {},
  },
  userResolvers,
  scheeseResolvers,
  voterResolvers,
  voteResolvers,
);

export const schemaDirectives = merge({}, userDirectives);

export const server = new ApolloServer({
  context: (...args) => context(...args),
  debug: true,
  localDefs,
  typeDefs,
  resolvers,
  schemaDirectives,
  formatError: e => {
    console.error(e);
    return e;
  },
});
