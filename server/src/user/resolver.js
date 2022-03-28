import _ from "lodash";
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay";
import { compare, hash } from "bcrypt";

import db from "../db.js";

const LOGIN_ERROR_MESSAGE = "Invalid login credentials";
const LOGOUT_SUCCESS_MESSAGE = "See you";

const users = async (root, args, { currentUser }) => {
  const limit = typeof args.first === "undefined" ? "200" : args.first;
  const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

  const data = await db
    .table("user")
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

const userById = async (root, args, ctx) => {
  const user = await db("user")
    .where({ id: args.id })
    .first();

  console.log("root: ", root);
  console.log("args: ", args);
  console.log("user: ", user);
  console.log("ctx: ", ctx);
  return user;
};

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
  };

  const data = await db
    .insert(newUser)
    .returning("id")
    .into("user")
    .then(async (id) => {
      const createdUser = await db("user")
        .select("*")
        .where({ id: id.toString() })
        .first();

      return createdUser;
    });

  return data;
};

const login = async (root, args, ctx) => {
  const user = await db
    .select("*")
    .from("user")
    .where({
      username: args.username,
    })
    .first();

  if (!user) {
    throw new Error(LOGIN_ERROR_MESSAGE);
  }

  const isPasswordEqual = await compare(args.password, user.password);

  if (!isPasswordEqual) {
    throw new Error(LOGIN_ERROR_MESSAGE);
  }

  // set user id in session
  ctx.req.session.userId = user.id;

  console.log("ctx.req.session.userId: ", ctx.req.session.userId);

  ctx.currentUser = user;

  return user;
};

const logout = async (root, args, { req }) => {
  await new Promise((resolve, reject) =>
    req.session.destroy((err) => (err ? reject(err) : resolve()))
  );

  return {
    message: LOGOUT_SUCCESS_MESSAGE,
  };
};

export const resolvers = {
  User: {
    // List employees attributes here...
    name: ({ firstName, lastName }) => firstName + " " + lastName,
    createdAt: ({ createdAt }) => (createdAt ? createdAt.toISOString() : null),
    updatedtAt: ({ updatedtAt }) =>
      updatedtAt ? updatedtAt.toISOString() : null,
  },

  Query: {
    me: (root, args, { userId }) => userById(root, { id: userId }),
    users,
    userById,
  },

  Mutation: {
    login,
    logout,
    newUser,
  },
};
