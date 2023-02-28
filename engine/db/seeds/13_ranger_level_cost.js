exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ranger.ranger_level_cost')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ranger.ranger_level_cost').insert([
        {
          level_min: 1,
          level_max: 5,
          cost: 100,
        },
        {
          level_min: 6,
          level_max: 10,
          cost: 150,
        },
        {
          level_min: 11,
          level_max: 15,
          cost: 200,
        },
        {
          level_min: 16,
          level_max: 20,
          cost: 250,
        },
        {
          level_min: 21,
          level_max: 30,
          cost: 300,
        },
        {
          level_min: 31,
          level_max: 40,
          cost: 400,
        },
        {
          level_min: 41,
          level_max: 50,
          cost: 500,
        },
        {
          level_min: 51,
          level_max: 100,
          cost: 1000,
        },
      ])
    })
}
