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
    scheeseId: ID
    voter_hash: String!
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
    votingOneByVoterCode(voter_hash: String!): [Vote]
    votingTwoByVoterCode(voter_hash: String!): [Vote]
    votingThreeByVoterCode(voter_hash: String!): [Vote]
    votings(first: Int, after: String): VoteConnection
    voteById(id: ID!): Vote
    votingsForScheeseVotingOne(scheese_id: ID!): [Vote]
    votingsForScheeseVotingTwo(scheese_id: ID!): [Vote]
    votingsForScheeseVotingThree(scheese_id: ID!): [Vote]
    pointsForScheese: Int
    allVotes: [Vote]
    allVotesVoting2: [Vote]
    allVotesVoting3: [Vote]
  }

  extend type Mutation {
    addVotes(votes: [VoteInput]!): [Vote]
    addVotesVoting2(votes: [VoteInput]!): [Vote]
    addVotesVoting3(votes: [VoteInput]!): [Vote]
  }
`;
