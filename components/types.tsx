import { Character } from '../graphql/generated/graphql'

export enum RANGER_FIELD {
  CORE = 'core',
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

export type RangerLookupFieldHashKeyStrings = 'heroic_actions' | 'spells' | 'skills' | 'stats'

export const RANGER_LOOKUP_FIELD_HASH_KEYS: { [x: string]: RangerLookupFieldHashKeyStrings } = {
  HEROIC_ACTIONS: 'heroic_actions',
  SPELLS: 'spells',
  SKILLS: 'skills',
  STATS: 'stats',
}

type CharacterByIdLookupFields = Pick<
  Character,
  | 'memberHeroicActionsByCharacterId'
  | 'memberItemsByCharacterId'
  | 'memberSkillsByCharacterId'
  | 'memberSpellsByCharacterId'
  | 'memberStatsByCharacterId'
>

type LookupFieldMap = {
  [key: string]: keyof CharacterByIdLookupFields
}
export const RANGER_LOOKUP_FIELD_HASH: LookupFieldMap = {
  [RANGER_LOOKUP_FIELD_HASH_KEYS.HEROIC_ACTIONS]: 'memberHeroicActionsByCharacterId',
  [RANGER_LOOKUP_FIELD_HASH_KEYS.SPELLS]: 'memberSpellsByCharacterId',
  [RANGER_LOOKUP_FIELD_HASH_KEYS.SKILLS]: 'memberSkillsByCharacterId',
  [RANGER_LOOKUP_FIELD_HASH_KEYS.STATS]: 'memberStatsByCharacterId',
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
