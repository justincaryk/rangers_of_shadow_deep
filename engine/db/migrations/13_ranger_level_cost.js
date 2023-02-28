exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.ranger_level_cost (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      level_min smallint NOT NULL,
      level_max smallint NOT NULL,
      cost smallinit DEFAULT 1,
      benefit REFERENCES ranger.level_grants (id)
    );
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.ranger_level_cost')
}
