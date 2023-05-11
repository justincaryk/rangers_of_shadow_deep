exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.friend_level_grants (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      pp_milestone_first smallint NOT NULL,
      pp_milestone_second smallint,
      description text NOT NULL
    );

    CREATE POLICY friend_level_grants_policy ON ranger.friend_level_grants
      FOR SELECT
      TO role_minion
      USING (true);

    GRANT SELECT ON ranger.friend_level_grants TO role_minion;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.friend_level_grants')
}
