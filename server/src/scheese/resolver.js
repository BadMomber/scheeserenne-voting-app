import fs from "fs"
import _ from "lodash"
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay"
import mime from "mime/lite"
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

const scheeseList = async (root, args, ctx) => {
  const data = await db("scheese")
    .select("*")
    .then(rows => {
      return rows
    })
  calculateResult()
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

const addScheese = async (root, { name, picture }, ctx) => {
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

export const uploadFile = async (stream, filename, mimetype) => {
  const file = await saveFileFromStream(stream, filename, mimetype)

  return file
}

const saveFileFromStream = (stream, filename, mimetype) => {
  const ext = mime.getExtension(mimetype).replace("jpeg", "jpg")

  const fname = `${filename}.${ext}`

  const IMG_STORAGE_PATH = "./uploads"

  const path = `${IMG_STORAGE_PATH}/${fname}`

  return new Promise((resolve, reject) =>
    stream
      .on("error", error => {
        if (stream.truncated) {
          // Delete the truncated file
          fs.unlinkSync(path)
        }
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on("error", error => reject(error))
      .on("finish", () => resolve({ fname, path })),
  )
}

const calculateResult = async () => {
  const scheese = await db("scheese")
    .select("*")
    .then(rows => {
      return rows
    })

  const pairs = await db("scheese_pairs")
    .select("*")
    .then(rows => {
      return rows
    })

  scheese.forEach(async scheese => {
    let value = 0

    // Check this because its wrong
    // Changed * pair.weight to / pair.weight
    pairs.forEach(pair => {
      if (pair.scheeseOne === scheese.id) {
        value = value + pair.distance / pair.weight
        console.log("value: ", value)
      } else if (pair.scheeseTwo === scheese.id) {
        value = value - pair.distance / pair.weight
      }
    })

    await db("scheese")
      .where({ id: scheese.id })
      .update({ value: value })
  })
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
    uploadFile,
  },
}
