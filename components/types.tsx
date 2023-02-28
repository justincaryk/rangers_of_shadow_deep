import { HeroicAction, Skill, Spell } from './data'

export enum RANGER_FIELD {
  PERSONAL = 'personal',
  STATS = 'stats',
  SKILLS = 'skills',
  HEROIC_ACTIONS = 'heroicActions',
  SPELLS = 'spells',
  EQUIPMENT = 'equipment',
}

export enum BASE_STATS_ENUM {
  move = 'move',
  fight = 'fight',
  shoot = 'shoot',
  armor = 'armor',
  will = 'will',
  health = 'health',
}
export enum EXTENDED_STATS_ENUM {
  notes = 'notes',
}
export enum MODS {
  DAMAGE_GIVE = 'damage-inflict',
  DAMAGE_TAKE = 'damage-take',
  WILL_ROLL_SAVE_DC_BONUS = 'will-roll-dc-bonus',
  WILL_ROLL_BONUS = 'will-roll-bonus',
  MAGIC_SHOOTING_BONUS = 'magic-shooting-bonus',
}

export type Ranger = {
  [RANGER_FIELD.PERSONAL]: {}
  [RANGER_FIELD.STATS]: {
    [BASE_STATS_ENUM.move]: number
    [BASE_STATS_ENUM.fight]: number
    [BASE_STATS_ENUM.shoot]: number
    [BASE_STATS_ENUM.armor]: number
    [BASE_STATS_ENUM.will]: number
    [BASE_STATS_ENUM.health]: number
  }
  [RANGER_FIELD.SKILLS]: {
    [key: Skill['name']]: number
  }
  [RANGER_FIELD.HEROIC_ACTIONS]: HeroicAction['name'][]
  [RANGER_FIELD.SPELLS]: Spell['name'][]
  [RANGER_FIELD.EQUIPMENT]: {
    weapons: string[]
    armor: string[]
    equipment: string[]
  }
}

export enum PLAYER_COUNT {
  ONE = 'one',
  TWO = 'two',
  THREE = 'three',
  FOUR = 'four',
}

export const MAX_COMPANIONS_WITH_PLAYERS = {
  [PLAYER_COUNT.ONE]: 7,
  [PLAYER_COUNT.TWO]: 3,
  [PLAYER_COUNT.THREE]: 2,
  [PLAYER_COUNT.FOUR]: 1,
} as const

export const MAX_COMPANION_ACTIVATION = {
  [PLAYER_COUNT.ONE]: 2,
  [PLAYER_COUNT.TWO]: 1,
  [PLAYER_COUNT.THREE]: 0,
  [PLAYER_COUNT.FOUR]: 0,
} as const
