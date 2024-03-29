import _ from 'lodash';
import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';

import db from '../db.js';

const votings = async (root, args, { currentvote }) => {
  const limit = typeof args.first === 'undefined' ? '200' : args.first;
  const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

  const data = await db
    .table('votings')
    .select('*', db.raw('count(*) OVER() as total_count'))
    .limit(limit)
    .offset(offset)
    .then((rows) => {
      return rows;
    });

  const totalCount = data[0] ? parseInt(data[0].totalCount) : 0;

  return {
    ...connectionFromArraySlice(data, args, {
      sliceStart: offset,
      arrayLength: totalCount,
    }),
    totalCount,
  };
};

const pointsForScheese = async (root, args, ctx) => {
  const points = await db('votings').sum('points');

  console.log(
    '------ !!!!!! ------ points ------ !!!!!! ------',
    new Date(),
    points
  );

  return points;
};

const voteById = async (root, args, ctx) => {
  const vote = await db('vote')
    .where({ id: args.id })
    .first();

  return vote;
};

const votingsForScheeseVotingOne = async (root, args, ctx) => {
  const v = await db('votings').where({ scheese_id: args.scheeseId });

  return v;
};

const votingsForScheeseVotingTwo = async (root, args, ctx) => {
  const v = await db('votings_2').where({ scheese_id: args.scheeseId });

  return v;
};

const votingsForScheeseVotingThree = async (root, args, ctx) => {
  const v = await db('votings_3').where({ scheese_id: args.scheeseId });

  return v;
};

function comparePoints(a, b) {
  if (a.points_total > b.points_total) {
    return -1;
  }
  if (a.points_total < b.points_total) {
    return 1;
  }
  return 0;
}

const allVotes = async (root, args, ctx) => {
  // Divide SUM by COUNT
  console.log('allVotes');
  const votes = await db.raw(
    'SELECT DISTINCT scheese_id, points_total from (SELECT scheese_id, points, SUM(points) over (partition by scheese_id) as points_total FROM votings order by scheese_id) AS x;'
  );

  const votings = await db
    .table('votings')
    .select('*')
    .then((rows) => {
      return rows;
    });

  console.log('votings:', votings.length);

  // TODO: Get sum of votes for one scheese. Divide points for scheese by sum of votes for scheese.
  console.log('votes:', votes.rows.sort(comparePoints));

  const sidArr = [];

  for (let i = 0; i < votings.length; i++) {
    sidArr.push(votings[i].scheeseId);
  }

  const uniq = [...new Set(sidArr)];

  console.log('sidArr: ', sidArr);

  console.log('uniq:', uniq);

  const uniqObj = uniq.map((u) => ({
    scheeseId: u,
    numberOfVotes: 0,
  }));

  for (const vote of votings) {
    for (const id of uniqObj) {
      if (vote.scheeseId === id.scheeseId) {
        id.numberOfVotes++;
      }
    }
  }

  console.log('uniqObj: ', uniqObj);

  const result = votes.rows
    .map((v) => ({
      scheeseId: v.scheese_id,
      points: v.points_total,
    }))
    .sort(comparePoints);

  for (const res of result) {
    for (const id of uniqObj) {
      if (res.scheeseId === id.scheeseId) {
        res.points = res.points / id.numberOfVotes;
      }
    }
  }

  console.log('result: ', result);

  return result;
};

const allVotesVoting2 = async (root, args, ctx) => {
  // Divide SUM by COUNT
  const votes = await db.raw(
    'SELECT DISTINCT scheese_id, points_total from (SELECT scheese_id, points, SUM(points) over (partition by scheese_id) as points_total FROM votings_2 order by scheese_id) AS x;'
  );

  const votings = await db
    .table('votings_2')
    .select('*')
    .then((rows) => {
      return rows;
    });

  console.log('votings:', votings.length);

  // TODO: Get sum of votes for one scheese. Divide points for scheese by sum of votes for scheese.
  console.log('votes:', votes.rows.sort(comparePoints));

  const sidArr = [];

  for (let i = 0; i < votings.length; i++) {
    sidArr.push(votings[i].scheeseId);
  }

  const uniq = [...new Set(sidArr)];

  console.log('sidArr: ', sidArr);

  console.log('uniq:', uniq);

  const uniqObj = uniq.map((u) => ({
    scheeseId: u,
    numberOfVotes: 0,
  }));

  for (const vote of votings) {
    for (const id of uniqObj) {
      if (vote.scheeseId === id.scheeseId) {
        id.numberOfVotes++;
      }
    }
  }

  console.log('uniqObj: ', uniqObj);

  const result = votes.rows
    .map((v) => ({
      scheeseId: v.scheese_id,
      points: v.points_total,
    }))
    .sort(comparePoints);

  for (const res of result) {
    for (const id of uniqObj) {
      if (res.scheeseId === id.scheeseId) {
        res.points = res.points / id.numberOfVotes;
      }
    }
  }

  console.log('result: ', result);

  return result;
};

const allVotesVoting3 = async (root, args, ctx) => {
  // Divide SUM by COUNT
  const votes = await db.raw(
    'SELECT DISTINCT scheese_id, points_total from (SELECT scheese_id, points, SUM(points) over (partition by scheese_id) as points_total FROM votings_3 order by scheese_id) AS x;'
  );

  const votings = await db
    .table('votings_3')
    .select('*')
    .then((rows) => {
      return rows;
    });

  console.log('votings:', votings.length);

  // TODO: Get sum of votes for one scheese. Divide points for scheese by sum of votes for scheese.
  console.log('votes:', votes.rows.sort(comparePoints));

  const sidArr = [];

  for (let i = 0; i < votings.length; i++) {
    sidArr.push(votings[i].scheeseId);
  }

  const uniq = [...new Set(sidArr)];

  console.log('sidArr: ', sidArr);

  console.log('uniq:', uniq);

  const uniqObj = uniq.map((u) => ({
    scheeseId: u,
    numberOfVotes: 0,
  }));

  for (const vote of votings) {
    for (const id of uniqObj) {
      if (vote.scheeseId === id.scheeseId) {
        id.numberOfVotes++;
      }
    }
  }

  console.log('uniqObj: ', uniqObj);

  const result = votes.rows
    .map((v) => ({
      scheeseId: v.scheese_id,
      points: v.points_total,
    }))
    .sort(comparePoints);

  for (const res of result) {
    for (const id of uniqObj) {
      if (res.scheeseId === id.scheeseId) {
        res.points = res.points / id.numberOfVotes;
      }
    }
  }

  console.log('result: ', result);

  return result;
};

const votingOneByVoterCode = async (root, args, ctx) => {
  try {
    console.log('args: ', args);

    const v = await db('votings')
      .select('*')
      .where({ voter_hash: args.voter_hash })
      .then((rows) => {
        console.log('rows:', rows);
        return rows;
      });

    console.log(new Date() + 'v: ' + v);
    return v;
  } catch (e) {
    console.log('Error in votingOneByVoterCode:', new Date() + ': ' + e);
  }
};

const votingTwoByVoterCode = async (root, args, ctx) => {
  const v = await db('votings_2')
    .select('*')
    .where({ voter_hash: args.voter_hash })
    .then((rows) => {
      return rows;
    });

  return v;
};

const votingThreeByVoterCode = async (root, args, ctx) => {
  const v = await db('votings_3')
    .select('*')
    .where({ voter_hash: args.voter_hash })
    .then((rows) => {
      return rows;
    });

  return v;
};

const addVotes = async (root, args, ctx) => {
  // Delete all Votes with given hash before saving new one
  console.log('args', args);
  const delData = await db('votings')
    .where('voter_hash', args.votes[0].voter_hash)
    .del();

  const data = await db
    .insert([...args.votes])
    .returning('voter_hash')
    .into('votings')
    .then(async (voterHash) => {
      const createdVotes = await db('votings')
        .select('*')
        .where({ voter_hash: voterHash.toString() });

      console.log('createdVote', createdVotes);
      return createdVotes;
    });

  console.log('addVotes data', data);
  return data;
};

const addVotesVoting2 = async (root, args, ctx) => {
  // Delete all Votes with given hash before saving new one
  console.log('args', args);
  const delData = await db('votings_2')
    .where('voter_hash', args.votes[0].voter_hash)
    .del();

  console.log('delData', delData);
  console.log('args.votes', args.votes);
  const data = await db
    .insert([...args.votes])
    .returning('voter_hash')
    .into('votings_2')
    .then(async (voterHash) => {
      const createdVotes = await db('votings_2')
        .select('*')
        .where({ voter_hash: voterHash.toString() });

      console.log('createdVote', createdVotes);
      return createdVotes;
    });

  console.log('addVotes data', data);
  return data;
};

const addVotesVoting3 = async (root, args, ctx) => {
  // Delete all Votes with given hash before saving new one
  console.log('args', args);
  const delData = await db('votings_3')
    .where('voter_hash', args.votes[0].voter_hash)
    .del();

  console.log('delData', delData);
  console.log('args.votes', args.votes);
  const data = await db
    .insert([...args.votes])
    .returning('voter_hash')
    .into('votings_3')
    .then(async (voterHash) => {
      const createdVotes = await db('votings_3')
        .select('*')
        .where({ voter_hash: voterHash.toString() });

      console.log('createdVote', createdVotes);
      return createdVotes;
    });

  console.log('addVotes data', data);
  return data;
};

export const resolvers = {
  Vote: {
    // List employees attributes here...
    createdAt: ({ createdAt }) => (createdAt ? createdAt.toISOString() : null),
    updatedtAt: ({ updatedtAt }) =>
      updatedtAt ? updatedtAt.toISOString() : null,
  },

  Query: {
    votings,
    voteById,
    votingOneByVoterCode,
    votingTwoByVoterCode,
    votingThreeByVoterCode,
    votingsForScheeseVotingOne,
    votingsForScheeseVotingTwo,
    votingsForScheeseVotingThree,
    pointsForScheese,
    allVotes,
    allVotesVoting2,
    allVotesVoting3,
  },

  Mutation: {
    addVotes,
    addVotesVoting2,
    addVotesVoting3,
  },
};
