import { createClient } from "redis"
import { REDIS_URL } from "./config.js"

const options = {
  prefix: "sva",
  retry_strategy: options => {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection")
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      console.error(options.error)
      return new Error("Retry time exhausted")
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000)
  },
}

const client = createClient(REDIS_URL, options)

client.on("error", function(err) {
  console.error("Error " + err)
})

export default client
