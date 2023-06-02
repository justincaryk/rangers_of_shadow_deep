const BaseStats = {
  move: 'move',
  fight: 'fight',
  shoot: 'shoot',
  armor: 'armor',
  will: 'will',
  health: 'health',
}

const StatsArray = Object.values(BaseStats)

module.exports = { BaseStats, StatsArray }
