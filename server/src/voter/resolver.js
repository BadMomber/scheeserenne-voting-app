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

const voterById = async (root, args, ctx) => {
  const voter = await db("voters")
    .where({ id: args.id })
    .first();

  return voter;
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

// const voterByIp = async (root, args, ctx) => {
//   const data = await db("voters")
//     .select("*")
//     .where({ ip: ctx.ip })
//     .first()

//   console.log("ctx ip:", ctx.ip)
//   console.log("voter:", data)
//   return data
// }

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

  console.log("ctx.req.session.voterId", ctx.req.session.voterId);
  console.log("ctx currentVoter:", ctx.currentVoter);
  console.log("addVoter returned data:", data);
  // console.log("addVoter sessionId:", ctx.sessionId)
  return data;
};

const setHasVoted = async (root, args, ctx) => {
  const data = await db("voters")
    .where({ hash: args.hash })
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
    voterById,
  },

  Mutation: {
    addVoter,
    setHasVoted,
  },
};
