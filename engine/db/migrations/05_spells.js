exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.spells (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      name varchar(50) NOT NULL,
      cost smallint default 1,
      description text
    );

    CREATE POLICY spells_policy ON ranger.spells 
      FOR SELECT
      TO role_minion
      USING (true);

    GRANT SELECT ON ranger.spells TO role_minion;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.spells')
}
