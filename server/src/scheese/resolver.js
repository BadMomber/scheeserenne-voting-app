import _ from "lodash"
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay"

import db from "../db.js"

const scheese = async (root, args, { currentUser }) => {
  const limit = typeof args.first === "undefined" ? "200" : args.first
  const offset = args.after ? cursorToOffset(args.after) + 1 : 0

  const data = await db
    .table("scheese")
    .select("*", db.raw("count(*) OVER() as total_count"))
    .limit(limit)
    .offset(offset)
    .then(rows => {
      return rows
    })

  const totalCount = data[0] ? parseInt(data[0].totalCount) : 0

  return {
    ...connectionFromArraySlice(data, args, {
      sliceStart: offset,
      arrayLength: totalCount,
    }),
    totalCount,
  }
}

const scheeseById = async (root, args, ctx) => {
  const data = await db("scheese")
    .where({ id: args.id })
    .first()

  console.log(data)
  return data
}

const finishedScheese = async (root, args, ctx) => {
  const data = await db("scheese")
    .select("*")
    .where({ finished: true })
    .then(rows => {
      return rows
    })

  return data
}

const notFinishedScheese = async (root, args, ctx) => {
  const data = await db("scheese")
    .select("*")
    .where({ finished: false })
    .then(rows => {
      return rows
    })

  return data
}

const addScheese = async (root, args, ctx) => {
  const newScheese = {
    name: args.name,
  }

  const data = await db
    .insert(newScheese)
    .returning("id")
    .into("scheese")
    .then(async id => {
      const createdScheese = await db("scheese")
        .select("*")
        .where({ id: id.toString() })
        .first()

      return createdScheese
    })

  return data
}

export const resolvers = {
  Scheese: {
    // List scheese attributes here...
  },

  Query: {
    scheese,
    scheeseById,
    finishedScheese,
    notFinishedScheese,
  },

  Mutation: {
    addScheese,
  },
}
