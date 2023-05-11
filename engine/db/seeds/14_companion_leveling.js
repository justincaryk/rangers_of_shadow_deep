exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ranger.companion_leveling')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ranger.companion_leveling').insert([
        {
          pp_milestone_first: 10,
          pp_milestone_second: 60,
          description: '+1 Health',
        },
        {
          pp_milestone_first: 20,
          description: 'Choose: +1 Fight or +1 Shoot',
        },
        {
          pp_milestone_first: 30,
          pp_milestone_second: 70,
          description: '+4 to one Skill (Maximum of +10)',
        },
        {
          pp_milestone_first: 40,
          pp_milestone_second: 80,
          description: '+2 Will',
        },
        {
          pp_milestone_first: 50,
          pp_milestone_second: 100,
          description: 'Choose one Heroic Ability',
        },
      ])
    })
}
