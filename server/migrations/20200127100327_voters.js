exports.up = knex =>
  knex.schema.createTable("voters", t => {
    t.increments("id")
    t.integer("number")
      .unique()
      .notNull()
    t.string("ip")
    t.string("session_id").unique()
    t.boolean("has_voted")
      .defaultTo(false)
      .notNull()
    t.boolean("terms_accepted")
      .defaultTo(false)
      .notNull()
    t.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTableIfExists("voters")
