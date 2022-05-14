import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type VotingStatus implements Node {
    id: ID!
    votingMessage: String
    votingIsActive: Boolean
    createdAt: String
    updatedtAt: String
  }

  type VotingStatusConnection implements Connection {
    edges: [VotingStatusEdge]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type VotingStatusEdge implements Edge {
    cursor: String!
    node: VotingStatus
  }

  extend type Query {
    votingStati: [VotingStatus]
    votingStatusById(id: ID!): VotingStatus
  }
`;
