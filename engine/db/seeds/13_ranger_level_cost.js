exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('ranger.ranger_level_cost')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('ranger.ranger_level_cost').insert([
          {},
        ])
      })
  }
  