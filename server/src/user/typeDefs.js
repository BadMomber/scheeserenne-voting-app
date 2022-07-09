import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum Role {
    GUEST
    ADMIN
  }

  directive @role(requires: Role) on FIELD_DEFINITION

  type User implements Node {
    id: ID!
    email: String
    username: String
    firstName: String!
    lastName: String!
    name: String
    role: String!
    password: String
    createdAt: String
    updatedtAt: String
  }

  type Pass implements Node {
    id: ID!
    password: String!
  }

  type UserConnection implements Connection {
    edges: [UserEdge]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type UserEdge implements Edge {
    cursor: String!
    node: User
  }

  type Query {
    me: User
    users(first: Int, after: String): UserConnection @role(requires: ADMIN)
    userById(id: ID!): User @role(requires: ADMIN)
    password: Pass
  }

  type Mutation {
    login(username: String!, password: String!): User
    logout: Response
    newUser(
      username: String
      email: String
      firstName: String!
      lastName: String!
      password: String!
    ): User
  }
`;
