//every seed runs every time yarn seed:run is executed, so we need to delete the data in an order that won't throw errors
exports.seed = async knex => {
  await knex('minion').del()
  await knex('wizard').del()
}
