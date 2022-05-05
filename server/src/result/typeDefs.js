import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type ScheesePair implements Node {
    id: ID!
    scheeseOne: ID!
    scheeseTwo: ID!
    weight: Int!
    distance: Int!
    normedDistance: Int!
    createdAt: String!
    updatedAt: String
  }

  type ScheesePairConnection implements Connection {
    edges: [ScheesePairEdge]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type ScheesePairEdge implements Edge {
    cursor: String!
    node: ScheesePair
  }

  extend type Query {
    scheesePairs: [ScheesePair]
  }
`;
