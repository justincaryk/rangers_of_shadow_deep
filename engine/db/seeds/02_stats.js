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
          stat_type: 'BASE',
          ranger_default: 6,
          hard_cap: 7,
        },
        {
          name: BaseStats.fight,
          stat_type: 'BASE',
          ranger_default: 2,
          hard_cap: 5,
        },
        {
          name: BaseStats.shoot,
          stat_type: 'BASE',
          ranger_default: 1,
          hard_cap: 5,
        },
        {
          name: BaseStats.armor,
          stat_type: 'BASE',
          ranger_default: 10,
          hard_cap: 25,
        },
        {
          name: BaseStats.will,
          stat_type: 'BASE',
          ranger_default: 4,
          hard_cap: 8,
        },
        {
          name: BaseStats.health,
          stat_type: 'BASE',
          ranger_default: 18,
          hard_cap: 22,
        },
        {
          name: 'notes',
          stat_type: 'EXTENDED',
        },
        {
          name: 'damage-inflict',
          stat_type: 'MODIFIER',
        },
        {
          name: 'shoot-defense-bonus',
          stat_type: 'MODIFIER',
        },
        {
          name: 'damage-take',
          stat_type: 'MODIFIER',
        },
        {
          name: 'will-roll-dc-bonus',
          stat_type: 'MODIFIER',
        },
        {
          name: 'will-roll-bonus',
          stat_type: 'MODIFIER',
        },
        {
          name: 'magic-shooting-bonus',
          stat_type: 'MODIFIER',
        },
      ])
    })
}
