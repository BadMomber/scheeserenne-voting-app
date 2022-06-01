const faker = require("faker");
const { range } = require("lodash");

const pgsql = require("knex")({
  client: "postgresql",
  connection: process.env.DATABASE_URL,
  useNullAsDefault: true,
});

pgsql
  .raw("SELECT 1")
  .then(() => {
    console.log("PostgreSQL connected");
  })
  .catch((e) => {
    console.log("PostgreSQL not connected");
    console.error(e);
  });

exports.seed = (knex) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  const scheese = range(10).map((index) => ({
    name: faker.internet.userName().toLowerCase(),
    image: "https://badmomber.com/scheese/00" + getRandomInt(4) + ".jpeg",
  }));

  return knex("scheese").insert([...scheese]);
};
