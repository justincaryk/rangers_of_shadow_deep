exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ranger.companion_leveling')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ranger.companion_leveling').insert([
        {
          pp_milestone: 10,
        },
        {
          pp_milestone: 20,
        },
        {
          pp_milestone: 30,
        },
        {
          pp_milestone: 40,
        },
        {
          pp_milestone: 50,
        },
        {
          pp_milestone: 60,
        },
        {
          pp_milestone: 70,
        },
        {
          pp_milestone: 80,
        },
        {
          pp_milestone: 100,
        },
      ])
    })
}
