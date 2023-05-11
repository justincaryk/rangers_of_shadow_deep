exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.companion_leveling (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      pp_milestone_first smallint NOT NULL,
      pp_milestone_second smallint,
      description text NOT NULL
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
