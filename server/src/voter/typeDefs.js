import { gql } from "apollo-server-express"

export const typeDefs = gql`
  type Voter implements Node {
    id: ID!
    ip: String
    termsAccepted: Boolean!
    hasVoted: Boolean!
    votes: [Vote]
    createdAt: String
    updatedtAt: String
  }

  type VoterConnection implements Connection {
    edges: [VoterEdge]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type VoterEdge implements Edge {
    cursor: String!
    node: Voter
  }

  extend type Query {
    voters(first: Int, after: String): VoterConnection @role(requires: ADMIN)
    voterById(id: ID!): Voter @role(requires: ADMIN)
    voterByIp: Voter
  }

  extend type Mutation {
    addVoter(termsAccepted: Boolean!): Voter
    setHasVoted(voted: Boolean!): Boolean
  }
`
