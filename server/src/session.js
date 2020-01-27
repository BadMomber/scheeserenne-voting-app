import expressSession from "express-session"
import connectRedis from "connect-redis"

import redisClient from "./redis.js"

import { COOKIE_SECRET } from "./config.js"

const RedisStore = connectRedis(expressSession)

const sessionConfig = {
  store: new RedisStore({ client: redisClient }),
  name: "sid", // public session id cookie name
  resave: false,
  saveUninitialized: false,
  secret: COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    maxAge: null,
    secure: false, // frontend accesses api via http://api, secure does only work when being accessed over https:// which is not available
    // domain: IS_PRODUCTION ? "whatever.com" : "",
  },
}

export const sessionMiddleware = expressSession(sessionConfig)
