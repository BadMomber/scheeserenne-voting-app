exports.up = knex =>
  knex.schema.createTable("votings", t => {
    t.increments("id")
    t.integer("voter_id")
      .references("id")
      .inTable("voters")
    t.integer("scheese_id")
      .references("id")
      .inTable("scheese")
    t.integer("rank")
    // t.enum("voting_category", ["one", "two", "three"]).notNull()
    t.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTableIfExists("votings")
