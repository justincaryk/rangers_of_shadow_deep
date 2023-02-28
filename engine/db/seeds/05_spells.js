exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ranger.spells')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ranger.spells').insert([
        {
          name: 'amphibious',
          desc: 'The target of this spell automatically passes all Swimming Rolls for the rest of the scenario.',
          cost: 1,
        },
        {
          name: 'awareness',
          desc: 'The caster may immediately cast this spell anytime he is called upon to make a Perception Skill Roll. It can be used either before or after a scenario, but will be counted as having been cast for that scenario. The caster automatically passes the Perception Roll.',
          cost: 1,
        },
        {
          name: 'enchanted steel',
          desc: 'The caster imbues one melee weapon with magic power. For the rest of the scenario, the weapon counts as a magic weapon with +1 Fight.',
          cost: 1,
        },
        {
          name: 'fireball',
          desc: 'Pick a point within line of sight. All figures within 2” of that point suffer a +3 shooting attack.',
          cost: 1,
        },
        {
          name: 'glow',
          desc: 'For the rest of the game, all shooting attacks against the target of this spell are at +3.',
          cost: 1,
        },
        {
          name: 'heal',
          desc: 'This spell may target any figure within 6” including the caster. The target figure regains up to 5 points of lost Health.',
          cost: 1,
        },
        {
          name: 'hold creature',
          desc: 'The target creature must make an immediate Will Roll (TN16). If it fails, it may not force combat for the remainder of the turn, and it loses its next activation. This spell has no effect on large creatures or undead.',
          cost: 1,
        },
        {
          name: 'insect climb',
          desc: 'The target of the spell does not suffer any movement penalty when climbing. In other words, do not count distance climbed as doubled for this figure. The figure receives +10 to all Climb Skill Rolls for the rest of the game.',
          cost: 1,
        },
        {
          name: 'ladder',
          desc: 'The caster may place a magical ladder against any vertical or nearly vertical surface. The ladder can be any height the caster wishes. Any figure may climb this ladder without any movement penalty for climbing and without needing to make any Climb Skill Rolls. As long as there is no figure on the ladder, the caster can end the spell at any time as a free action.',
          cost: 1,
        },
        {
          name: 'armor',
          desc: 'The target of this spell receives +2 Armour for the rest of the scenario. A figure can only receive the benefits of one Armour spell at one time.',
          cost: 1,
        },
        {
          name: 'burning light',
          desc: 'Make a +3 attack against all undead creatures within 8” and line of sight of the caster.',
          cost: 1,
        },
        {
          name: 'burning mark',
          desc: 'The caster may place a glowing rune anywhere within 6”. As soon as any evil creature moves within 2” of this rune, it explodes. All evil creatures within 2” of the rune suffer a +5 magic shooting attack.',
          cost: 1,
        },
        {
          name: 'caltrops',
          desc: 'Creates a 2” diameter circle of caltrops. Any figure moving through this circle suffers 2 points of damage and must make a Will Roll (TN12). If it fails, its activation ends immediately. Undead creatures are immune to this damage.',
          cost: 1,
        },
        {
          name: 'compass',
          desc: 'The caster may immediately cast this spell anytime he is called upon to make a Navigation Skill Roll. It can be used either before or after a scenario, but will be counted as having been cast for that scenario. The caster automatically passes the Navigation Roll.',
          cost: 1,
        },
        {
          name: 'leap',
          desc: 'This spell may only be cast on a ranger or companion. That figure may immediately make a 6” move in any direction, including up. It may not be cast on a figure currently in combat.',
          cost: 1,
        },
        {
          name: 'slow',
          desc: 'The target of this spell must make an immediate Will Roll (TN18). If it fails, it suffers -3 Move (to a minimum of 1) for the rest of the scenario.',
          cost: 1,
        },
        {
          name: 'smoke',
          desc: 'The caster may place a thick cloud of smoke, 3” in diameter, anywhere within 3”. The smoke blocks all line of sight but does not inhibit movement.',
          cost: 1,
        },
        {
          name: 'strength',
          desc: 'The target of this spell does +1 damage in hand-to-hand combat for the rest of the scenario. In addition, it receives +5 to any Strength Skill Rolls it makes.',
          cost: 1,
        },
        {
          name: 'strong heart',
          desc: "This spell may be cast against any figure within 8” and line of sight. The next time this figure must make a Will Roll it does so with a +5 modifier. The time after that, it receives +4, and so on, down to +0 when the spell's effect ends.",
          cost: 1,
        },
        {
          name: 'summon crow',
          desc: "The caster summons a crow (or other large bird) to his aid. At the end of the turn, place a bird in contact with the caster. This bird has the same stats as a raptor, except it only has Armour 10 and no skills. Treat this bird as a companion. At the end of the bird's activation each turn, roll a die. On a 16+ the bird flies off and is removed from the table.",
          cost: 1,
        },
        {
          name: 'swat',
          desc: 'Make a +8 attack against one giant fly or giant spider in line of sight.',
          cost: 1,
        },
        {
          name: 'teleport',
          desc: 'The caster may immediately move up to 9” in any direction, including up. This may not take the figure off the table. The figure may take no actions for the rest of the turn after casting this spell.',
          cost: 1,
        },
        {
          name: 'light',
          desc: 'If the maximum line of sight for a scenario is below 24” because of darkness, this spell increases it back up to 24”.',
          cost: 1,
        },
        {
          name: 'lure',
          desc: 'The target of this spell must make an immediate Will Roll with a Target Number of 16. If it fails, the caster may move the figure up to 5” in any direction. This may not move the figure off the table, or into or through anything that would cause it damage (such as walking it off a cliff or through fire). It cannot be cast on a creature that is currently in combat.',
          cost: 1,
        },
        {
          name: 'magic bolt',
          desc: 'The caster makes a +5 magic shooting attack against one figure within line of sight. This attack ignores penalties for cover and intervening terrain.',
          cost: 1,
        },
        {
          name: 'open',
          desc: 'The caster may immediately cast this spell anytime he is called upon to make a Pick Lock Skill Roll. It can be used either before or after a scenario, but will be counted as having been cast for that scenario. The caster automatically passes the Pick Lock Roll.',
          cost: 1,
        },
        {
          name: 'quickness',
          desc: 'The target of this spell will activate in the Ranger Phase next turn. In addition, the target receives +1 Move for the rest of the scenario.',
          cost: 1,
        },
        {
          name: 'shield of light',
          desc: 'This spell may be cast on any figure within 8” and line of sight. All shooting attacks against this figure are at -3 for the rest of the game.',
          cost: 1,
        },
        {
          name: 'translate',
          desc: 'The caster may immediately cast this spell anytime he is called upon to make a Read Runes Skill Roll. It can be used either before or after a scenario, but will be counted as having been cast for that scenario. The caster automatically passes the Read Runes Roll.',
          cost: 1,
        },
        {
          name: 'transpose',
          desc: 'Immediately switch the places of any two rangers or companions on the table. Either or both of these figures may be in combat.',
          cost: 1,
        },
        {
          name: 'weakness',
          desc: 'The target of this spell must make an immediate Will Roll (TN18). If it fails, it suffers -1 Fight, -1 shoot:, and -1 Armour for the rest of the scenario.',
          cost: 1,
        },
      ])
    })
}
