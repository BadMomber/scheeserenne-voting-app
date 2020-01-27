exports.up = knex =>
  knex.schema.createTable("votings", t => {
    t.increments("id")
    t.string("ip")
      .references("ip")
      .inTable("voters")
    t.integer("scheese_id")
      .references("id")
      .inTable("scheese")
    t.integer("points")
    t.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTableIfExists("votings")
