exports.up = (knex) =>
  knex.schema.createTable("scheese", (t) => {
    t.increments("id");
    t.enum("class", ["kat1", "kat2", "kat3"]).defaultTo("season");
    t.string("name")
      .unique()
      .notNull();
    t.string("image");
    t.boolean("finished")
      .defaultTo(true)
      .notNull();
    t.float("value").defaultTo(0);
    t.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists("scheese");
