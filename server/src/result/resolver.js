import { connectionFromArraySlice, cursorToOffset } from "graphql-relay";
import db from "../db.js";

const scheesePairs = async (root, args, ctx) => {
  const limit = typeof args.first === "undefined" ? "200" : args.first;
  const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

  console.log("in sheePairs " + new Date());

  const data = await db
    .table("scheesePairs")
    .select("*", db.raw("count(*) OVER() as total_count"))
    .limit(limit)
    .offset(offset)
    .then(rows => {
      return rows;
    });

  result();

  console.log("data", data);

  return data;

  // return {
  //   ...connectionFromArraySlice(data, args, {
  //     sliceStart: offset,
  //     arrayLength: totalCount,
  //   }),
  //   totalCount,
  // };
};

const result = async (root, args, ctx) => {
  const allScheesePairs = await db("scheese_pairs")
    .select("*")
    .then(rows => {
      return rows;
    });

  await allScheesePairs.forEach(async scheese => {
    await db("scheese_pairs")
      .where({ id: scheese.id })
      .update({ weight: 0, distance: 0 });
  });

  const allVotes = await db("votings")
    .select("*")
    .then(rows => {
      return rows;
    });

  const allScheese = await db("scheese")
    .select("*")
    .then(rows => {
      return rows;
    });

  console.log("allScheesePairs: ", allScheesePairs);

  //   console.log("allScheesePairs: ", allScheesePairs)
  return [allVotes, allScheese];
};

export const resolvers = {
  ScheesePair: {},

  Query: {
    scheesePairs,
  },

  Mutation: {},
};
