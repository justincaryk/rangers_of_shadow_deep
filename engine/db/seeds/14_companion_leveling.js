exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('ranger.companion_leveling')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('ranger.companion_leveling').insert([
          {},
        ])
      })
  }
  