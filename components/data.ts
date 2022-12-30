export type HeroicAction = {
  name: string
  cost: number
  desc: string
}

export const heroicActions: HeroicAction[] = [
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
    desc: 'The hero may add +5 Shoot for one Shooting Roll. This must be declared before the roll is made.',
  },
]

export type Spell = {
  name: string
  cost: number
  desc: string
}

export const spells: Spell[] = [
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
    name: 'armour',
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
    desc: 'The target of this spell must make an immediate Will Roll (TN18). If it fails, it suffers -1 Fight, -1 Shoot, and -1 Armour for the rest of the scenario.',
    cost: 1,
  },
]

export type Skill = {
  name: string
  cost: number
  desc: string
}

export const skills: Skill[] = [
  {
    name: 'acrobatics',
    cost: 1,
    desc: "A measure of the ranger's ability to control his own body in difficult situations, such as jumping, walking along narrow paths, and swinging from ropes. It does not include climbing, which is a separate Skill.",
  },
  {
    name: 'ancient lore',
    cost: 1,
    desc: 'Knowledge of myth, legend, and ancient history, including all that is known about the Shadow Deep.',
  },
  {
    name: 'armoury',
    cost: 1,
    desc: 'The study of weaponry, including how to make and repair weapons, how to improvise weapons in the field, and how to identify magic weapons. If a ranger has an Armoury Skill of +4 or more, he is always treated as armed with a dagger, even if unarmed.',
  },
  {
    name: 'climb',
    cost: 1,
    desc: "Measures the ranger's ability to climb difficult surfaces.",
  },
  {
    name: 'leadership',
    cost: 1,
    desc: 'The skill of leading others, it also includes diplomacy. A Ranger may add his Leadership Skill to his Total Recruitment Points before each mission.',
  },
  {
    name: 'navigation',
    cost: 1,
    desc: 'Using the natural world to determine direction and location and to keep from getting lost.',
  },
  {
    name: 'pick lock',
    cost: 1,
    desc: 'Encompasses knowledge of all kinds of lock and locking mechanisms, including doors, chests, and even secret doors.',
  },
  {
    name: 'read runes',
    cost: 1,
    desc: 'The knowledge of ancient written languages, including the languages of magic.',
  },
  {
    name: 'stealth',
    cost: 1,
    desc: 'Moving silently to avoid detection and skill in choosing and maintaining hiding places.',
  },
  {
    name: 'strength',
    cost: 1,
    desc: 'The training in the application of strength to achieve maximum results, useful for lifting, breaking down doors, and escaping from bonds.',
  },
  {
    name: 'survival',
    cost: 1,
    desc: 'Includes foraging for food and herbs, hunting, cooking, basic first-aid, and knowledge of the dangers inherent in specific types of terrain.',
  },
  {
    name: 'swim',
    cost: 1,
    desc: 'Movement through water, or any water-like substance.',
  },
  {
    name: 'track',
    cost: 1,
    desc: 'The ability to read the signs of the land to gain information about those that have preceded them, such as their direction of travel, distance ahead, and if they are wounded or carrying prisoners. Also includes knowledge of how to throw off pursuers.',
  },
  {
    name: 'traps',
    cost: 1,
    desc: 'Knowledge of traps, including how to set them and how to disable them.',
  },
  {
    name: 'perception',
    cost: 1,
    desc: "The general awareness of one's surroundings, including noticing small, but important details.",
  },
]
