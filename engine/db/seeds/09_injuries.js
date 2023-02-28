exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ranger.injuries')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ranger.injuries').insert([
        {
          name: 'lost toes',
          description: 'The figure has lost one or more toes. It suffers a permanent -0.5 penalty to its Move. This injury can be received twice, with a cumulative effect of -1 Move. Any further Lost Toes results have no effect.',
        },
        {
          name: 'smashed leg',
          description: 'The figure suffers permanent bone or muscle damage in its leg. It suffers a -1 penalty to its Move. This injury can be received twice, with a cumulative effect of -2 Move. Any further Smashed Leg results have no effect.',
        },
        {
          name: 'crushed arm',
          description: 'The figure suffers permanent bone or muscle damage in its arm. It suffers a -1 penalty to its Fight. This injury can be received twice, with a cumulative effect of -2 Fight. Any further Crushed Arm results have no effect.',
        },
        {
          name: 'lost fingers',
          description: 'The figure has lost one or more fingers. It suffers a permanent -1 penalty to its Shoot. This injury can be received twice, with a cumulative effect of -2 Shoot. Any further Lost Fingers results have no effect.',
        },
        {
          name: 'never quite as strong',
          description: 'Due to internal injuries, the figure never quite returns to full health. It starts every game at -1 Heath. This injury can be received twice, with a cumulative effect of -2 Health. Any further Never Quite as Strong results have no effect.',
        },
        {
          name: 'psychological scars',
          description: 'The figure’s physical injuries heal, but the mental trauma does not. It suffers a -1 to its Will. This injury can be received twice, with a cumulative effect of -2 Will. Any further Psychological Scars results have no effect.',
        },
        {
          name: 'smashed jaw',
          description: 'The figure suffers a broken jaw that never quite heals properly. The figure has some difficulty with speaking, which affects its ability to lead men in combat. If the figure  is a ranger, the player may only activate one companion in the ranger phase, instead of the usual two. Furthermore, the ranger suffers -3 to Leadership Skill Rolls. This injury has no specific penalty for a companion, but it does not gain experience for the scenario just played (see Experience and Levels below).',
        },
        {
          name: 'lost eye',
          description: "One of the figure's eyes has been damaged and rendered useless. It suffers a -1 to its Fight Roll whenever it is the target of a shooting attack. If a figure receives two Lost Eye permanent injuries, it is effectively blind, and unable to continue its adventures in the Shadow Deep.",
        },
      ])
    })
}
