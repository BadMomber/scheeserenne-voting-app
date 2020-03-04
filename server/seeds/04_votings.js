exports.seed = async knex => {
  const data = await knex("voters")
    .select("*")
    .limit(300)
    .then(rows => {
      return rows
    })

  // console.log("voters data:", data)

  for (let i = 0; i < data.length; i++) {
    const vote = {
      voter_id: data[i].id,
      scheese_id: Math.floor(Math.random() * 10) + 1,
      rank: Math.floor(Math.random() * 10) + 1,
    }
    console.log("vote: ", vote)

    await knex("votings").insert(vote)
  }

  return data
}
