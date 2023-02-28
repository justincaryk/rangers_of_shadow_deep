exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ranger.stats')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ranger.stats').insert([
        {
          name: 'move',
          type: 'base',
        },
        {
          name: 'fight',
          type: 'base',
        },
        {
          name: 'shoot',
          type: 'base',
        },
        {
          name: 'armor',
          type: 'base',
        },
        {
          name: 'will',
          type: 'base',
        },
        {
          name: 'health',
          type: 'base',
        },
        {
          name: 'notes',
          type: 'extended',
        },
        {
          name: 'damage-inflict',
          type: 'modifier',
        },
        {
          name: 'damage-take',
          type: 'modifier',
        },
        {
          name: 'will-roll-dc-bonus',
          type: 'modifier',
        },
        {
          name: 'will-roll-bonus',
          type: 'modifier',
        },
        {
          name: 'magic-shooting-bonus',
          type: 'modifier',
        },
      ])
    })
}
