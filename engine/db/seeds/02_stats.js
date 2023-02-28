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
          stat_type: 'base',
        },
        {
          name: BaseStats.fight,
          stat_type: 'base',
        },
        {
          name: BaseStats.shoot,
          stat_type: 'base',
        },
        {
          name: BaseStats.armor,
          stat_type: 'base',
        },
        {
          name: BaseStats.will,
          stat_type: 'base',
        },
        {
          name: BaseStats.health,
          stat_type: 'base',
        },
        {
          name: 'notes',
          stat_type: 'extended',
        },
        {
          name: 'damage-inflict',
          stat_type: 'modifier',
        },
        {
          name: 'damage-take',
          stat_type: 'modifier',
        },
        {
          name: 'will-roll-dc-bonus',
          stat_type: 'modifier',
        },
        {
          name: 'will-roll-bonus',
          stat_type: 'modifier',
        },
        {
          name: 'magic-shooting-bonus',
          stat_type: 'modifier',
        },
      ])
    })
}
