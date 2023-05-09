exports.up = knex =>
  knex.schema.raw(`
    CREATE TYPE ranger_grant_type as enum(
      'skills',
      'stats',
      'recruitment_points',
      'heroic_ability',
      'companion'
    );

    CREATE TABLE ranger.level_grants (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      name varchar(50) NOT NULL,
      description text NOT NULL,
      grant_type ranger_grant_type NOT NULL,
      first_level_granted smallint default 1 NOT NULL,
      benefit uuid REFERENCES ranger.features (id),
      entity_limit uuid REFERENCES ranger.features (id)
    );
    
    CREATE POLICY level_grants_policy ON ranger.level_grants 
      FOR SELECT
      TO role_minion
      USING (true);

    GRANT SELECT ON ranger.level_grants TO role_minion;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.level_grants')
}
