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
          ranger_default: 6,
        },
        {
          name: BaseStats.fight,
          stat_type: 'base',
          ranger_default: 2,
        },
        {
          name: BaseStats.shoot,
          stat_type: 'base',
          ranger_default: 1,
        },
        {
          name: BaseStats.armor,
          stat_type: 'base',
          ranger_default: 10,
        },
        {
          name: BaseStats.will,
          stat_type: 'base',
          ranger_default: 4,
        },
        {
          name: BaseStats.health,
          stat_type: 'base',
          ranger_default: 18,
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
