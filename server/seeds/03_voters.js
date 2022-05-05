exports.seed = (knex) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const voters = [];
  const chars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  while (voters.length < 1500) {
    // const r = Math.floor(Math.random() * 100000000) + 1;
    let code = [];

    // if (voters.indexOf(r) === -1) {
    //   voters.push({
    //     hash: r.toString(),
    //   });
    // }

    for (let i = 0; i < 6; i++) {
      const rand = getRandomInt(35);
      code.push(chars[rand]);
    }

    code = code.join("");

    if (voters.indexOf(code) === -1) {
      voters.push({
        voter_hash: code,
      });
    }
  }

  return knex("voters").insert([...voters]);
};
