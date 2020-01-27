const { hash } = require("bcrypt")
const { range } = require("lodash")

exports.seed = async knex => {
  const globalPassword = "password"
  const password = await hash(globalPassword, 10)

  const admins = range(1).map(index => ({
    username: "kerstenkriegbaum",
    email: "kersten@badmomber.com",
    password,
    role: "admin",
    first_name: "Kersten",
    last_name: "Kriegbaum",
  }))

  return knex("user").insert(...admins)
}
