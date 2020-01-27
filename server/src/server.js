import app from "./app"
import { HOST, PORT } from "./config"
// import { report } from "./errors"
// import { onShutdown, shutdown } from "./shutdown"

// tslint:disable no-console
console.time("API START")

// Launch Node.js server
const server = app.listen(PORT, HOST, () => {
  // const date = new Date()
  const time = new Date()
  console.log(time.toISOString())
  console.log(`Node.js API server is listening on http://${HOST}:${PORT}/`)
  console.timeEnd("API START")
})

// Shutdown Node.js app gracefully
// function handleExit(options = { cleanup, exit }, err) {
//   if (options.cleanup) {
//     shutdown()
//       .then(() => process.exit())
//       // tslint:disable-next-line:no-shadowed-variable
//       .catch(err => {
//         console.error(err)
//         process.exit(1)
//       })
//   }
//   if (err) {
//     report(err)
//   }
//   if (options.exit) {
//     // eslint-disable-next-line no-process-exit
//     process.exit()
//   }
// }

// onShutdown("http", () => server.close())

// kubernetes kill signal
// process.on("SIGTERM", handleExit.bind(null, { cleanup: true }))

// kubernetes sigkill after spec.terminationGracePeriodSeconds
// esm module breaks up SIGKILL
// process.on("SIGKILL", handleExit.bind(null, { exit: true }))

// ctrl+c
// process.on("SIGINT", handleExit.bind(null, { exit: true }))

// process.on("uncaughtException", handleExit.bind(null, { exit: true }))

export default server
