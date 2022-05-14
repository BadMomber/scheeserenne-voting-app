import _ from "lodash";
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay";

import db from "../db.js";

const votings = async (root, args, { currentvote }) => {
  const limit = typeof args.first === "undefined" ? "200" : args.first;
  const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

  const data = await db
    .table("votings")
    .select("*", db.raw("count(*) OVER() as total_count"))
    .limit(limit)
    .offset(offset)
    .then(rows => {
      return rows;
    });

  const totalCount = data[0] ? parseInt(data[0].totalCount) : 0;

  return {
    ...connectionFromArraySlice(data, args, {
      sliceStart: offset,
      arrayLength: totalCount,
    }),
    totalCount,
  };
};

const voteById = async (root, args, ctx) => {
  const vote = await db("vote")
    .where({ id: args.id })
    .first();

  return vote;
};

const votingsForScheese = async (root, args, ctx) => {
  // Code here...
};

const pointsForScheese = async (root, args, ctx) => {
  // Code here...
};

const addVotes = async (root, args, ctx) => {
  // Delete all Votes with given hash before saving new one
  console.log("args", args);
  const delData = await db("votings")
    .where("voter_hash", args.votes[0].voter_hash)
    .del();

  console.log("delData", delData);
  console.log("args.votes", args.votes);
  const data = await db
    .insert([...args.votes])
    .returning("voter_hash")
    .into("votings")
    .then(async voterHash => {
      const createdVotes = await db("votings")
        .select("*")
        .where({ voter_hash: voterHash.toString() })
        .first();

      console.log("createdVote", createdVotes);
      return createdVotes;
    });

  console.log("addVotes data", data);
  return data;
};

export const resolvers = {
  Vote: {
    // List employees attributes here...
    createdAt: ({ createdAt }) => (createdAt ? createdAt.toISOString() : null),
    updatedtAt: ({ updatedtAt }) =>
      updatedtAt ? updatedtAt.toISOString() : null,
  },

  Query: {
    votings,
    voteById,
    votingsForScheese,
    pointsForScheese,
  },

  Mutation: {
    addVotes,
  },
};
