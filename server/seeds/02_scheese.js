const faker = require("faker")
const { range } = require("lodash")

exports.seed = knex => {
  const scheese = range(10).map(index => ({
    name: faker.internet.userName().toLowerCase(),
  }))

  return knex("scheese").insert([...scheese])
}
