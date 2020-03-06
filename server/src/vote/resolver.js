import _ from "lodash"
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay"
import { compare, hash } from "bcrypt"

import db from "../db.js"

const votings = async (root, args, { currentvote }) => {
  const limit = typeof args.first === "undefined" ? "200" : args.first
  const offset = args.after ? cursorToOffset(args.after) + 1 : 0

  const data = await db
    .table("votings")
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

const voteById = async (root, args, ctx) => {
  const vote = await db("vote")
    .where({ id: args.id })
    .first()

  return vote
}

const votingsForScheese = async (root, args, ctx) => {
  // Code here...
}

const pointsForScheese = async (root, args, ctx) => {
  // Code here...
}

const addVote = async (root, args, ctx) => {
  const newVote = {
    voter_ip: ctx.ip,
    scheese_id: args.scheeseId,
    rank: args.points,
  }

  const data = await db
    .insert(newVote)
    .returning("id")
    .into("votings")
    .then(async id => {
      const createdUser = await db("user")
        .select("*")
        .where({ id: id.toString() })
        .first()

      return createdUser
    })

  return data
}

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
    addVote,
  },
}
