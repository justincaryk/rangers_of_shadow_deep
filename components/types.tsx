export enum MEMBER_TYPE_ENUM {
  FRIEND = 'friend',
  RANGER = 'ranger',
}

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

export type PlayerCount = 1 | 2 | 3 | 4
export type MaxCompanions = 7 | 3 | 2 | 1
export enum PLAYER_KEYS {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
}
export type PlayersToCompanionsMap = {
  [Prop in PLAYER_KEYS]: {
    players: PlayerCount
    companions: MaxCompanions
  }
}

export const PLAYERS_TO_COMPANIONS_MAP: PlayersToCompanionsMap = {
  [PLAYER_KEYS.ONE]: {
    players: 1,
    companions: 7,
  },
  [PLAYER_KEYS.TWO]: {
    players: 2,
    companions: 3,
  },
  [PLAYER_KEYS.THREE]: {
    players: 3,
    companions: 2,
  },
  [PLAYER_KEYS.FOUR]: {
    players: 4,
    companions: 1,
  },
} 

export const MAX_COMPANION_ACTIVATION = {
  [PLAYER_KEYS.ONE]: 2,
  [PLAYER_KEYS.TWO]: 1,
  [PLAYER_KEYS.THREE]: 0,
  [PLAYER_KEYS.FOUR]: 0,
} as const

export type FriendsMissionRestrictions = {
  maxCompanions:MaxCompanions
  recruitmentPoints: number
}
