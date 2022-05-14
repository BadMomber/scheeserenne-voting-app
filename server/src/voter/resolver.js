import _ from "lodash";
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay";
import { compare, hash } from "bcrypt";

import db from "../db.js";

const voters = async (root, args, { currentUser }) => {
  const limit = typeof args.first === "undefined" ? "200" : args.first;
  const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

  const data = await db
    .table("voters")
    .select("*", db.raw("count(*) OVER() as total_count"))
    .limit(limit)
    .offset(offset)
    .then((rows) => {
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

const voterList = async (root, args, ctx) => {
  const data = await db("voters")
    .select("*")
    .then((rows) => {
      return rows;
    });
  return data;
};

const votersVotedList = async (root, args, ctx) => {
  const data = await db("voters")
    .select("*")
    .where({ has_voted: true })
    .then((rows) => {
      return rows;
    });
  return data;
};

const getVotersVotings = async (root, args, ctx) => {
  const data = await db("votings")
    .select("*")
    .where({ voter_id: args.id })
    .then((rows) => {
      return rows;
    });

  return data;
};

const addVoter = async (root, args, ctx) => {
  const newVoter = {
    hash: args.hash,
    termsAccepted: args.termsAccepted,
  };

  const data = await db
    .insert(newVoter)
    .returning("id")
    .into("voters")
    .then(async (id) => {
      const createdVoter = await db("voters")
        .select("*")
        .where({ id: id.toString() })
        .first();

      return createdVoter;
    });

  ctx.req.session.voterId = data.id;
  ctx.currentVoter = data;

  return data;
};

const setHasVoted = async (root, args, ctx) => {
  const data = await db("voters")
    .where({ voter_hash: args.voter_hash })
    .update({ has_voted: args.voted });

  return data;
};

export const resolvers = {
  Voter: {
    // List employees attributes here...
    votes: getVotersVotings,
    createdAt: ({ createdAt }) => (createdAt ? createdAt.toISOString() : null),
    updatedtAt: ({ updatedtAt }) =>
      updatedtAt ? updatedtAt.toISOString() : null,
  },

  Query: {
    voters,
    voterList,
    votersVotedList,
  },

  Mutation: {
    addVoter,
    setHasVoted,
  },
};
