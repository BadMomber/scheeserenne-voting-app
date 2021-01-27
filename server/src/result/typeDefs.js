import { gql } from "apollo-server-express"

export const typeDefs = gql`
  type ScheesePair implements Node {
    id: ID!
    scheeseA: ID!
    scheeseB: ID!
    weight: Int!
    distance: Int!
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
    scheesePairs(first: Int, after: String): ScheesePairConnection
  }
`
