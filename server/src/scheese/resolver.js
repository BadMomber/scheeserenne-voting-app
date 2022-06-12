import fs from "fs";
import _ from "lodash";
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay";
import mime from "mime/lite";
import db from "../db.js";

const scheese = async (root, args, { currentUser }) => {
  const limit = typeof args.first === "undefined" ? "200" : args.first;
  const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

  const data = await db
    .table("scheese")
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

const scheeseListOne = async (root, args, ctx) => {
  const data = await db("scheese")
    .select("*")
    .where({ finished: true })
    .where({ class: "kat1" })
    .then((rows) => {
      return rows;
    });
  calculateResult();
  return data;
};

const scheeseListTwo = async (root, args, ctx) => {
  const data = await db("scheese")
    .select("*")
    .where({ finished: true })
    .where({ class: "kat2" })
    .orWhere({ class: "kat1" })
    .then((rows) => {
      return rows;
    });
  calculateResult();
  return data;
};

const scheeseListThree = async (root, args, ctx) => {
  const data = await db("scheese")
    .select("*")
    .where({ finished: true })
    .where({ class: "kat3" })
    .then((rows) => {
      return rows;
    });
  calculateResult();
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
    .then((rows) => {
      return rows;
    });

  return data;
};

const notFinishedScheese = async (root, args, ctx) => {
  const data = await db("scheese")
    .select("*")
    .where({ finished: false })
    .then((rows) => {
      return rows;
    });

  return data;
};

const addScheese = async (root, { name }, ctx) => {
  const newScheese = {
    name: name,
  };
  console.log("hello");
  const data = await db
    .insert(newScheese)
    .returning("id")
    .into("scheese")
    .then(async (id) => {
      const createdScheese = await db("scheese")
        .select("*")
        .where({ id: id.toString() })
        .first();

      return createdScheese;
    });

  return data;
};

const removeScheese = async (root, { id }, ctx) => {
  // const data = await db("scheese")
  //   .where("id", id)
  //   .del();
  // console.log("removeScheese " + new Date());
  // return data.id;
};

const calculateResult = async () => {
  const scheese = await db("scheese")
    .select("*")
    .then((rows) => {
      return rows;
    });

  const pairs = await db("scheese_pairs")
    .select("*")
    .then((rows) => {
      return rows;
    });

  scheese.forEach(async (scheese) => {
    let value = 0;

    // Check this because its wrong
    // Changed * pair.weight to / pair.weight
    pairs.forEach((pair) => {
      if (pair.scheeseOne === scheese.id) {
        value = value + pair.distance / pair.weight;
        // console.log("value: ", value);
      } else if (pair.scheeseTwo === scheese.id) {
        value = value - pair.distance / pair.weight;
      }
    });

    await db("scheese")
      .where({ id: scheese.id })
      .update({ value: value });
  });
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

  Mutation: {
    addScheese,
    removeScheese,
  },
};
