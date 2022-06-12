exports.up = (knex) =>
  knex.schema.createTable("voting_status", (t) => {
    t.increments("id");
    t.enum("name", ["voting1", "voting2", "voting3"]);
    t.enum("status", ["active", "inactive"]).defaultTo("inactive");
    t.string("voting_message");
    t.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists("voting_status");
