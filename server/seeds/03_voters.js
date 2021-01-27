const faker = require("faker")
const { range } = require("lodash")

exports.seed = knex => {
  const voters = range(500).map(index => ({
    ip: faker.internet.ip(),
  }))

  return knex("voters").insert([...voters])
}
