import db from "./db.js"

const deserializeUser = async id => {
  const user = await db
    .select("*")
    .from("user")
    .where({ id })
    .first()

  if (!user) {
    throw new Error("User not found")
  }

  return user
}

export default async ({ req, res, connection }) => {
  let currentUser = null

  if (connection) {
    req = connection.context.req
  }

  if (req.session && req.session.userId) {
    try {
      currentUser = await deserializeUser(req.session.userId)
    } catch (e) {
      console.error("INVALID USER IN SESSION", e)
    }
  }

  const ip = req.ip

  return {
    req,
    res,
    currentUser,
    userId: currentUser ? currentUser.id : null,
    ip,
  }
}
