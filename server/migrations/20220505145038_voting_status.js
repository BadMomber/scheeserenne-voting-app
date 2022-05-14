exports.up = (knex) =>
  knex.schema.createTable("voting_status", (t) => {
    t.increments("id");
    t.boolean("voting_is_active")
      .defaultTo(false)
      .notNull();
    t.string("voting_message");
    t.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists("voting_status");
