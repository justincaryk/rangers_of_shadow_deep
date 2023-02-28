exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('ranger.level_grants')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('ranger.level_grants').insert([
          {},
        ])
      })
  }
  