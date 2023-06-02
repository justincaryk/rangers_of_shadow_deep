exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.heroic_actions (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      name varchar(50) NOT NULL,
      cost smallint default 1,
      description text
    );

    CREATE POLICY heroic_actions_policy ON ranger.heroic_actions 
      FOR SELECT
      TO role_minion
      USING (true);

    GRANT SELECT ON ranger.heroic_actions TO role_minion;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.heroic_actions')
}
