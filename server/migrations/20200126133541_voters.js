exports.up = knex =>
  knex.schema.createTable("voters", t => {
    t.increments("id")
    t.string("mac_address").unique()
    t.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTableIfExists("voters")
