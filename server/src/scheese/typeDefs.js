import { gql } from "apollo-server-express"

export const typeDefs = gql`
  type Scheese implements Node {
    id: ID!
    name: String!
    finished: Boolean!
    createdAt: String
    updatedtAt: String
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
    scheeseById(id: ID!): Scheese @role(requires: ADMIN)
    finishedScheese: [Scheese] @role(requires: ADMIN)
    notFinishedScheese: [Scheese] @role(requires: ADMIN)
  }

  extend type Mutation {
    addScheese(name: String): Scheese @role(requires: ADMIN)
  }
`
