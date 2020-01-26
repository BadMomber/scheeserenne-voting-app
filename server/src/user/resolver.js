import _ from "lodash"
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay"
import { compare, hash } from "bcrypt"

import db from "../db.js"

const LOGIN_ERROR_MESSAGE = "Invalid login credentials"
const LOGOUT_SUCCESS_MESSAGE = "See you"

const users = async (root, args, { currentUser }) => {
  const limit = typeof args.first === "undefined" ? "200" : args.first
  const offset = args.after ? cursorToOffset(args.after) + 1 : 0

  const data = await db
    .table("user")
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

const userById = async (root, args, ctx) => {
  const user = await db("user")
    .where({ id: args.id })
    .first()

  console.log(user)
  return user
}

const notAssignedEmployees = async (root, args, ctx) => {
  const data = await db("user")
    .select("user.*")
    .where({ role: "employee" })
    .leftJoin("user_jobsite", "user_jobsite.user_id", "user.id")
    .whereNull("user_jobsite.user_id")

  return data
}

const notAssignedForemen = async (root, args, ctx) => {
  const data = await db("user")
    .select("user.*")
    .where({ role: "foreman" })
    .leftJoin("user_jobsite", "user_jobsite.user_id", "user.id")
    .whereNull("user_jobsite.user_id")

  console.log("notAssignedForemen", data)

  return data
}

const timesheetForUser = async ({ id }, args, ctx) => {
  const today = moment()
  console.log("id", id)
  const data = await db("timesheet")
    .select("*")
    .where({ foreman_id: id })
    .where("from_date", "<", today)
    .where("to_date", ">", today)
    .first()
    .then(row => {
      return row
    })

  console.log("timesheetsForForeman", data)

  return data
}

const newUser = async (root, args, ctx) => {
  const newUser = {
    username: args.username,
    email: args.email,
    first_name: args.firstName,
    last_name: args.lastName,
    employee_number: args.employeeNumber,
    phone: args.phone,
    role: args.role,
    password: await hash(args.password, 10),
  }

  if (args.role === "admin" || args.role === "foreman") {
    // Send mail with login credentials ...
    const sender = "cspa@kolasinac.de"
    const to = INTERN_EMAIL_RECIPIENT
    const subject = "login credentials for new User" + " " + args.username
    const text =
      "New user created: \n" +
      "Nutzername: " +
      args.username +
      "\n" +
      "Passwort: " +
      args.password
    const attachment = null

    mailer(sender, to, subject, text, attachment)
  }

  const data = await db
    .insert(newUser)
    .returning("id")
    .into("user")
    .then(async id => {
      const createdUser = await db("user")
        .select("*")
        .where({ id: id.toString() })
        .first()

      return createdUser
    })

  return data
}

const updateUserName = (root, { newUserName }, ctx) => {}

const login = async (root, args, ctx) => {
  const user = await db
    .select("*")
    .from("user")
    .where({
      username: args.username,
    })
    .first()

  if (!user) {
    throw new Error(LOGIN_ERROR_MESSAGE)
  }

  const isPasswordEqual = await compare(args.password, user.password)

  if (!isPasswordEqual) {
    throw new Error(LOGIN_ERROR_MESSAGE)
  }

  // set user id in session
  ctx.req.session.userId = user.id

  ctx.currentUser = user

  return user
}

const logout = async (root, args, { req }) => {
  await new Promise((resolve, reject) =>
    req.session.destroy(err => (err ? reject(err) : resolve())),
  )

  return {
    message: LOGOUT_SUCCESS_MESSAGE,
  }
}

export const resolvers = {
  User: {
    // List employees attributes here...
    name: ({ firstName, lastName }) => firstName + " " + lastName,
    timesheet: timesheetForUser,
    createdAt: ({ createdAt }) => (createdAt ? createdAt.toISOString() : null),
    updatedtAt: ({ updatedtAt }) =>
      updatedtAt ? updatedtAt.toISOString() : null,
  },

  Query: {
    me: (root, args, { userId }) => userById(root, { id: userId }),
    users,
    userById,
    notAssignedEmployees,
    notAssignedForemen,
  },

  Mutation: {
    login,
    logout,
    newUser,
    updateUserName,
  },
}
