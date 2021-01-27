exports.up = knex =>
  knex.schema.createTable("scheese_pairs", t => {
    t.increments("id")
    t.integer("scheese_one")
      .references("id")
      .inTable("scheese")
      .notNull()
    t.integer("scheese_two")
      .references("id")
      .inTable("scheese")
      .notNull()
    t.float("weight").notNull()
    t.float("distance").notNull()
    t.float("normed_distance").defaultTo(0)
    // t.enum("voting_category", ["one", "two", "three"]).notNull()
    t.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTableIfExists("scheese_pairs")
