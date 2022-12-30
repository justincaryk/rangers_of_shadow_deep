export enum STATS_ENUM {
  move = 'move',
  fight = 'fight',
  shoot = 'shoot',
  armor = 'armor',
  will = 'will',
  health = 'health',
}

export interface RangerComponentProps {
  updateBp: (modifier: number) => void
}

export interface HeroicActionAndSpellsProps extends RangerComponentProps {
  bpAvail: number
}