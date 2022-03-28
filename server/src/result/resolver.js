import { connectionFromArraySlice, cursorToOffset } from "graphql-relay";
import db from "../db.js";

const scheesePairs = async (root, args, ctx) => {
  const limit = typeof args.first === "undefined" ? "200" : args.first;
  const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

  const data = await db
    .table("scheesePairs")
    .select("*", db.raw("count(*) OVER() as total_count"))
    .limit(limit)
    .offset(offset)
    .then((rows) => {
      return rows;
    });

  result();

  const totalCount = data[0] ? parseInt(data[0].totalCount) : 0;

  return {
    ...connectionFromArraySlice(data, args, {
      sliceStart: offset,
      arrayLength: totalCount,
    }),
    totalCount,
  };
};

// TODO: write function for weight calculation based on number of voted scheese
function calcWeight(nScheese) {
  try {
    if (nScheese <= 1) {
      throw new Error("nScheese <= 1");
    }
    let result = 0;
    for (let j = 1; j <= nScheese - 1; j++) {
      for (let i = 1; i <= j; i++) {
        result = result + i;
      }
    }
    // TODO: result = nScheese / result; may be not required
    result = nScheese / result;
    return result;
  } catch (e) {
    console.log(e);
  }
}

const basicWeights = [
  2,
  0.75,
  2 / 5,
  0.25,
  6 / 35,
  0.125,
  2 / 21,
  0.075,
  2 / 33,
  0.05,
  6 / 143,
  6 / 168,
  6 / 195,
  6 / 224,
];

const getResultsForOneVoter = async (voterIp) => {
  const data = await db("votings")
    .select("*")
    .where({ voter_ip: voterIp })
    .then((rows) => {
      return rows;
    });

  return data;
};

const result = async (root, args, ctx) => {
  const allScheesePairs = await db("scheese_pairs")
    .select("*")
    .then((rows) => {
      return rows;
    });

  await allScheesePairs.forEach(async (scheese) => {
    await db("scheese_pairs")
      .where({ id: scheese.id })
      .update({ weight: 0, distance: 0 });
  });

  const allVotes = await db("votings")
    .select("*")
    .then((rows) => {
      return rows;
    });

  const allVoters = await db("voters")
    .pluck("ip")
    .then((rows) => {
      return rows;
    });

  const allScheese = await db("scheese")
    .select("*")
    .then((rows) => {
      return rows;
    });

  // console.log("votes length: ", allVotes.length)

  // const populateScheesePairs = () => {
  //   for (let i = 0; i < allScheese.length; i++) {
  //     for (let j = i + 1; j < allScheese.length; j++) {
  //       const scheesePair = {
  //         scheese_one: allScheese[i].id,
  //         scheese_two: allScheese[j].id,
  //         weight: 0,
  //         distance: 0,
  //       }
  //       const data = db("scheesePairs").insert(scheesePair)
  //     }
  //   }
  // }

  const countVotes = async (voterIp) => {
    const allVotesforVoter = await getResultsForOneVoter(voterIp);

    console.log("allVotesforVoter: ", allVotesforVoter);

    for (let i = 0; i < allVotesforVoter.length; i++) {
      for (let j = i + 1; j < allVotesforVoter.length; j++) {
        if (allVotesforVoter[i].scheeseId < allVotesforVoter[j].scheeseId) {
          const scheesePair = allScheesePairs.find(
            (element) =>
              element.scheeseOne === allVotesforVoter[i].scheeseId &&
              element.scheeseTwo === allVotesforVoter[j].scheeseId
          );

          console.log("scheesePair: ", scheesePair);

          scheesePair.weight = scheesePair.weight + 1;
          scheesePair.distance =
            scheesePair.distance +
            (allVotesforVoter[i].rank - allVotesforVoter[j].rank) *
              basicWeights[allVotesforVoter.length - 2];

          await db("scheesePairs")
            .where({ id: scheesePair.id })
            .update(scheesePair);
        } else {
          console.log("hallo hallo 2 2");

          const scheesePair = allScheesePairs.find(
            (element) =>
              element.scheeseOne === allVotesforVoter[j].scheeseId &&
              element.scheeseTwo === allVotesforVoter[i].scheeseId
          );

          scheesePair.weight = scheesePair.weight + 1;
          scheesePair.distance =
            scheesePair.distance +
            (allVotesforVoter[j].rank - allVotesforVoter[i].rank) *
              basicWeights[allVotesforVoter.length - 2];

          // scheesePairTwo.weight =
          //   scheesePairTwo.weight + basicWeights[allVotesforVoter.length - 2]
          // scheesePairTwo.distance =
          //   scheesePairTwo.distance +
          //   (allVotesforVoter[j].rank - allVotesforVoter[i].rank)

          //   console.log("scheesePair: ", scheesePairTwo)
          await db("scheesePairs")
            .where({ id: scheesePair.id })
            .update(scheesePair);
        }
      }
    }

    return allScheesePairs;
  };

  //   console.log("allVoters: ", allVoters)

  allVoters.forEach(async (voter) => {
    await countVotes(voter);
  });

  console.log("allScheesePairs: ", allScheesePairs);

  //   console.log("allScheesePairs: ", allScheesePairs)
  return [allVotes, allScheese];
};

export const resolvers = {
  ScheesePair: {},

  Query: {
    scheesePairs,
  },

  Mutation: {},
};
