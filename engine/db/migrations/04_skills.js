exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.skills (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      name varchar(50) NOT NULL,
      cost smallint default 1,
      description text
    );

    CREATE POLICY skills_policy ON ranger.skills 
      FOR SELECT
      TO role_minion
      USING (true);

    GRANT SELECT ON ranger.skills TO role_minion;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.skills')
}
