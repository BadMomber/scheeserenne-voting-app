exports.seed = async (knex) => {
  const voting_message =
    "Willkommen beim Scheeserenne 2022 und viel Spaß bei der Abstimmung";
  const voting_is_active = true;

  const status = {
    voting_message: voting_message,
    voting_is_active: voting_is_active,
  };
  await knex("voting_status").insert(status);
};
