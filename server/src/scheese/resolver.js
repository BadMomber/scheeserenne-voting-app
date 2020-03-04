import _ from "lodash"
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay"

import db from "../db.js"
const path = require("path")
const { createWriteStream } = require("fs")

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

const scheeseList = async (root, args, ctx) => {
  const data = await db("scheese")
    .select("*")
    .then(rows => {
      return rows
    })

  return data
}

const scheeseById = async (root, args, ctx) => {
  const data = await db("scheese")
    .where({ id: args.id })
    .first()

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

// async uploadPhoto (parent, { photo }) {
//   const { filename, createReadStream } = await photo

//   try {
//     const result = await new Promise((resolve, reject) => {
//       createReadStream().pipe(
//         cloudinary.uploader.upload_stream((error, result) => {
//           if (error) {
//             reject(error)
//           }

//           resolve(result)
//         })
//       )
//     })

//     const newPhoto = { filename, path: result.secure_url }

//     photos.push(newPhoto)

//     return newPhoto
//   } catch (err) {
//     console.log(err)
//   }
// }

const addScheese = async (root, { name, picture }, ctx) => {
  // console.log("picture path: ", picturePath)
  // console.log("picture: ", picture)

  const { createReadStream, filename, mimetype, encoding } = await picture
  console.log("filename: ", filename)
  console.log("createReadStream: ", createReadStream)

  await new Promise(() =>
    createReadStream()
      .pipe(createWriteStream(path.join(__dirname, "../uploads/", filename)))
      .on("close"),
  )

  const newScheese = {
    name: name,
    picture: picture,
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
    scheeseList,
    scheeseById,
    finishedScheese,
    notFinishedScheese,
  },

  Mutation: {
    addScheese,
  },
}
