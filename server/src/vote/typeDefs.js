import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Vote implements Node {
    id: ID!
    voterId: ID
    scheeseId: ID
    rank: Int!
    points: Float!
    createdAt: String
    updatedtAt: String
  }

  input VoteInput {
    voterId: ID
    scheeseId: ID
    rank: Int!
    points: Float!
  }

  type VoteConnection implements Connection {
    edges: [VoteEdge]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type VoteEdge implements Edge {
    cursor: String!
    node: Vote
  }

  extend type Query {
    votings(first: Int, after: String): VoteConnection @role(requires: ADMIN)
    voteById(id: ID!): Vote @role(requires: ADMIN)
    votingsForScheese(scheese_id: ID!): [Vote] @role(requires: ADMIN)
    pointsForScheese(scheese_id: ID!): Int @role(requires: ADMIN)
  }

  extend type Mutation {
    addVote(
      scheeseId: ID
      voter_hash: String!
      rank: Int!
      points: Float!
    ): Vote
    addVotes(votes: [VoteInput]!): [Vote]
  }
`;
