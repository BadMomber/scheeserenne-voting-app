const { hash } = require("bcrypt");
const { range } = require("lodash");

exports.seed = async (knex) => {
  const globalPassword = "password";
  const password = await hash(globalPassword, 10);

  const admins = range(1).map((index) => ({
    password,
  }));

  return knex("user").insert(...admins);
};
