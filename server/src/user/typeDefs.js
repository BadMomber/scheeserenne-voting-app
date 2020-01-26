import { gql } from "apollo-server-express"

export const typeDefs = gql`
  enum Role {
    GUEST
    EMPLOYEE
    FOREMAN
    ADMIN
  }

  directive @role(requires: Role) on FIELD_DEFINITION

  type User implements Node {
    id: ID!
    email: String
    username: String
    firstName: String!
    lastName: String!
    name: String!
    employeeNumber: String
    phone: String
    role: String!
    password: String
    timesheet: Timesheet
    createdAt: String
    updatedtAt: String
    isActive: Boolean!
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
    notAssignedEmployees: [User] @role(requires: ADMIN)
    notAssignedForemen: [User] @role(requires: ADMIN)
  }

  type Mutation {
    login(username: String!, password: String!): User
    logout: Response
    newUser(
      username: String
      email: String
      firstName: String!
      lastName: String!
      employeeNumber: String!
      phone: String
      role: String!
      password: String!
    ): User
    updateUserName(username: String!): Response
  }
`
