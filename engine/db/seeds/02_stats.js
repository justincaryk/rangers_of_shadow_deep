const { BaseStats } = require('../../constants')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ranger.stats')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ranger.stats').insert([
        {
          name: BaseStats.move,
          type: 'base',
        },
        {
          name: BaseStats.fight,
          type: 'base',
        },
        {
          name: BaseStats.shoot,
          type: 'base',
        },
        {
          name: BaseStats.armor,
          type: 'base',
        },
        {
          name: BaseStats.will,
          type: 'base',
        },
        {
          name: BaseStats.health,
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
