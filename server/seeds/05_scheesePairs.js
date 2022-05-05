exports.seed = async (knex) => {
  const allScheese = await knex("scheese")
    .select("*")
    .then((rows) => {
      return rows;
    });

  console.log(allScheese);

  for (let i = 0; i < allScheese.length; i++) {
    console.log(i);
    for (let j = i + 1; j < allScheese.length; j++) {
      const scheesePair = {
        scheese_one: allScheese[i].id,
        scheese_two: allScheese[j].id,
        weight: 0,
        distance: 0,
        normed_distance: 0,
      };
      await knex("scheese_pairs").insert(scheesePair);
    }
  }
};
