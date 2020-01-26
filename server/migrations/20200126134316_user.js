exports.up = knex =>
  knex.schema.createTable("user", t => {
    t.increments("id")
    t.string("username").unique()
    t.string("email").unique()
    t.string("password")
    t.enum("role", ["admin"]).notNull()
    t.string("first_name").notNull()
    t.string("last_name")
      .notNull()
      .notNull()
      .defaultTo(true)
    t.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTableIfExists("user")
