const BaseStats = {
  move: 'move',
  fight: 'fight',
  shoot: 'shoot',
  armor: 'armor',
  will: 'will',
  health: 'health',
} as const

const StatsArray = Object.values(BaseStats)

export { BaseStats, StatsArray }
