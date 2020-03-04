const { range } = require("lodash")

exports.seed = knex => {
  const voters = range(500).map(index => ({
    number: 1000 + index,
  }))

  return knex("voters").insert([...voters])
}
