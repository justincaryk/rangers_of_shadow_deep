export enum STATS_ENUM {
  move = 'move',
  fight = 'fight',
  shoot = 'shoot',
  armor = 'armor',
  will = 'will',
  health = 'health',
}

export type RangerStats = {
  [STATS_ENUM.move]: number
  [STATS_ENUM.fight]: number
  [STATS_ENUM.shoot]: number
  [STATS_ENUM.armor]: number
  [STATS_ENUM.will]: number
  [STATS_ENUM.health]: number
}

export type Ranger = {
  personal: {}
  stats: RangerStats
  skills: {}
  heroicActions: string[]
  spells: string[]
  equipment: string[]
}
