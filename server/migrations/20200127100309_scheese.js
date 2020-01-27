exports.up = knex =>
  knex.schema.createTable("scheese", t => {
    t.increments("id")
    t.string("name")
      .unique()
      .notNull()
    t.boolean("finished")
      .defaultTo(false)
      .notNull()
    t.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTableIfExists("scheese")
