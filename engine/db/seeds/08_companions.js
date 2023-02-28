exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('ranger.companions')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('ranger.companions').insert([
          {},
        ])
      })
  }
  