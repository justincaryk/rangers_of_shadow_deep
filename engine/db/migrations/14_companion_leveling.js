exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.companion_leveling (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      pp_milestone smallint NOT NULL,
      benefit uuid REFERENCES ranger.level_grants (id)
    );

    CREATE POLICY companion_leveling_policy ON ranger.companion_leveling
      FOR SELECT
      TO role_minion
      USING (true);

    GRANT SELECT ON ranger.companion_leveling TO role_minion;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.companion_leveling')
}
