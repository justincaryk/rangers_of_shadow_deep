exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.ranger_level_cost (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      level_min smallint NOT NULL,
      level_max smallint NOT NULL,
      cost smallint DEFAULT 1 NOT NULL
    );

    CREATE POLICY ranger_level_cost_policy ON ranger.ranger_level_cost 
      FOR SELECT
      TO role_minion
      USING (true);

    GRANT SELECT ON ranger.ranger_level_cost TO role_minion;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.ranger_level_cost')
}
