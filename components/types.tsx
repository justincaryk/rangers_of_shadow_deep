
export enum RANGER_FIELD {
  PERSONAL = 'personal',
  STATS = 'stats',
  SKILLS = 'skills',
  HEROIC_ACTIONS = 'heroicActions',
  SPELLS = 'spells',
  EQUIPMENT = 'equipment',
}

export enum STATS_ENUM {
  move = 'move',
  fight = 'fight',
  shoot = 'shoot',
  armor = 'armor',
  will = 'will',
  health = 'health',
}

export type Ranger = {
  [RANGER_FIELD.PERSONAL]: {}
  [RANGER_FIELD.STATS]: {
    [STATS_ENUM.move]: number
    [STATS_ENUM.fight]: number
    [STATS_ENUM.shoot]: number
    [STATS_ENUM.armor]: number
    [STATS_ENUM.will]: number
    [STATS_ENUM.health]: number
  }
  [RANGER_FIELD.SKILLS]: {}
  [RANGER_FIELD.HEROIC_ACTIONS]: string[]
  [RANGER_FIELD.SPELLS]: string[]
  [RANGER_FIELD.EQUIPMENT]: string[]
}
