exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.companion_leveling (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      pp_milestone smallint NOT NULL,
      benefit REFERENCES ranger.level_grants (id)
    );
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.companion_leveling')
}
