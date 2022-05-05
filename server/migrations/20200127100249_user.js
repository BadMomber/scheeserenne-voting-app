exports.up = (knex) =>
  knex.schema.createTable("user", (t) => {
    t.increments("id");
    t.string("password").notNull();
    t.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists("user");
