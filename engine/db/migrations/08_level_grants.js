exports.up = knex =>
  knex.schema.raw(`
    CREATE TYPE mechanic_class_type as enum(
      'SKILL',
      'STAT',
      'RECRUITMENT_POINT',
      'SPELL',
      'HEROIC_ACTION',
      'ITEM',
      'HEROIC_ABILITY'
    );

    CREATE TABLE ranger.level_grants (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      name varchar(50) NOT NULL,
      description text NOT NULL,
      grant_type mechanic_class_type NOT NULL CHECK (grant_type != 'SPELL' and grant_type != 'HEROIC_ACTION'),
      first_level_granted smallint default 1 NOT NULL
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
