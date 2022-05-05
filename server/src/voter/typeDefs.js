import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Voter implements Node {
    id: ID!
    voterHash: String
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
    voters(first: Int, after: String): VoterConnection
    voterList: [Voter]
  }

  extend type Mutation {
    addVoter(termsAccepted: Boolean!): Voter
    setHasVoted(voter_hash: String!, voted: Boolean!): Boolean
  }
`;
