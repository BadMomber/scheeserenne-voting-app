const _ = require("lodash")

exports.seed = async knex => {
  const data = await knex("voters")
    .select("*")
    .limit(2)
    .then(rows => {
      return rows
    })

  for (let i = 0; i < data.length; i++) {
    let scheese = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    for (let j = 1; j < 11; j++) {
      let stop = false

      let rank = Math.floor(Math.random() * 10) + 1

      while (!stop && scheese.length > 0) {
        // console.log("scheese.includes(rank): ", scheese.includes(rank))
        // console.log("rank: ", rank)
        if (scheese.includes(rank)) {
          const vote = {
            voter_ip: data[i].ip,
            scheese_id: j,
            rank: rank,
          }
          // console.log("vote: ", vote)

          await knex("votings").insert(vote)
          scheese = _.remove(scheese, function(n) {
            return n !== rank
          })
          // console.log("scheese: ", scheese)
          stop = true
        } else if (rank === 1) {
          rank = 10
        } else {
          // console.log("rank --")
          rank--
        }
        // console.log("rank: ", rank)
      }
    }
  }

  return data
}
