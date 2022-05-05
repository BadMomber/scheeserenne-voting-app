exports.up = (knex) =>
  knex.schema.createTable("scheese", (t) => {
    t.increments("id");
    t.string("name")
      .unique()
      .notNull();
    t.string("image");
    t.boolean("finished")
      .defaultTo(false)
      .notNull();
    t.float("value").defaultTo(0);
    t.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists("scheese");
