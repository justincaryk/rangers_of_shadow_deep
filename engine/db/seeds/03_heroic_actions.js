exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ranger.heroic_actions')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ranger.heroic_actions').insert([
        {
          name: 'blend into the shadows',
          cost: 1,
          desc: "This ability may be used if an evil figure is about to make a move that would take it into combat with the ranger. Instead, determine the evil figure's action as though the ranger were not on the table.",
        },
        {
          name: 'call to action',
          cost: 1,
          desc: 'This ability may be used whenever the ranger activates. The ranger may activate one more companion in the Ranger phase than is normally allowed. (So, if the ranger can normally activate 0 companions in the Ranger Phase, he may activate 1 instead).',
        },
        {
          name: 'dash',
          cost: 1,
          desc: 'The ranger may use this ability when he is activated. For the rest of the turn, he receives +2 Move. Alternatively, the ranger may use a move action to leap up to his Move distance in any direction, including vertically.',
        },
        {
          name: 'deadly shot',
          cost: 1,
          desc: 'The ranger may use this ability if he has rolled a natural 18 or 19 during a shooting action. Treat this roll as a Critical Hit.',
        },
        {
          name: 'deadly strike',
          cost: 1,
          desc: 'The ranger may use this ability if he has rolled a natural 18 or 19 during a fight. Treat this roll as a Critical Hit.',
        },
        {
          name: 'distraction',
          cost: 1,
          desc: 'The ranger may use this ability whenever an evil creature is called upon to make either a random move or a move towards the Target Point. The player may instead move this creature anywhere he wishes following the standard rules for movement, provided this move does not cause the creature direct harm or force it to make Swimming Rolls (i.e. no walking off a cliff, or moving into fire or deep water).',
        },
        {
          name: 'dive for cover',
          cost: 1,
          desc: 'The ranger may add +10 to his Fight Roll when rolling against a shooting attack. He must declare he is using this ability before he rolls.',
        },
        {
          name: 'eldritch recall',
          cost: 1,
          desc: 'This ability can be used at any time. The figure regains the use of any one spell that it has already cast during the scenario.',
        },
        {
          name: 'enhanced power',
          cost: 1,
          desc: 'This ability may be used any time a figure casts a spell that generates a shooting attack. For each shooting attack generated, the figure may roll three dice for the shooting attack and pick the best one. The player must decide to use this ability before any dice are rolled. This Heroic Ability is an exception to the rule that only one Heroic Ability or Spell can be used per activation.',
        },
        {
          name: 'evade',
          cost: 1,
          desc: 'The ranger may use this ability if he activates while in combat. The ranger may make a free 1” move to leave the combat. No figure may force combat during this move. After this move, the ranger completes his activation as normal.',
        },
        {
          name: 'focus',
          cost: 1,
          desc: 'The ranger may add +8 to any one Skill Roll. He must declare he is using this ability before he rolls.',
        },
        {
          name: 'frenzied attack',
          cost: 1,
          desc: 'The ranger may add +5 to one Fight Roll. He must declare he is using this ability before he rolls.',
        },
        {
          name: 'halt undead',
          cost: 1,
          desc: 'All undead creatures within 10” and line of sight of the ranger must make a Will Roll (TN20). If they fail, they lose their next activation.',
        },
        {
          name: 'hand of fate',
          cost: 1,
          desc: 'The ranger may re-roll one die.',
        },
        {
          name: 'inner strength',
          cost: 1,
          desc: 'The ranger may add +5 to one Will Roll. This ability can be used after the roll has been made.',
        },
        {
          name: 'parry',
          cost: 1,
          desc: 'This ability may be used in combat after a ranger and his opponent have made their Fight Rolls. The ranger may add +10 to his roll. If he wins the combat, however, he does no damage. He may step back or push his opponent back as normal.',
        },
        {
          name: 'powerful blow',
          cost: 1,
          desc: 'The hero may add +3 damage to any hand- to-hand attack that has already dealt at least 1 point of damage.',
        },
        {
          name: 'quick cast',
          cost: 1,
          desc: "A figure that activates and has two or more actions may use this ability. During this activation it may use two actions to cast Spells. This overrides the normal rules that only one Spell may be cast during a figure's activation, and that one action must be movement.",
        },
        {
          name: 'roll with the punch',
          cost: 1,
          desc: 'This ability may be used if a ranger loses a fight in hand-to-hand combat. Halve the amount of damage taken by the ranger, rounding up (e.g. if the ranger loses the combat and would suffer 7 points of damage, he suffers 4 instead).',
        },
        {
          name: 'shove',
          cost: 1,
          desc: 'If the ranger wins in hand-to-hand combat, he may choose to push his opponent back up to 4” instead of the normal 1”.',
        },
        {
          name: 'split cast',
          cost: 1,
          desc: 'This ability may be used any time a figure casts a spell that has a specific target figure or target point. The caster may choose two different targets for the Spell, resolving the full effect of the Spell on both targets. For example, if the figure casts Heal, it can heal two figures within 6”; if it casts Smoke, it may place two bands of smoke, etc.',
        },
        {
          name: 'steady aim',
          cost: 1,
          desc: 'The hero may add +5 shoot: for one shoot:ing Roll. This must be declared before the roll is made.',
        },
      ])
    })
}
