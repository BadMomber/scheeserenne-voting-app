exports.up = (knex) =>
  knex.schema.createTable("voters", (t) => {
    t.increments("id");
    t.string("hash").unique();
    t.boolean("has_voted")
      .defaultTo(false)
      .notNull();
    t.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists("voters");
