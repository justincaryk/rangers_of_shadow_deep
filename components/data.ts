import { BASE_STATS_ENUM, EXTENDED_STATS_ENUM, MODS } from './types'

type BaseActionSpellType = {
  name: string
  cost: number
  description: string
}
export type HeroicAction = BaseActionSpellType
export type Spell = BaseActionSpellType

export const heroicActions: HeroicAction[] = [
  {
    name: 'blend into the shadows',
    cost: 1,
    description: "This ability may be used if an evil figure is about to make a move that would take it into combat with the ranger. Instead, determine the evil figure's action as though the ranger were not on the table.",
  },
  {
    name: 'call to action',
    cost: 1,
    description: 'This ability may be used whenever the ranger activates. The ranger may activate one more companion in the Ranger phase than is normally allowed. (So, if the ranger can normally activate 0 companions in the Ranger Phase, he may activate 1 instead).',
  },
  {
    name: 'dash',
    cost: 1,
    description: 'The ranger may use this ability when he is activated. For the rest of the turn, he receives +2 Move. Alternatively, the ranger may use a move action to leap up to his Move distance in any direction, including vertically.',
  },
  {
    name: 'deadly shot',
    cost: 1,
    description: 'The ranger may use this ability if he has rolled a natural 18 or 19 during a shooting action. Treat this roll as a Critical Hit.',
  },
  {
    name: 'deadly strike',
    cost: 1,
    description: 'The ranger may use this ability if he has rolled a natural 18 or 19 during a fight. Treat this roll as a Critical Hit.',
  },
  {
    name: 'distraction',
    cost: 1,
    description: 'The ranger may use this ability whenever an evil creature is called upon to make either a random move or a move towards the Target Point. The player may instead move this creature anywhere he wishes following the standard rules for movement, provided this move does not cause the creature direct harm or force it to make Swimming Rolls (i.e. no walking off a cliff, or moving into fire or deep water).',
  },
  {
    name: 'dive for cover',
    cost: 1,
    description: 'The ranger may add +10 to his Fight Roll when rolling against a shooting attack. He must declare he is using this ability before he rolls.',
  },
  {
    name: 'eldritch recall',
    cost: 1,
    description: 'This ability can be used at any time. The figure regains the use of any one spell that it has already cast during the scenario.',
  },
  {
    name: 'enhanced power',
    cost: 1,
    description: 'This ability may be used any time a figure casts a spell that generates a shooting attack. For each shooting attack generated, the figure may roll three dice for the shooting attack and pick the best one. The player must decide to use this ability before any dice are rolled. This Heroic Ability is an exception to the rule that only one Heroic Ability or Spell can be used per activation.',
  },
  {
    name: 'evade',
    cost: 1,
    description: 'The ranger may use this ability if he activates while in combat. The ranger may make a free 1” move to leave the combat. No figure may force combat during this move. After this move, the ranger completes his activation as normal.',
  },
  {
    name: 'focus',
    cost: 1,
    description: 'The ranger may add +8 to any one Skill Roll. He must declare he is using this ability before he rolls.',
  },
  {
    name: 'frenzied attack',
    cost: 1,
    description: 'The ranger may add +5 to one Fight Roll. He must declare he is using this ability before he rolls.',
  },
  {
    name: 'halt undead',
    cost: 1,
    description: 'All undead creatures within 10” and line of sight of the ranger must make a Will Roll (TN20). If they fail, they lose their next activation.',
  },
  {
    name: 'hand of fate',
    cost: 1,
    description: 'The ranger may re-roll one die.',
  },
  {
    name: 'inner strength',
    cost: 1,
    description: 'The ranger may add +5 to one Will Roll. This ability can be used after the roll has been made.',
  },
  {
    name: 'parry',
    cost: 1,
    description: 'This ability may be used in combat after a ranger and his opponent have made their Fight Rolls. The ranger may add +10 to his roll. If he wins the combat, however, he does no damage. He may step back or push his opponent back as normal.',
  },
  {
    name: 'powerful blow',
    cost: 1,
    description: 'The hero may add +3 damage to any hand- to-hand attack that has already dealt at least 1 point of damage.',
  },
  {
    name: 'quick cast',
    cost: 1,
    description: "A figure that activates and has two or more actions may use this ability. During this activation it may use two actions to cast Spells. This overrides the normal rules that only one Spell may be cast during a figure's activation, and that one action must be movement.",
  },
  {
    name: 'roll with the punch',
    cost: 1,
    description: 'This ability may be used if a ranger loses a fight in hand-to-hand combat. Halve the amount of damage taken by the ranger, rounding up (e.g. if the ranger loses the combat and would suffer 7 points of damage, he suffers 4 instead).',
  },
  {
    name: 'shove',
    cost: 1,
    description: 'If the ranger wins in hand-to-hand combat, he may choose to push his opponent back up to 4” instead of the normal 1”.',
  },
  {
    name: 'split cast',
    cost: 1,
    description: 'This ability may be used any time a figure casts a spell that has a specific target figure or target point. The caster may choose two different targets for the Spell, resolving the full effect of the Spell on both targets. For example, if the figure casts Heal, it can heal two figures within 6”; if it casts Smoke, it may place two bands of smoke, etc.',
  },
  {
    name: 'steady aim',
    cost: 1,
    description: 'The hero may add +5 shoot: for one shoot:ing Roll. This must be declared before the roll is made.',
  },
]

export const spells: Spell[] = [
  {
    name: 'amphibious',
    description: 'The target of this spell automatically passes all Swimming Rolls for the rest of the scenario.',
    cost: 1,
  },
  {
    name: 'awareness',
    description: 'The caster may immediately cast this spell anytime he is called upon to make a Perception Skill Roll. It can be used either before or after a scenario, but will be counted as having been cast for that scenario. The caster automatically passes the Perception Roll.',
    cost: 1,
  },
  {
    name: 'enchanted steel',
    description: 'The caster imbues one melee weapon with magic power. For the rest of the scenario, the weapon counts as a magic weapon with +1 Fight.',
    cost: 1,
  },
  {
    name: 'fireball',
    description: 'Pick a point within line of sight. All figures within 2” of that point suffer a +3 shooting attack.',
    cost: 1,
  },
  {
    name: 'glow',
    description: 'For the rest of the game, all shooting attacks against the target of this spell are at +3.',
    cost: 1,
  },
  {
    name: 'heal',
    description: 'This spell may target any figure within 6” including the caster. The target figure regains up to 5 points of lost Health.',
    cost: 1,
  },
  {
    name: 'hold creature',
    description: 'The target creature must make an immediate Will Roll (TN16). If it fails, it may not force combat for the remainder of the turn, and it loses its next activation. This spell has no effect on large creatures or undead.',
    cost: 1,
  },
  {
    name: 'insect climb',
    description: 'The target of the spell does not suffer any movement penalty when climbing. In other words, do not count distance climbed as doubled for this figure. The figure receives +10 to all Climb Skill Rolls for the rest of the game.',
    cost: 1,
  },
  {
    name: 'ladder',
    description: 'The caster may place a magical ladder against any vertical or nearly vertical surface. The ladder can be any height the caster wishes. Any figure may climb this ladder without any movement penalty for climbing and without needing to make any Climb Skill Rolls. As long as there is no figure on the ladder, the caster can end the spell at any time as a free action.',
    cost: 1,
  },
  {
    name: 'armor',
    description: 'The target of this spell receives +2 Armour for the rest of the scenario. A figure can only receive the benefits of one Armour spell at one time.',
    cost: 1,
  },
  {
    name: 'burning light',
    description: 'Make a +3 attack against all undead creatures within 8” and line of sight of the caster.',
    cost: 1,
  },
  {
    name: 'burning mark',
    description: 'The caster may place a glowing rune anywhere within 6”. As soon as any evil creature moves within 2” of this rune, it explodes. All evil creatures within 2” of the rune suffer a +5 magic shooting attack.',
    cost: 1,
  },
  {
    name: 'caltrops',
    description: 'Creates a 2” diameter circle of caltrops. Any figure moving through this circle suffers 2 points of damage and must make a Will Roll (TN12). If it fails, its activation ends immediately. Undead creatures are immune to this damage.',
    cost: 1,
  },
  {
    name: 'compass',
    description: 'The caster may immediately cast this spell anytime he is called upon to make a Navigation Skill Roll. It can be used either before or after a scenario, but will be counted as having been cast for that scenario. The caster automatically passes the Navigation Roll.',
    cost: 1,
  },
  {
    name: 'leap',
    description: 'This spell may only be cast on a ranger or companion. That figure may immediately make a 6” move in any direction, including up. It may not be cast on a figure currently in combat.',
    cost: 1,
  },
  {
    name: 'slow',
    description: 'The target of this spell must make an immediate Will Roll (TN18). If it fails, it suffers -3 Move (to a minimum of 1) for the rest of the scenario.',
    cost: 1,
  },
  {
    name: 'smoke',
    description: 'The caster may place a thick cloud of smoke, 3” in diameter, anywhere within 3”. The smoke blocks all line of sight but does not inhibit movement.',
    cost: 1,
  },
  {
    name: 'strength',
    description: 'The target of this spell does +1 damage in hand-to-hand combat for the rest of the scenario. In addition, it receives +5 to any Strength Skill Rolls it makes.',
    cost: 1,
  },
  {
    name: 'strong heart',
    description: "This spell may be cast against any figure within 8” and line of sight. The next time this figure must make a Will Roll it does so with a +5 modifier. The time after that, it receives +4, and so on, down to +0 when the spell's effect ends.",
    cost: 1,
  },
  {
    name: 'summon crow',
    description: "The caster summons a crow (or other large bird) to his aid. At the end of the turn, place a bird in contact with the caster. This bird has the same stats as a raptor, except it only has Armour 10 and no skills. Treat this bird as a companion. At the end of the bird's activation each turn, roll a die. On a 16+ the bird flies off and is removed from the table.",
    cost: 1,
  },
  {
    name: 'swat',
    description: 'Make a +8 attack against one giant fly or giant spider in line of sight.',
    cost: 1,
  },
  {
    name: 'teleport',
    description: 'The caster may immediately move up to 9” in any direction, including up. This may not take the figure off the table. The figure may take no actions for the rest of the turn after casting this spell.',
    cost: 1,
  },
  {
    name: 'light',
    description: 'If the maximum line of sight for a scenario is below 24” because of darkness, this spell increases it back up to 24”.',
    cost: 1,
  },
  {
    name: 'lure',
    description: 'The target of this spell must make an immediate Will Roll with a Target Number of 16. If it fails, the caster may move the figure up to 5” in any direction. This may not move the figure off the table, or into or through anything that would cause it damage (such as walking it off a cliff or through fire). It cannot be cast on a creature that is currently in combat.',
    cost: 1,
  },
  {
    name: 'magic bolt',
    description: 'The caster makes a +5 magic shooting attack against one figure within line of sight. This attack ignores penalties for cover and intervening terrain.',
    cost: 1,
  },
  {
    name: 'open',
    description: 'The caster may immediately cast this spell anytime he is called upon to make a Pick Lock Skill Roll. It can be used either before or after a scenario, but will be counted as having been cast for that scenario. The caster automatically passes the Pick Lock Roll.',
    cost: 1,
  },
  {
    name: 'quickness',
    description: 'The target of this spell will activate in the Ranger Phase next turn. In addition, the target receives +1 Move for the rest of the scenario.',
    cost: 1,
  },
  {
    name: 'shield of light',
    description: 'This spell may be cast on any figure within 8” and line of sight. All shooting attacks against this figure are at -3 for the rest of the game.',
    cost: 1,
  },
  {
    name: 'translate',
    description: 'The caster may immediately cast this spell anytime he is called upon to make a Read Runes Skill Roll. It can be used either before or after a scenario, but will be counted as having been cast for that scenario. The caster automatically passes the Read Runes Roll.',
    cost: 1,
  },
  {
    name: 'transpose',
    description: 'Immediately switch the places of any two rangers or companions on the table. Either or both of these figures may be in combat.',
    cost: 1,
  },
  {
    name: 'weakness',
    description: 'The target of this spell must make an immediate Will Roll (TN18). If it fails, it suffers -1 Fight, -1 shoot:, and -1 Armour for the rest of the scenario.',
    cost: 1,
  },
]

export type Skill = {
  name: string
  cost: number
  description: string
}

export const skills: Skill[] = [
  {
    name: 'acrobatics',
    cost: 1,
    description: "A measure of the ranger's ability to control his own body in difficult situations, such as jumping, walking along narrow paths, and swinging from ropes. It does not include climbing, which is a separate Skill.",
  },
  {
    name: 'ancient lore',
    cost: 1,
    description: 'Knowledge of myth, legend, and ancient history, including all that is known about the Shadow Deep.',
  },
  {
    name: 'armory',
    cost: 1,
    description: 'The study of weaponry, including how to make and repair weapons, how to improvise weapons in the field, and how to identify magic weapons. If a ranger has an Armoury Skill of +4 or more, he is always treated as armed with a dagger, even if unarmed.',
  },
  {
    name: 'climb',
    cost: 1,
    description: "Measures the ranger's ability to climb difficult surfaces.",
  },
  {
    name: 'leadership',
    cost: 1,
    description: 'The skill of leading others, it also includes diplomacy. A Ranger may add his Leadership Skill to his Total Recruitment Points before each mission.',
  },
  {
    name: 'navigation',
    cost: 1,
    description: 'Using the natural world to determine direction and location and to keep from getting lost.',
  },
  {
    name: 'pick lock',
    cost: 1,
    description: 'Encompasses knowledge of all kinds of lock and locking mechanisms, including doors, chests, and even secret doors.',
  },
  {
    name: 'read runes',
    cost: 1,
    description: 'The knowledge of ancient written languages, including the languages of magic.',
  },
  {
    name: 'stealth',
    cost: 1,
    description: 'Moving silently to avoid detection and skill in choosing and maintaining hiding places.',
  },
  {
    name: 'strength',
    cost: 1,
    description: 'The training in the application of strength to achieve maximum results, useful for lifting, breaking down doors, and escaping from bonds.',
  },
  {
    name: 'survival',
    cost: 1,
    description: 'Includes foraging for food and herbs, hunting, cooking, basic first-aid, and knowledge of the dangers inherent in specific types of terrain.',
  },
  {
    name: 'swim',
    cost: 1,
    description: 'Movement through water, or any water-like substance.',
  },
  {
    name: 'track',
    cost: 1,
    description: 'The ability to read the signs of the land to gain information about those that have preceded them, such as their direction of travel, distance ahead, and if they are wounded or carrying prisoners. Also includes knowledge of how to throw off pursuers.',
  },
  {
    name: 'traps',
    cost: 1,
    description: 'Knowledge of traps, including how to set them and how to disable them.',
  },
  {
    name: 'perception',
    cost: 1,
    description: "The general awareness of one's surroundings, including noticing small, but important details.",
  },
]

export type Companion = {
  name: string
  cost: number
  description: string
  subtype: string
  stats: {
    [BASE_STATS_ENUM.armor]: number
    [BASE_STATS_ENUM.fight]: number
    [BASE_STATS_ENUM.health]: number
    [BASE_STATS_ENUM.move]: number
    [BASE_STATS_ENUM.shoot]: number
    [BASE_STATS_ENUM.will]: number
    [EXTENDED_STATS_ENUM.notes]?: string
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
    description: 'Arcanists are students of ancient lore and languages. Although they are not the best fighters, their knowledge of myths and legends and their ability to translate ancient writings can often prove vital on missions in the Shadow Deep.',
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
    description: 'Hand-to-hand combat is always a risky proposition – better to shoot down evil creatures before they get anywhere near you. A ranger can choose an archer armed with either a bow or a crossbow.',
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
    description: 'Born and bred beyond the bounds of civilized regions, Barbarians are fearsome warriors who rely on natural strength and toughness instead of armour to win their battles.',
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
    description: 'While most wizards lock themselves away in libraries, conjurors like to put their magic abilities to practical use. Before each scenario, the player may select two spells for the conjuror (or three spells for an extra cost of +10RP). The conjuror casts spells using the same rules as rangers. A ranger can choose a conjuror armed with either a staff or a hand weapon.',
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
    description: 'One of the soldiers of the kingdom, trained to fight with larger two-handed weapons, such as halberds, battle axes, and two-handed swords.',
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
    description: "By far the most common animal companion is the hound. These dogs are truly man's best friend. Faithful to the last, they will gladly lay their lives down for their masters. The only Skill Rolls that hounds can make are Acrobatics, Climb, Perception, Stealth, Swim and Track. There are three different varieties: regular hounds, warhounds, and bloodhounds. The bloodhound has Tracking +5, and whenever a ranger makes a Tracking Roll with his hound within 2” he receives a +2 bonus to the roll (this includes rolls made before the start of a scenario).",
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
    description: "By far the most common animal companion is the hound. These dogs are truly man's best friend. Faithful to the last, they will gladly lay their lives down for their masters. The only Skill Rolls that hounds can make are Acrobatics, Climb, Perception, Stealth, Swim and Track. There are three different varieties: regular hounds, warhounds, and bloodhounds. The bloodhound has Tracking +5, and whenever a ranger makes a Tracking Roll with his hound within 2” he receives a +2 bonus to the roll (this includes rolls made before the start of a scenario).",
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
    description: "By far the most common animal companion is the hound. These dogs are truly man's best friend. Faithful to the last, they will gladly lay their lives down for their masters. The only Skill Rolls that hounds can make are Acrobatics, Climb, Perception, Stealth, Swim and Track. There are three different varieties: regular hounds, warhounds, and bloodhounds. The bloodhound has Tracking +5, and whenever a ranger makes a Tracking Roll with his hound within 2” he receives a +2 bonus to the roll (this includes rolls made before the start of a scenario).",
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
    description: 'The elite fighting men of the kingdom, knights are heavily armoured and highly skilled in melee combat.',
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
    description: 'The basic soldier of the kingdom, the man-at-arms is trained and equipped for fighting the enemy at close quarters.',
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
    description: 'Some rangers bring trained hawks, falcons, or other birds of prey with them on their missions. Although these animals are small and fragile, their ability to fly allows them to ignore all movement penalties for terrain. Also, they are sharp-eyed creatures often able to see something a human might miss. All raptors have the same Stats, and the player is free to choose the actual type of bird that travels with his ranger. The only Skill Rolls a raptor may make are Acrobatics, Perception, and Stealth. Raptors automatically pass any Climb or Swim Rolls they might be required to make.',
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
    description: 'Recruits are the newest members of the Rangers. They are generally young, unskilled, and sometimes as much trouble as they are worth. Sometimes, however, they are all that is available.',
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
    description: 'Rogues aren’t the best fighters, but they are highly skilled individuals, who can be invaluable if you need a lock picked or a trap disarmed.',
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
    description: 'Like barbarians, savages are ferocious fighters who like to wade into the thick of a battle with brutal two-handed weapons.',
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
    description: 'Swordsmen are highly trained in the art of wielding a blade and have learned to defend themselves without recourse to heavy armour or shields. Generally, swordsmen come from the ranks of the nobility, where they received instruction from the best teachers, but have rarely had to use their skills in battle. With the appearance of the Shadow Deep, however, the kingdom needs all its fighting men to come to its defence.',
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
    description: 'A subclass of knights that have trained in fighting with two-handed weapons. They are usually called upon to fight larger creatures such as trolls and ogres.',
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
    description: 'Recruited from the countryside in times of need, these specialist huntsmen are not warriors by trade, but they are skilled with a bow and useful for staying on the trail of the agents of evil.',
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
    description: 'The Forest of Nar contains a large population of small, black bears, but bears of any other type are virtually unknown in Alladore. There are a few trained bears in Alladore.',
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
    description: 'These bad-tempered creatures can also be found in the Forest of Nar. They are often hunted, but never trained or domesticated. Boars are especially dangerous when they charge. If they move into combat with a figure and attack it as part of the same activation, they get +2 Fight for that attack only.',
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
    description: "Alladore possess a huge number of small mammals such as ferrets, weasels, otters, beavers, etc. most of which can be trained. While these little creatures aren't that much help in a fight, they are sneaky and can often find other ways to be useful.",
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
    description: 'Alladore has some mountain lions that live in the Northern and Eastern parts of the country. They are occasionally captured for zoos or circuses, but can never be truly "trained".',
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
    description: 'There are no monkey species native to Alladore, but they are occasionally brought in by foreign traders and sold as pets or performers. Monkeys are expert climbers – they suffer no movement penalty when climbing.',
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
    description: 'These small, often colourful, birds are almost worthless as fighters, but their sweet songs can be a light in the darkness and bring hope where it is most needed. Any hero that is within 2” of a songbird receives +1 on all Will Rolls.',
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
    description: 'There are numerous varieties of snakes in Alladore, and while they can never be trained as such, skilled handlers know how to encourage them to get the results they want.',
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
    description: 'These gigantic cats are unknown in Alladore, even in legend.',
    subtype: 'animal',
    cost: 25,
  },
]

export enum EQUIPMENT_CLASS {
  WEAPON = 'weapon',
  ARMOR = 'armor',
  EQUIPMENT = 'equipment',
  WONDROUS = 'wondrous',
}
export enum RARITY_ENUM {
  MAGIC = 'magic',
  MUNDANE = 'mundane',
}

type ItemName = string

export type Item<RARITY_ENUM> = {
  name: ItemName
  description: string
  class: EQUIPMENT_CLASS
  rarity: RARITY_ENUM
  slotCost: number
  entity_limit?: number
  riders?: {
    [linkedItemName: ItemName]: {
      verboten?: boolean
      required?: boolean
    }
  }
  modifiers?: {
    [BASE_STATS_ENUM.armor]?: number
    [BASE_STATS_ENUM.fight]?: number
    [BASE_STATS_ENUM.health]?: number
    [BASE_STATS_ENUM.move]?: number
    [BASE_STATS_ENUM.shoot]?: number
    [BASE_STATS_ENUM.will]?: number
    [MODS.DAMAGE_GIVE]?: number
    [MODS.DAMAGE_TAKE]?: number
    [MODS.WILL_ROLL_BONUS]?: number
    [MODS.WILL_ROLL_SAVE_DC_BONUS]?: number
    [MODS.MAGIC_SHOOTING_BONUS]?: number
  }
}

type MundaneItems = Item<RARITY_ENUM.MUNDANE>[]
type MagicItems = Item<RARITY_ENUM.MAGIC>[]

export const mundaneEquipment: MundaneItems = [
  {
    name: 'bow',
    description:
      'The favoured missile weapon of rangers, bows may be loaded and fired in a single action. For game purposes the maximum range of a bow is 24”. Bows have no damage modifier. A figure must also carry a quiver, or some type of magic ammunition, to use a bow.',
    class: EQUIPMENT_CLASS.WEAPON,
    rarity: RARITY_ENUM.MUNDANE,
    slotCost: 1,
    riders: {
      quiver: {
        required: true,
      },
    },
  },
  {
    name: 'crossbow',
    description:
      'A common weapon wielded by the forces of the Shadow Deep, crossbows take one action to load and one action to fire. If a figure wishes, he may replace his movement action with a "reload’ action. Crossbows have a +2 damage modifier and a maximum range of 24”. It is assumed that all crossbows start the game loaded and ready to fire. A figure must also carry a quiver, or some type of magic ammunition, to use a crossbow.',
    class: EQUIPMENT_CLASS.WEAPON,
    rarity: RARITY_ENUM.MUNDANE,
    slotCost: 1,
    riders: {
      quiver: {
        required: true,
      },
    },
    modifiers: {
      [MODS.DAMAGE_GIVE]: 2,
    },
  },
  {
    name: 'hand weapon',
    description:
      'Includes all purpose-forged weapons that are commonly wielded in one hand, such as swords, clubs, axes, maces, and even spears. These weapons have no modifiers in combat.',
    class: EQUIPMENT_CLASS.WEAPON,
    rarity: RARITY_ENUM.MUNDANE,
    slotCost: 1,
  },
  {
    name: 'heavy armor',
    description:
      'This represents any type of heavy armour that is mostly constructed out of metal. A figure wearing heavy armour receives +2 to its Armour, but -1 to its Move.',
    class: EQUIPMENT_CLASS.ARMOR,
    rarity: RARITY_ENUM.MUNDANE,
    slotCost: 1,
    modifiers: {
      [BASE_STATS_ENUM.move]: -1,
      [BASE_STATS_ENUM.armor]: 2,
    },
  },
  {
    name: 'light armor',
    description:
      'This represents any type of lighter armour that is mostly constructed out of leather or other non-metal materials. A figure wearing light armour receives +1 to its Armour.',
    class: EQUIPMENT_CLASS.ARMOR,
    rarity: RARITY_ENUM.MUNDANE,
    slotCost: 1,
    entity_limit: 1,
    modifiers: {
      [BASE_STATS_ENUM.move]: -1,
      [BASE_STATS_ENUM.armor]: 2,
    },
  },
  {
    name: 'quiver',
    description:
      'Purpose-built to hold ammunition for a bow or crossbow, a figure must be equipped with a quiver to make normal shooting attacks with these weapons. A figure with a quiver may also carry one piece of magic ammunition (an arrow or crossbow bolt) without that ammunition taking up an item slot.',
    class: EQUIPMENT_CLASS.EQUIPMENT,
    rarity: RARITY_ENUM.MUNDANE,
    slotCost: 1,
  },
  {
    name: 'rope',
    description:
      'Whenever a figure carrying rope is standing at the top of a vertical structure, such as a building or cliff-face, it may spend an action to set a rope. Place a marker next to the figure, and a corresponding one on the ground at the base of the structure, to mark the placement of the rope (or just use a piece of string). Any figure may now use this rope to climb the structure without suffering any movement penalties. A figure may set one rope per game for each rope item carried.',
    class: EQUIPMENT_CLASS.EQUIPMENT,
    rarity: RARITY_ENUM.MUNDANE,
    slotCost: 1,
  },
  {
    name: 'shield',
    description:
      'A figure that is carrying a shield receives +1 to its Armour. It may not, however, also carry a two-handed weapon or a staff.',
    class: EQUIPMENT_CLASS.EQUIPMENT,
    rarity: RARITY_ENUM.MUNDANE,
    slotCost: 1,
    riders: {
      ['two-handed weapon']: {
        verboten: true,
      },
    },
    modifiers: {
      [BASE_STATS_ENUM.armor]: 1,
    },
  },
  {
    name: 'staff',
    description:
      'The staff is best known for its defensive properties. Staffs have a -1 damage modifier, but also give the opponent a -1 damage modifier in hand-to-hand combat. The staff does not provide this modifier against shooting attacks.',
    class: EQUIPMENT_CLASS.WEAPON,
    rarity: RARITY_ENUM.MUNDANE,
    slotCost: 1,
    modifiers: {
      [MODS.DAMAGE_GIVE]: -1,
      [MODS.DAMAGE_TAKE]: -1,
    },
  },
  {
    name: 'throwing knife',
    description:
      'This includes any kind of small throwing weapon such as knives, axes, and light javelins. A figure may make one shooting attack per game for each knife carried. This attack has a maximum range of 8” and does -1 damage. In a pinch, a throwing weapon can also be used as a back-up melee weapon. A figure carrying an unused throwing knife as his only weapon does not count as unarmed but does suffer a -2 damage modifier in hand-to-hand combat. The first  dagger or throwing knife carried by a ranger does not take up an item slot.',
    class: EQUIPMENT_CLASS.EQUIPMENT,
    rarity: RARITY_ENUM.MUNDANE,
    slotCost: 1,
    modifiers: {
      [MODS.DAMAGE_GIVE]: -1,
    },
  },
  {
    name: 'two-handed weapon',
    description:
      'Includes all heavy melee weapons that require two hands to wield, such as two- handed swords, battle axes, various polearms, and large flails. These weapons have a +2 damage modifier. Two-handed weapons carried by rangers take up two items slots.',
    class: EQUIPMENT_CLASS.EQUIPMENT,
    rarity: RARITY_ENUM.MUNDANE,
    slotCost: 2,
    modifiers: {
      [MODS.DAMAGE_GIVE]: 2,
    },
    riders: {
      ['shield']: {
        verboten: true,
      },
    },
  },
  {
    name: 'unarmed',
    description:
      'A figure that is unarmed may still fight as normal, but suffer -2 Fight and -2 Damage. This penalty never applies to creatures that have no weapons listed in their notes.',
    class: EQUIPMENT_CLASS.WEAPON,
    rarity: RARITY_ENUM.MUNDANE,
    slotCost: 0,
    modifiers: {
      [MODS.DAMAGE_GIVE]: -2,
      [BASE_STATS_ENUM.fight]: -2,
    },
  },
]

export const magicEquipment: MagicItems = [
  {
    name: 'focusing crystal',
    description:
      'If a figure carrying this crystal casts a spell that forces the target to make a Will Roll, the Target Number for that Will Roll is increased by 2. For example, if a ranger casts Hold Creature, the creature will have to make a Will Roll with a Target Number of 18, instead of the normal 16.',
    class: EQUIPMENT_CLASS.WONDROUS,
    rarity: RARITY_ENUM.MAGIC,
    slotCost: 1,
    entity_limit: 1,
    modifiers: {
      [MODS.WILL_ROLL_SAVE_DC_BONUS]: 2,
    },
  },
  {
    name: 'holy icon',
    description:
      'Whenever a figure carrying a holy icon casts Heal, the target recovers 6 points of Health instead of the normal 5. Whenever it casts Burning Light it makes +4 shooting attacks instead of +3, and whenever it casts Shield of Light all shooting attacks against the target are at -4 instead of -3.',
    class: EQUIPMENT_CLASS.WONDROUS,
    rarity: RARITY_ENUM.MAGIC,
    slotCost: 1,
    entity_limit: 1,
    riders: {
      quiver: {
        required: true,
      },
    },
  },
  {
    name: 'spell book',
    description:
      'If a figure is carrying a spellbook, and it reaches the end of a scenario with uncast spells, it may select one of these uncast spells to be "saved’ in the spellbook. This spell may then be cast in a future scenario following the normal rules for spellcasting. Once the spell is cast, it is removed from the spellbook. A spellbook can never hold more than one spell at any given time.',
    class: EQUIPMENT_CLASS.WONDROUS,
    rarity: RARITY_ENUM.MAGIC,
    slotCost: 1,
    entity_limit: 1,
  },
  {
    name: 'wand',
    description:
      'While carrying a wand, a figure can add +1 to the roll for any shooting attack generated by a spell it cast. For example, if a figure carrying a wand casts Fireball, then all figures within 2” of the chosen target point will suffer a +4 shooting attack, instead of the normal +3.',
    class: EQUIPMENT_CLASS.WONDROUS,
    rarity: RARITY_ENUM.MAGIC,
    slotCost: 1,
    entity_limit: 1,
    modifiers: {
      [MODS.MAGIC_SHOOTING_BONUS]: 1,
    },
  },
  {
    name: 'wizards staff',
    description:
      'This item follows all of the rules for the "staff" weapon, with the following additions. If a figure makes a Will Roll while carrying this staff, it may trade its own Health to increase its roll on a one-for-one basis. For example, if a ranger makes a Will Roll (TN12) and rolls an 8, he may reduce his current Health by 4 in order to increase the Will Roll to a 12. He passed the roll, but it hurt. Additionally, whenever a figure carrying a wizard\'s staff is activated, it may spend one point of Health to make the staff count as a magic weapon until its next activation.',
    class: EQUIPMENT_CLASS.WONDROUS,
    rarity: RARITY_ENUM.MAGIC,
    slotCost: 1,
    entity_limit: 1,
  },
]
