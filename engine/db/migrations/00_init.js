exports.up = knex =>
  knex.schema.raw(`
    create schema ranger;
  `)

exports.down = knex => {
  knex.schema.dropSchema('ranger')
}
