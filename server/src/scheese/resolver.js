import { connectionFromArraySlice, cursorToOffset } from "graphql-relay";
import db from "../db.js";

const scheese = async (root, args, { currentUser }) => {
  const limit = typeof args.first === "undefined" ? "200" : args.first;
  const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

  const data = await db
    .table("scheese")
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

const scheeseListOne = async (root, args, ctx) => {
  const data = await db("scheese")
    .select("*")
    .where({ finished: true })
    .where({ class: "kat1" })
    .then(rows => {
      return rows;
    });
  return data;
};

const scheeseListTwo = async (root, args, ctx) => {
  const data = await db("scheese")
    .select("*")
    .where({ finished: true })
    .where({ class: "kat2" })
    .orWhere({ class: "kat1" })
    .then(rows => {
      return rows;
    });
  return data;
};

const scheeseListThree = async (root, args, ctx) => {
  const data = await db("scheese")
    .select("*")
    .where({ finished: true })
    .where({ class: "kat3" })
    .then(rows => {
      return rows;
    });
  return data;
};

const scheeseById = async (root, args, ctx) => {
  const data = await db("scheese")
    .where({ id: args.id })
    .first();

  return data;
};

const finishedScheese = async (root, args, ctx) => {
  const data = await db("scheese")
    .select("*")
    .where({ finished: true })
    .then(rows => {
      return rows;
    });

  return data;
};

const notFinishedScheese = async (root, args, ctx) => {
  const data = await db("scheese")
    .select("*")
    .where({ finished: false })
    .then(rows => {
      return rows;
    });

  return data;
};

export const resolvers = {
  Scheese: {
    // List scheese attributes here...
  },

  Query: {
    scheese,
    scheeseListOne,
    scheeseListTwo,
    scheeseListThree,
    scheeseById,
    finishedScheese,
    notFinishedScheese,
  },

  Mutation: {},
};
