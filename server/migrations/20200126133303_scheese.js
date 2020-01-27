exports.up = knex =>
  knex.schema.createTable("scheese", t => {
    t.increments("id")
    t.string("name").unique()
    t.boolean("finished").defaultTo(false)
    t.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTableIfExists("scheese")
