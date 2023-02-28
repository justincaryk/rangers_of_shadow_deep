exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('ranger.features')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('ranger.features').insert([
          {},
        ])
      })
  }
  