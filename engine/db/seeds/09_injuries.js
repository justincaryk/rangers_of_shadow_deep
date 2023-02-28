exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('ranger.injuries')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('ranger.injuries').insert([
          {},
        ])
      })
  }
  