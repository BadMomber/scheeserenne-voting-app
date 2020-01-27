exports.up = knex =>
  knex.schema.createTable("voters", t => {
    t.increments("id")
    t.string("ip")
      .unique()
      .notNull()
    t.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTableIfExists("voters")
