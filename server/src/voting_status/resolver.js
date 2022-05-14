import _ from "lodash";
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay";

import db from "../db.js";

// const votingStati = async (root, args, { currentvote }) => {
//   const limit = typeof args.first === "undefined" ? "200" : args.first;
//   const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

//   const data = await db
//     .table("voting_status")
//     .select("*", db.raw("count(*) OVER() as total_count"))
//     .limit(limit)
//     .offset(offset)
//     .then((rows) => {
//       return rows;
//     });

//   const totalCount = data[0] ? parseInt(data[0].totalCount) : 0;

//   return {
//     ...connectionFromArraySlice(data, args, {
//       sliceStart: offset,
//       arrayLength: totalCount,
//     }),
//     totalCount,
//   };
// };

const votingStati = async (root, args, ctx) => {
  const data = await db("voting_status")
    .select("*")
    .then((rows) => {
      return rows;
    });

  console.log("data", data);
  return data;
};

const votingStatusById = async (root, args, ctx) => {
  const vote = await db("voting_status")
    .where({ id: args.id })
    .first();

  return vote;
};

export const resolvers = {
  VotingStatus: {
    // List employees attributes here...
    createdAt: ({ createdAt }) => (createdAt ? createdAt.toISOString() : null),
    updatedtAt: ({ updatedtAt }) =>
      updatedtAt ? updatedtAt.toISOString() : null,
  },

  Query: {
    votingStati,
    votingStatusById,
  },
};
