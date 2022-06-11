import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Scheese implements Node {
    id: ID!
    name: String!
    finished: Boolean!
    createdAt: String
    updatedtAt: String
    image: String
  }

  type ScheeseConnection implements Connection {
    edges: [ScheeseEdge]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type ScheeseEdge implements Edge {
    cursor: String!
    node: Scheese
  }

  extend type Query {
    scheese(first: Int, after: String): ScheeseConnection @role(requires: ADMIN)
    scheeseListOne: [Scheese]
    scheeseListTwo: [Scheese]
    scheeseListThree: [Scheese]
    scheeseById(id: ID!): Scheese
    finishedScheese: [Scheese]
    notFinishedScheese: [Scheese]
  }

  extend type Mutation {
    addScheese(name: String!): Scheese
    removeScheese(id: String!): Scheese
  }
`;
