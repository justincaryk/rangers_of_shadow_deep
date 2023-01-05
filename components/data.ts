import { STATS_ENUM } from './types'

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
    desc: 'The hero may add +5 shoot: for one shoot:ing Roll. This must be declared before the roll is made.',
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
    name: 'armory',
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

export type Companion = {
  name: string
  cost: number
  desc: string
  subtype: string
  stats: {
    [STATS_ENUM.armor]: number
    [STATS_ENUM.fight]: number
    [STATS_ENUM.health]: number
    [STATS_ENUM.move]: number
    [STATS_ENUM.shoot]: number
    [STATS_ENUM.will]: number
    [STATS_ENUM.notes]?: string
  }
}

export const companions: Companion[] = [
  {
    stats: {
      move: 6,
      fight: 2,
      shoot: 0,
      armor: 10,
      will: 2,
      health: 10,
      notes: 'Hand Weapon, Ancient Lore +5, Read Runes +5',
    },
    name: 'arcanist',
    desc: 'Arcanists are students of ancient lore and languages. Although they are not the best fighters, their knowledge of myths and legends and their ability to translate ancient writings can often prove vital on missions in the Shadow Deep.',
    subtype: 'arcanist',
    cost: 15,
  },
  {
    stats: {
      move: 6,
      fight: 2,
      shoot: 2,
      armor: 11,
      will: 1,
      health: 10,
      notes: 'Bow OR Crossbow, Dagger, Light Armour, Quiver',
    },
    name: 'archer',
    desc: 'Hand-to-hand combat is always a risky proposition – better to shoot down evil creatures before they get anywhere near you. A ranger can choose an archer armed with either a bow or a crossbow.',
    subtype: 'archer',
    cost: 20,
  },
  {
    stats: {
      move: 6,
      fight: 4,
      shoot: 0,
      armor: 11,
      will: 3,
      health: 14,
      notes: 'Hand Weapon, Shield, Strength +5',
    },
    name: 'barbarian',
    desc: 'Born and bred beyond the bounds of civilized regions, Barbarians are fearsome warriors who rely on natural strength and toughness instead of armour to win their battles.',
    subtype: 'barbarian',
    cost: 35,
  },
  {
    stats: {
      move: 6,
      fight: 0,
      shoot: 0,
      armor: 10,
      will: 3,
      health: 12,
      notes: 'Staff OR Hand Weapon, 2 Spells, 3rd Spell (+10RP)',
    },
    name: 'conjuror',
    desc: 'While most wizards lock themselves away in libraries, conjurors like to put their magic abilities to practical use. Before each scenario, the player may select two spells for the conjuror (or three spells for an extra cost of +10RP). The conjuror casts spells using the same rules as rangers. A ranger can choose a conjuror armed with either a staff or a hand weapon.',
    subtype: 'conjuror',
    cost: 20,
  },
  {
    stats: {
      move: 6,
      fight: 3,
      shoot: 0,
      armor: 11,
      will: 2,
      health: 12,
      notes: 'Two-Handed Weapon, Light Armour',
    },
    name: 'guardsman',
    desc: 'One of the soldiers of the kingdom, trained to fight with larger two-handed weapons, such as halberds, battle axes, and two-handed swords.',
    subtype: 'guardsman',
    cost: 20,
  },
  {
    stats: {
      move: 8,
      fight: 0,
      shoot: 0,
      armor: 10,
      will: -2,
      health: 6,
      notes: 'Animal, Cannot Carry Treasure or Items, Limited Skill Rolls',
    },
    name: 'hound',
    desc: "By far the most common animal companion is the hound. These dogs are truly man's best friend. Faithful to the last, they will gladly lay their lives down for their masters. The only Skill Rolls that hounds can make are Acrobatics, Climb, Perception, Stealth, Swim and Track. There are three different varieties: regular hounds, warhounds, and bloodhounds. The bloodhound has Tracking +5, and whenever a ranger makes a Tracking Roll with his hound within 2” he receives a +2 bonus to the roll (this includes rolls made before the start of a scenario).",
    subtype: 'animal',
    cost: 5,
  },
  {
    stats: {
      move: 8,
      fight: 1,
      shoot: 0,
      armor: 10,
      will: -2,
      health: 8,
      notes: 'Animal, Cannot Carry Treasure or Items, Limited Skill Rolls',
    },
    name: 'warhound',
    desc: "By far the most common animal companion is the hound. These dogs are truly man's best friend. Faithful to the last, they will gladly lay their lives down for their masters. The only Skill Rolls that hounds can make are Acrobatics, Climb, Perception, Stealth, Swim and Track. There are three different varieties: regular hounds, warhounds, and bloodhounds. The bloodhound has Tracking +5, and whenever a ranger makes a Tracking Roll with his hound within 2” he receives a +2 bonus to the roll (this includes rolls made before the start of a scenario).",
    subtype: 'animal',
    cost: 10,
  },
  {
    stats: {
      move: 8,
      fight: 0,
      shoot: 0,
      armor: 10,
      will: -2,
      health: 6,
      notes:
        'Animal, Cannot Carry Treasure or Items, Limited Skill Rolls, Tracking +5, Ranger Tracking Bonus',
    },
    name: 'bloodhound',
    desc: "By far the most common animal companion is the hound. These dogs are truly man's best friend. Faithful to the last, they will gladly lay their lives down for their masters. The only Skill Rolls that hounds can make are Acrobatics, Climb, Perception, Stealth, Swim and Track. There are three different varieties: regular hounds, warhounds, and bloodhounds. The bloodhound has Tracking +5, and whenever a ranger makes a Tracking Roll with his hound within 2” he receives a +2 bonus to the roll (this includes rolls made before the start of a scenario).",
    subtype: 'animal',
    cost: 10,
  },
  {
    stats: {
      move: 5,
      fight: 4,
      shoot: 0,
      armor: 13,
      will: 2,
      health: 12,
      notes: 'Hand Weapon, Shield, Heavy Armour, Strength +4',
    },
    name: 'knight',
    desc: 'The elite fighting men of the kingdom, knights are heavily armoured and highly skilled in melee combat.',
    subtype: 'knight',
    cost: 35,
  },
  {
    stats: {
      move: 6,
      fight: 3,
      shoot: 0,
      armor: 12,
      will: 2,
      health: 12,
      notes: 'Hand Weapon, Shield, Light Armour',
    },
    name: 'man-at-arms',
    desc: 'The basic soldier of the kingdom, the man-at-arms is trained and equipped for fighting the enemy at close quarters.',
    subtype: 'man-at-arms',
    cost: 20,
  },
  {
    stats: {
      move: 9,
      fight: 0,
      shoot: 0,
      armor: 14,
      will: 3,
      health: 1,
      notes:
        'Animal, Cannot Carry Treasure or Items, Limited Skill Rolls, Perception +4',
    },
    name: 'raptor',
    desc: 'Some rangers bring trained hawks, falcons, or other birds of prey with them on their missions. Although these animals are small and fragile, their ability to fly allows them to ignore all movement penalties for terrain. Also, they are sharp-eyed creatures often able to see something a human might miss. All raptors have the same Stats, and the player is free to choose the actual type of bird that travels with his ranger. The only Skill Rolls a raptor may make are Acrobatics, Perception, and Stealth. Raptors automatically pass any Climb or Swim Rolls they might be required to make.',
    subtype: 'animal',
    cost: 10,
  },
  {
    stats: {
      move: 6,
      fight: 2,
      shoot: 0,
      armor: 10,
      will: 0,
      health: 10,
      notes: 'Hand Weapon',
    },
    name: 'recruit',
    desc: 'Recruits are the newest members of the Rangers. They are generally young, unskilled, and sometimes as much trouble as they are worth. Sometimes, however, they are all that is available.',
    subtype: 'recruit',
    cost: 10,
  },
  {
    stats: {
      move: 7,
      fight: 1,
      shoot: 1,
      armor: 10,
      will: 1,
      health: 10,
      notes:
        'Dagger, Throwing Knife, Climb +2, Perception +2, Pick Lock +5, Traps +5, Stealth +5',
    },
    name: 'rogue',
    desc: 'Rogues aren’t the best fighters, but they are highly skilled individuals, who can be invaluable if you need a lock picked or a trap disarmed.',
    subtype: 'rogue',
    cost: 20,
  },
  {
    stats: {
      move: 6,
      fight: 4,
      shoot: 0,
      armor: 10,
      will: 3,
      health: 14,
      notes: 'Two-Handed Weapon, Strength +5',
    },
    name: 'savage',
    desc: 'Like barbarians, savages are ferocious fighters who like to wade into the thick of a battle with brutal two-handed weapons.',
    subtype: 'savage',
    cost: 35,
  },
  {
    stats: {
      move: 6,
      fight: 4,
      shoot: 0,
      armor: 11,
      will: 2,
      health: 12,
      notes: 'Hand Weapon, Dagger, Light Armour',
    },
    name: 'swordsman',
    desc: 'Swordsmen are highly trained in the art of wielding a blade and have learned to defend themselves without recourse to heavy armour or shields. Generally, swordsmen come from the ranks of the nobility, where they received instruction from the best teachers, but have rarely had to use their skills in battle. With the appearance of the Shadow Deep, however, the kingdom needs all its fighting men to come to its defence.',
    subtype: 'swordsman',
    cost: 25,
  },
  {
    stats: {
      move: 5,
      fight: 4,
      shoot: 0,
      armor: 12,
      will: 2,
      health: 12,
      notes: 'Two-Handed Weapon, Heavy Armour, Strength +4',
    },
    name: 'templar',
    desc: 'A subclass of knights that have trained in fighting with two-handed weapons. They are usually called upon to fight larger creatures such as trolls and ogres.',
    subtype: 'templar',
    cost: 35,
  },
  {
    stats: {
      move: 7,
      fight: 2,
      shoot: 2,
      armor: 11,
      will: 2,
      health: 12,
      notes: 'Staff, Bow, Quiver, Light Armour, Tracking +5',
    },
    name: 'tracker',
    desc: 'Recruited from the countryside in times of need, these specialist huntsmen are not warriors by trade, but they are skilled with a bow and useful for staying on the trail of the agents of evil.',
    subtype: 'tracker',
    cost: 30,
  },
  {
    stats: {
      move: 6,
      fight: 4,
      shoot: 0,
      armor: 12,
      will: 0,
      health: 14,
      notes: 'Animal, Strong (+2 Damage), Strength +5',
    },
    name: 'bear',
    desc: 'The Forest of Nar contains a large population of small, black bears, but bears of any other type are virtually unknown in Alladore. There are a few trained bears in Alladore.',
    subtype: 'animal',
    cost: 25,
  },
  {
    stats: {
      move: 6,
      fight: 2,
      shoot: 0,
      armor: 12,
      will: 2,
      health: 8,
      notes: 'Animal, Tusks (+2F when charging), Strength +3',
    },
    name: 'boar',
    desc: 'These bad-tempered creatures can also be found in the Forest of Nar. They are often hunted, but never trained or domesticated. Boars are especially dangerous when they charge. If they move into combat with a figure and attack it as part of the same activation, they get +2 Fight for that attack only.',
    subtype: 'animal',
    cost: 15,
  },
  {
    stats: {
      move: 4,
      fight: -1,
      shoot: 0,
      armor: 14,
      will: 3,
      health: 1,
      notes:
        'Animal, Can Be Carried, Reduced Support, Maximum Damage (3), Choice of Stealth +6 or Amphibious',
    },
    name: 'ferret (or otter)',
    desc: "Alladore possess a huge number of small mammals such as ferrets, weasels, otters, beavers, etc. most of which can be trained. While these little creatures aren't that much help in a fight, they are sneaky and can often find other ways to be useful.",
    subtype: 'animal',
    cost: 3,
  },
  {
    stats: {
      move: 8,
      fight: 3,
      shoot: 0,
      armor: 10,
      will: 2,
      health: 10,
      notes: 'Animal, Acrobatics +3, Climb +5, Stealth +3, Track +3',
    },
    name: 'lion',
    desc: "Alladore has some mountain lions that live in the Northern and Eastern parts of the country. They are occasionally captured for zoos or circuses, but can never be truly ‘trained'.",
    subtype: 'animal',
    cost: 20,
  },
  {
    stats: {
      move: 6,
      fight: 0,
      shoot: 0,
      armor: 8,
      will: 4,
      health: 4,
      notes:
        'Animal, Expert Climber, Maximum Damage (5), Acrobatics +6, Climb +10',
    },
    name: 'monkey',
    desc: 'There are no monkey species native to Alladore, but they are occasionally brought in by foreign traders and sold as pets or performers. Monkeys are expert climbers – they suffer no movement penalty when climbing.',
    subtype: 'animal',
    cost: 5,
  },
  {
    stats: {
      move: 6,
      fight: -2,
      shoot: 0,
      armor: 15,
      will: 4,
      health: 1,
      notes:
        'Animal, Flying, Beautiful Song, Can Be Carried, Flying, Reduced Support, Maximum Damage (1)',
    },
    name: 'songbird',
    desc: 'These small, often colourful, birds are almost worthless as fighters, but their sweet songs can be a light in the darkness and bring hope where it is most needed. Any hero that is within 2” of a songbird receives +1 on all Will Rolls.',
    subtype: 'animal',
    cost: 2,
  },
  {
    stats: {
      move: 4,
      fight: 0,
      shoot: 0,
      armor: 14,
      will: 2,
      health: 1,
      notes:
        'Animal, Can Be Carried, Reduced Support, Maximum Damage (5), Choose 2: Amphibious, Nimble, Poison',
    },
    name: 'snake',
    desc: 'There are numerous varieties of snakes in Alladore, and while they can never be trained as such, skilled handlers know how to encourage them to get the results they want.',
    subtype: 'animal',
    cost: 3,
  },
  {
    stats: {
      move: 6,
      fight: 4,
      shoot: 0,
      armor: 10,
      will: 1,
      health: 14,
      notes: 'Animal, Strong (+2 Damage), Acrobatics +2, Stealth +3, Swim +5',
    },
    name: 'tiger',
    desc: 'These gigantic cats are unknown in Alladore, even in legend.',
    subtype: 'animal',
    cost: 25,
  },
]
