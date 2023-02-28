const { Stats } = require('../../constants')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ranger.stats')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ranger.stats').insert([
        {
          name: Stats.move,
          type: 'base',
        },
        {
          name: Stats.fight,
          type: 'base',
        },
        {
          name: Stats.shoot,
          type: 'base',
        },
        {
          name: Stats.armor,
          type: 'base',
        },
        {
          name: Stats.will,
          type: 'base',
        },
        {
          name: Stats.health,
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
