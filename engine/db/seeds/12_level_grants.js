exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ranger.level_grants')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ranger.level_grants').insert([
        {
          name: 'free dagger or knife',
          description:
            'The ranger may pick one dagger or throwing knife and it doesn\t count against the number of inventory slots.',
          grant_type: 'ITEM',
          first_level_granted: 0,
        },
        {
          name: 'improve skills',
          description:
            'The ranger increases his Skills by a total of +5. The maximum he may spend on any one Skill is +2. So, a ranger could increase five Skills by +1 each; one by +2 and three by +1, or two by +2 and one by +1.',
          grant_type: 'SKILL',
          first_level_granted: 1,
        },
        {
          name: 'improve stats',
          description:
            'The ranger increases one of the following Stats by +1, up to the maximum shown in brackets: Move (7), Fight (+5), Shoot (+5), Will (+8), Health (22).',
          grant_type: 'STAT',
          first_level_granted: 2,
        },
        {
          name: 'gain recruitment points',
          description:
            'The ranger adds 10 to his Base Recruitment Points. A ranger may not use this increase until the end of a mission, at which point he may select new companions as normal.',
          grant_type: 'RECRUITMENT_POINT',
          first_level_granted: 3,
        },
        {
          name: 'new heroic ability or spell',
          description: 'The ranger selects one new Heroic Ability or Spell and adds it to his Ranger Sheet.',
          grant_type: 'HEROIC_ABILITY',
          first_level_granted: 4,
        },
      ])
    })
}
