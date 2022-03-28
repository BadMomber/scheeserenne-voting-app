const faker = require("faker");
const { range } = require("lodash");

exports.seed = (knex) => {
  const voters = range(500).map((index) => ({
    hash: faker.datatype.string(16),
  }));

  return knex("voters").insert([...voters]);
};
